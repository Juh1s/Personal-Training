import { useState, useEffect, useRef  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Training() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTraining()
    }, []);

    const gridRef = useRef();

    // Fetches the data of all trainings
    const fetchTraining = () => {
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Error in fetch:" + response.statusText);
        })
        .then(data => setTrainings(data))
    };

    // Takes the date given by the database and turns it into form "DD.MM.YYYY hh:mm"
    const dateConversion = (date) => {
        let newDate = ""
        newDate = date.substring(5,7) 
        + "." + date.substring(8,10)
        + "." + date.substring(0,4)
        + " " + date.substring(11,13)
        + ":" + date.substring(14,16)
        return newDate
    };

    // Deletes the unwanted training from the list
    const deleteTraining = (url) => {
        if (window.confirm("Are you sure?"))
            fetch("http://traineeapp.azurewebsites.net/api/trainings/"+url, {method: 'DELETE'})
            .then(response => {
                if (response.ok)
                    fetchTraining()
                else
                    throw new Error("Error in DELETE:" + response.statusText);
                    fetchTraining()
            })
            .catch(err => console.error(err))
        else
            fetchTraining()
    };

    
    // "Delete", Activity, Date, Duration and Customer columns.
    // Works perfectly well when the attributes in database is all in correct form.
    // Can not handle attributes with missing values submitted by concurrent users.
    // Database is supposed to keep the information in correct form, not the Front end.
    const [columnDefs] = useState([
        { cellRenderer: params => <Button size="small" onClick={() => 
            deleteTraining(params.data.id)}>Delete</Button>, width: 120
        },
        { field: 'activity', sortable: true, filter: true, floatingFilter: true},
        { field: 'date', sortable: true, filter: true, floatingFilter: true, valueGetter:function(params){
            return dateConversion(params.data.date)
        }},
        { field: 'duration', sortable: true, filter: true, floatingFilter: true},
        { headerName: "Customer", field: 'name', filter: true, valueGetter:function(params){
            return params.data.customer.firstname + " " + params.data.customer.lastname
        }}
    ]);

    // Checks that the grid isn't given if it would recive parameters
    // that would be read as null and cause fatal error.
    if(trainings.length > 1){
    return(
    <Container>
        <Stack alignItems={"center"} justifyContent={"center"}>
        <div role='table' className='ag-theme-material' style={{ width: 1000, height: 500}} >
          <AgGridReact
              ref={gridRef}
              onGridReady={params => gridRef.current = params.api}
              rowSelection='single'
              columnDefs={columnDefs}
              rowData={trainings}
              animateRows={true}
          />

        </div>
      </Stack>
    </Container>
    );
    } else {
    return(<h1>Training is empty, please add some training.</h1>);
    }


}