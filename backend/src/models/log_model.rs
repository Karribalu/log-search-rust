use mongodb::bson::DateTime;
use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize};
use mongodb::bson::serde_helpers::bson_datetime_as_rfc3339_string;
#[derive(Debug, Serialize, Deserialize)]
pub struct Metadata{
    #[serde(rename = "parentResourceId")]
    pub parent_resource_id: String
}
#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Log {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub level: String,
    pub message: String,
    pub resource_id: String,
    #[serde(with = "bson_datetime_as_rfc3339_string")]
    pub timestamp: DateTime,
    pub trace_id: String,
    pub span_id: String,
    pub commit: String,
    pub metadata: Metadata
}

