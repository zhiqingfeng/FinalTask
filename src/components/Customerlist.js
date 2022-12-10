import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Button from '@mui/material/Button';
import Addcustomers from './Addcustomer';
import Editcustomer from './Editcustomer';

export default function Customerslist () {
    const [ customers, setCustomers ] = useState([]);

    useEffect(() => fetchData(),[]);
    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const columns =[
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <Editcustomer updateCustomer= { updateCustomer} customers={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor:'_links.self.href',
            Cell: row => <Button color="secondary" size="small"  onClick={() => deleteCustomer(row.value)}>Delete</Button>
            //because already import the Buttom materails, so we could change button--> Button
            // <button onClick={() => deleteCustomer(row.value)}>Delete</button>--> <Button></Button>
        }
    ]

    const saveCustomer = (customers) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
    }

    const updateCustomer = (customers, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customers)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm("Are you sure?")){
            fetch(link.links[0].href, {method: 'DELETE'}) //{object}
            .then(response => fetchData())
            .catch(err => console.error(err))
            }
    }
 
    return(
        <div>
            <Addcustomers saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    )
}