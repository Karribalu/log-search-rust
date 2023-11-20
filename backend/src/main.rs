use actix_web::{App, HttpServer, middleware, web};
use env_logger::Env;
use services::searchservice;
use config::mongo_client_config;
use crate::services::insertlogs::{insert_many_logs, insert_one_log};

mod services;
mod config;
mod datapoint_mapping;
mod models;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var(
        "RUST_LOG",
        "search-api=debug,actix_web=info,actix_server=info",
    );
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .app_data(web::JsonConfig::default().limit(4096))
            .service(
                web::resource("/search")
                    .route(web::get().to(searchservice::search))
            ).service(
            web::resource("/insert-one-log")
                .route(web::post().to(insert_one_log))
        ).service(
            web::resource("/insert-many-logs")
                .route(web::post().to(insert_many_logs))
        )
    })
        .bind(("127.0.0.1", 3000))?
        .run()
        .await
}
