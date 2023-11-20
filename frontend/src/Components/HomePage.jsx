import React, { useEffect } from 'react'
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';/**
* @author
* @function HomePage
**/

export const HomePage = (props) => {
    const [value, onChange] = useState(new Date());
    const [logSearch, setLogSearch] = useState({
        "level": "",
        "message": "",
        "resourceId": "",
        "timestamp": "",
        "traceId": "",
        "spanId": "",
        "commit": "",
        "metadata": {
            "parentResourceId": ""
        }
    });
    useEffect(() =>{
        let date = new Date(value);
        logSearch.timestamp = date.valueOf()
    }, [value])
    useEffect(() => {
        console.log(logSearch)
    },[logSearch])
  return(
    <div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <label for="level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">level</label>
            <input type="text" id="level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, level: e.target.value})}}/>
        </div>
        <div>
            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">message</label>
            <input type="text" id="message" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, message: e.target.value})}}/>
        </div>
         <div>
            <label for="resourceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">resourceId</label>
            <input type="text" id="resourceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {setLogSearch({...logSearch, resourceId: e.target.value})}}/>
        </div>
        
         <div>
            <label for="timestamp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">timestamp</label>
            <DateTimePicker onChange={onChange} value={value} />
        </div>
         <div>
            <label for="traceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">traceId</label>
            <input type="text" id="traceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, traceId: e.target.value})}}
            />
        </div>
         <div>
            <label for="spanId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">spanId</label>
            <input type="text" id="spanId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, spanId: e.target.value})}}
            />
        </div>

         <div>
            <label for="commit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">commit</label>
            <input type="text" id="commit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, commit: e.target.value})}}
            />
        </div>

         <div>
            <label for="parentResourceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">parentResourceId</label>
            <input type="text" id="parentResourceId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {setLogSearch({...logSearch, metadata: {
               parentResourceId: e.target.value
            }
            })}}
            />
        </div>
    </div>
   )
  }
