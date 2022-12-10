import React, { useState, useEffect} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Moment from 'moment';
import Button from '@mui/material/Button';
import ReactTable from 'react-table-6';
import Addtraining from './Addtraining';

export default function Trainingslist () {
    const [ trainings, setTrainings ] = useState([]);
    useEffect(() => fetchData(),[]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const columns = [
        {
			Header: 'Date',
            accessor: 'date',
            Cell: row => Moment(row.value).format('DD.MM.YYYY HH:MM')
		},
		{
			Header: 'Duration',
            accessor: 'duration',
		},
		{
			Header: 'Activity',
            accessor: 'activity',
		},
		{
			Header: 'Customer',
            accessor: 'customer.firstname'
		},
        {
			Header: 'Customer LastName',
            accessor: 'customer.lastname'
		},
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            accessor: 'links[0].href',
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Button variant='contained' color="error" size="small"  onClick={() => deleteTraining(row.value)}>Delete</Button>
        }
    ]

    const saveTraining=(trainings) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainings)
      }
    )
        .then(response => fetchData())
        .catch(err => console.error(err))
        }
    
    const deleteTraining = (id) => {
        if(window.confirm("Are you sure?")){
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'}) //{object}
            .then(response => fetchData())
            .catch(err => console.error(err))
            }
    }


    return(
        <div>
            <Addtraining saveTraining={saveTraining} />
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    )
}