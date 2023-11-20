use actix_web::{HttpResponse, web};
use actix_web::http::StatusCode;
use mongodb::Collection;
use crate::config::mongo_client_config;
use crate::models::log_model::Log;

pub async fn insert_one_log(log_data: web::Json<Log>) -> Result<HttpResponse, actix_web::Error>{
    let database = mongo_client_config::get_mongo_db().await.unwrap();
    let col: Collection<Log> = database.collection("logs");
    let result = col.insert_one(&log_data as &Log, None)
        .await;
    if result.ok().is_none() {
        let response = HttpResponse::build(StatusCode::INTERNAL_SERVER_ERROR)
            .json(serde_json::json!({ "error": "Error inserting log into MongoDB" }));

        return Ok(response);
    }

    let response = HttpResponse::build(StatusCode::OK)
        .json(serde_json::json!({ "message": "Log inserted successfully" }));

    Ok(response)
}

pub async fn insert_many_logs(log_data: web::Json<Vec<Log>>) -> Result<HttpResponse, actix_web::Error>{
    let database = mongo_client_config::get_mongo_db().await.unwrap();
    let col: Collection<Log> = database.collection("logs");
    let result = col.insert_many(log_data.into_inner(), None)
        .await;

    if result.ok().is_none() {
        let response = HttpResponse::build(StatusCode::INTERNAL_SERVER_ERROR)
            .json(serde_json::json!({ "error": "Error inserting logs into MongoDB" }));

        return Ok(response);
    }
    let response = HttpResponse::build(StatusCode::OK)
        .json(serde_json::json!({ "message": "Logs inserted successfully" }));

    Ok(response)
}