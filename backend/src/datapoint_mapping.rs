pub struct Datapoint{
    pub name: String,
    pub json_path: String,
    pub datatype: String
}
pub fn get_datapoint(name: &str) -> Option<Datapoint>{
    match name {
        "level" => Some(Datapoint{
            name: "level".to_string(),
            json_path: "level".to_string(),
            datatype: "String".to_string(),
        }),
        "message" => Some(Datapoint{
            name: "message".to_string(),
            json_path: "message".to_string(),
            datatype: "String".to_string(),
        }),
        "resourceId" => Some(Datapoint{
            name: "resourceId".to_string(),
            json_path: "resourceId".to_string(),
            datatype: "String".to_string(),
        }),
        "timestamp" => Some(Datapoint{
            name: "timestamp".to_string(),
            json_path: "timestamp".to_string(),
            datatype: "Date".to_string(),
        }),
        "traceId" => Some(Datapoint{
            name: "traceId".to_string(),
            json_path: "traceId".to_string(),
            datatype: "String".to_string(),
        }),
        "spanId" => Some(Datapoint{
            name: "spanId".to_string(),
            json_path: "spanId".to_string(),
            datatype: "String".to_string(),
        }),
        "commit" => Some(Datapoint{
            name: "commit".to_string(),
            json_path: "commit".to_string(),
            datatype: "String".to_string(),
        }),
        "parentResourceId" => Some(Datapoint{
            name: "parentResourceId".to_string(),
            json_path: "metadata.parentResourceId".to_string(),
            datatype: "String".to_string(),
        }),
        _ => None,
    }
}