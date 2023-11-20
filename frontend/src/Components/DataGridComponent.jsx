import React, { useEffect, useState } from 'react'
import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

const columns = [
  { key: 'level', name: 'Level' },
  { key: 'message', name: 'Message' },
 { key: 'resourceId', name: 'Resource Id' },
 { key: 'timestamp', name: 'Timestamp' },
 { key: 'traceId', name: 'Trace Id' },
  { key: 'spanId', name: 'Span Id' },
 { key: 'commit', name: 'Commit' },
 { key: 'parentResourceId', name: 'Parent Resource Id' },

];

/**
* @author
* @function DataGrid
**/

export const DataGridComponent = (props) => {
    const [logData,setLogData] = useState([]);
    useEffect(() => {
      let logProps = props?.logData;
      let finalLogData = []
      logProps.forEach(logProp => {
        let timestamp = logProp?.timestamp;
        if(timestamp){
          let utcMilliSecond = parseInt(timestamp["$date"]["$numberLong"]);
          let date = new Date(utcMilliSecond);
          logProp = {...logProp, timestamp:date.toUTCString()};
        }
        if (logProp?.metadata) {
          logProp = {...logProp, parentResourceId: logProp?.metadata?.parentResourceId}
        }
        finalLogData.push(logProp)
      });
      setLogData(finalLogData);
    },[props])
  return(
    <DataGrid columns={columns} rows={logData}/>
   )
  }
