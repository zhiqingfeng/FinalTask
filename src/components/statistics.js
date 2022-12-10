import React, { useState, useEffect } from "react";
import { XAxis, LineChart, Tooltip, CartesianGrid, Line, BarChart, Bar, YAxis } from "recharts";
import "../App.css";

export default function Statistics() {
    const [data, setData] = useState([]);
    const _ = require("lodash");
    // Requiring the lodash library 

    useEffect(() => fetchData(),[]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.error(err))
    }

    const gourped_data = _.groupBy(data, "activity");
    //console.log(grouped_data)

    //returns the new mapped array --> 
    //let mapped_array = _.map(array, function square(n) {
    //return n * n;
    //})
    
    const sum = _.map(gourped_data, (value, key) => ({
        activity: key,
        duration: _.sumBy(value, "duration"),
    }));

    return (
        <div className="Body" >
            <div className="row">
                <div className="column" >
                    <BarChart width={600} height={300} data={sum}>
                        <XAxis dataKey="activity" />
                        <YAxis />
                        <Bar dataKey="duration" barSize={30} fill="#8884d8" />
                    </BarChart>
                </div>
                <div className="column">
                    <LineChart width={600} height={300} data={sum}>
                        <Line type="monotone" dataKey="duration" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="activity" />
                        <YAxis />
                    </LineChart>
                    </div>
            </div>
        </div>
    );         
}