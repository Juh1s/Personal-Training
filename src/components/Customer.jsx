import { useState, useEffect, useRef  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customer() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);
    
    const gridRef = useRef();

    // Fetches customer data
    const fetchCustomers = () => {
        fetch("https://traineeapp.azurewebsites.net/api/customers")
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch:" + response.statusText);
        })
        .then(data => setCustomers(data.content) )
    };
    
    // Deletes target customer, asks for confirmation
    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?"))
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if (response.ok)
                    fetchCustomers();
                else
                    throw new Error("Error in DELETE:" + response.statusText);
                    fetchCustomers();
            })
            .catch(err => console.error(err))
        else
            fetchCustomers();
    }

    const [columnDefs] = useState([
        { cellRenderer: params => <EditCustomer fetchCustomers={fetchCustomers} data={params.data}/>, width: 100},
        { cellRenderer: params => <Button size="small" onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>, width: 120},
        { cellRenderer: params => <AddTraining fetchCustomers={fetchCustomers} data={params.data}/>, width: 170},
        { field: 'firstname', sortable: true, filter: true, floatingFilter: true},
        { field: 'lastname', sortable: true, filter: true, floatingFilter: true},
        { field: 'streetaddress', sortable: true, filter: true, floatingFilter: true},
        { field: 'postcode', sortable: true, filter: true, floatingFilter: true},
        { field: 'city', sortable: true, filter: true, floatingFilter: true},
        { field: 'email', sortable: true, filter: true, floatingFilter: true},
        { field: 'phone', sortable: true, filter: true, floatingFilter: true}
      ]);

    // Checks to see if there are any customers before letting the grid be seen
    if(customers.length > 1){
    return(
    <Container maxWidth={false} disableGutters>
      <AddCustomer fetchCustomers={fetchCustomers} justifyContent={"right"} />
      <Stack alignItems={"center"} justifyContent={"center"}>
        <div role='table' className='ag-theme-material' style={{ width: 1000, height: 500}} >
          <AgGridReact
              ref={gridRef}
              onGridReady={params => gridRef.current = params.api}
              rowSelection='single'
              columnDefs={columnDefs}
              rowData={customers}
              animateRows={true}
          />

        </div>
      </Stack>
    </Container>
    );
    } else {
    return(<AddCustomer fetchCustomers={fetchCustomers} justifyContent={"right"} />);
    }
}
