use actix_web::{HttpResponse, web::Query};
use actix_web::body::{MessageBody};
use serde::{Deserialize, Serialize};
use log::{info};
use mongodb::bson::{Bson, DateTime, doc, Document, rawdoc};
use mongodb::Cursor;
use crate::config::mongo_client_config;
use crate::datapoint_mapping::get_datapoint;
use crate::models::log_model::Log;

#[derive(Serialize,Deserialize)]
pub struct SearchParamsInput {
    q: Option<String>,
    f: String,
}
#[derive(Serialize, Deserialize)]
pub struct SearchParams{
    q_params: Vec<SearchTerm>,
    f_params: Vec<String>
}
#[derive(Serialize,Deserialize)]
pub struct SearchTerm{
    datapoint_name: String,
    values: Vec<String>,
    operator: String,
    is_negated: bool
}
pub async fn search(query: Query<SearchParamsInput>) -> Result<HttpResponse, actix_web::Error> {
    let params = query.into_inner();
    let mut search_params = map_params(params);
    for search_term in &search_params.q_params{
        let datapoint = get_datapoint(&search_term.datapoint_name);
        match datapoint {
            None => {
                todo!("return some errors");
            },
            Some(datapoint) => {
                println!(":?");
            }
        }
    }
    let database = mongo_client_config::get_mongo_db().await.unwrap();
    let mut cursor = database.collection::<Log>("logs").aggregate([
        doc! {
            "$search": doc!{
                "index": "search-index",
                "compound": get_search_fields(&search_params.q_params)
            }
        },
        doc! {
            "$project": get_projected_fields(&search_params.f_params)
        }
    ], None).await.expect("mongo db pipeline failed");
    let some = cursor.deserialize_current().unwrap();
    let mut results = vec![];
    while cursor.advance().await.expect("_") {
        println!("{:?}", cursor.current());
        results.push(cursor.deserialize_current().unwrap());
    }
    let date = DateTime::parse_rfc3339_str("2023-09-15T08:00:00.000+00:00").map_err(|_| {
    }).expect(":");
    Ok(HttpResponse::from( HttpResponse::Ok().content_type("text/plain").body(serde_json::to_string(&results).unwrap())))
}

pub fn get_search_fields(search_params: &Vec<SearchTerm>) -> Document {
    let mut must: Vec<Document> = vec![];
    let mut must_not: Vec<Document> = vec![];
    for search_term in search_params{
        let datapoint = get_datapoint(search_term.datapoint_name.as_str());
        if datapoint.is_some(){
            let json_path = datapoint.unwrap().json_path;
            match search_term.operator.as_str() {
                "EQ" => {
                    let phrase = doc! {
                        "text": doc!{
                            "query": &search_term.values[0],
                            "path":  &json_path
                            //Uncomment the below line if you want the fuzzy search.
                            // "fuzzy": doc!{}
                        }
                    };
                    if search_term.is_negated{
                        must_not.push(phrase);
                    }else{
                        must.push(phrase);
                    }
                },
                "GE" => {
                    let range = doc! {
                        "range": doc!{
                            "gte": DateTime::from_millis(search_term.values[0].parse().unwrap()),
                            "path":  &json_path
                        }
                    };
                    if search_term.is_negated{
                        must_not.push(range);
                    }else{
                        must.push(range);
                    }
                },
                "LE" => {
                    let range = doc! {
                        "range": doc!{
                            "lte": DateTime::from_millis(search_term.values[0].parse().unwrap()),
                            "path":  &json_path
                        }
                    };
                    if search_term.is_negated{
                        must_not.push(range);
                    }else{
                        must.push(range);
                    }
                }
                _ => {}
            }
        }
    }
    doc!{
        "must" : must,
        "mustNot": must_not
    }

}

fn get_projected_fields(f_params: &Vec<String>) -> Bson {
    let mut bson_doc = doc! {"_id": 0};
    for f_param in f_params{
        bson_doc.insert(f_param, 1);
    }
    Bson::from(bson_doc)
}

fn map_params(params: SearchParamsInput) -> SearchParams{
    //This function iterates through the query params and deserializes the q and f params
    let mut search_params = SearchParams{
        q_params: vec![],
        f_params: vec![],
    };
    let f = params.f;
    let q_str = params.q.unwrap_or_default();

    if !q_str.is_empty() {
        let search_terms = q_str.split(';');
        for search_term in search_terms{
            let search_term_parts: Vec<&str> = search_term.split(":").collect();
            let datapoint_name;
            let mut is_negated = false;
            if search_term_parts[0].starts_with("!"){
                datapoint_name = &search_term_parts[0][1..];
                is_negated = true;
            } else{
                datapoint_name = &search_term_parts[0];
            }
            let values: Vec<String> = search_term_parts[1].split(',').map(|s| s.to_string()).collect();
            let operator = search_term_parts[2];
            let search_term = SearchTerm {
                datapoint_name: datapoint_name.to_string(),
                values,
                operator: operator.to_string(),
                is_negated
            };
            search_params.q_params.push(search_term);

        }
    }
    if !f.is_empty() {
        info!("Received f parameters: {:?}", f);
        search_params.f_params = f.split(",").map(|s| s.to_string()).collect();
    }
    search_params
}