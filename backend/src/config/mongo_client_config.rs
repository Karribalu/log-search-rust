use std::env;
use mongodb::{options::{ClientOptions, ServerApi, ServerApiVersion}, Client, Database};

pub async fn get_mongo_db() ->  mongodb::error::Result<Database>{
    dotenv::dotenv().ok();
    let mongo_uri = env::var("MONGO_URI").expect("MONGO_URI must be set");
    let mut client_options =
        ClientOptions::parse(mongo_uri)
    .await?;

    // Set the server_api field of the client_options object to Stable API version 1
    let server_api = ServerApi::builder().version(ServerApiVersion::V1).build();
    client_options.server_api = Some(server_api);

    // Get a handle to the cluster
    let client = Client::with_options(client_options)?;

    // Ping the server to see if you can connect to the cluster
    Ok(
    client
        .database("dyte"))
}