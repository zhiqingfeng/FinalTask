import React, { useState, useEffect } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function App() {
    const localizer = momentLocalizer(moment);

    const [trainings, setTrainings] = useState([]);
    useEffect(() => fetchData(),[]);

    const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
    }
    const eventList = trainings.map((trainings)=>{
    return {
        id: trainings.id,
        title:trainings.activity +" " +  moment(trainings.date).format('DD.MM.YYYY HH:MM'),
        start:new Date(trainings.date),
        end: new Date(trainings.date),
        allDay: false
    }
    })
  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
      />
    </div>
  );
}