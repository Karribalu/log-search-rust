import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { DataGridComponent } from './DataGridComponent';

export const HomePage = (props) => {
    var _ = require('lodash');
    const [error, setError] = useState("");
    const [results, setResults] = useState([]);
    const [logSearch, setLogSearch] = useState({
        "level": "",
        "message": "",
        "resourceId": "",
        "from-timestamp": "",
        "to-timestamp": "",
        "traceId": "",
        "spanId": "",
        "commit": "",
        "parentResourceId": ""
    });

    const handleSubmit = async () => {
        if (isEmptyLogSearch()){
            setError("Please enter atleast one criteria");
        }else{
            setError("")
            const url = convertUrlFromObject();
            const response = await axios.get("/search?q="+url+"&f="+requestedFParams())
            setResults(response.data);
        }
    }
    function requestedFParams(){
        return "level,message,resourceId,timestamp,traceId,spanId,commit,parentResourceId"
    }
    const convertUrlFromObject = () => {
        let params = []
        for(var key in logSearch){
            if(logSearch[key] !== ""){
                let qParam = ""
                if(key === "from-timestamp" || key === "to-timestamp"){
                    let date = new Date(logSearch[key]);
                    let millis = date.getTime();
                    if(isNaN(millis)){
                        setError("Please enter a valid date in "+ key);
                        return;
                    }
                    if(key === "from-timestamp")
                        qParam = "timestamp"+":"+millis+":GE"
                    else
                        qParam = "timestamp"+":"+millis+":LE"
                }else{
                    qParam = key+":"+logSearch[key]+":EQ"
                }
                params.push(qParam);
            }
        }
        return params.join(";");
        
    }
    function isEmptyLogSearch(){
        return _.isEqual(logSearch,{
        "level": "",
        "message": "",
        "resourceId": "",
        "from-timestamp": "",
        "to-timestamp": "",
        "traceId": "",
        "spanId": "",
        "commit": "",
        "parentResourceId": ""
        })
    }
  return(
    <div>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
            <input type="text" id="level" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, level: e.target.value})}}/>
        </div>
        <div>
            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
            <input type="text" id="message" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, message: e.target.value})}}/>
        </div>
         <div>
            <label for="resourceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resource Id</label>
            <input type="text" id="resourceId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, resourceId: e.target.value})}}/>
        </div>
        
         <div>
            <label for="from_timestamp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Timestamp</label>
            <input type="text" id="from_timestamp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, "from-timestamp": e.target.value})}}/>
        </div>
        <div>
            <label for="to_timestamp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Timestamp</label>
            <input type="text" id="to_timestamp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, "to-timestamp": e.target.value})}}/>
        </div>
         <div>
            <label for="traceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trace Id</label>
            <input type="text" id="traceId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, traceId: e.target.value})}}
            />
        </div>
         <div>
            <label for="spanId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Span Id</label>
            <input type="text" id="spanId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, spanId: e.target.value})}}
            />
        </div>

         <div>
            <label for="commit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Commit</label>
            <input type="text" id="commit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, commit: e.target.value})}}
            />
        </div>

         <div>
            <label for="parentResourceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parent Resource Id</label>
            <input type="text" id="parentResourceId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch,parentResourceId: e.target.value
            })}}
            />
        </div>

    </div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Search</button>
    {
    error !== "" &&
    <label className='text-red-700'>{error}</label>
    }

    {
        results?.length > 0 &&
        <div className="mt-8">
            <DataGridComponent logData={results} />
        </div>
    }
    </div>
   )
  }
