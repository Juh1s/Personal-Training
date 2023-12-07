import { useState, useEffect, useRef  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
//import dayjs from 'dayjs';

export default function Training() {

    const [trainings, setTrainings] = useState([]);
    const [training, setTraining] = useState([]);
    //const [train, setTrain] = useState({activity: '', customer: {}, date: '', duration: 0, i});
    //const [gettrainings, setGettrainings] = useState([]);

    useEffect(() => {
        fetchTraining()
    }, []);

    const gridRef = useRef();

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

    const dateConversion = (date) => {
        let newDate = date.substring(5,7) + "." + date.substring(8,10) + "." + date.substring(0,4) + " " + date.substring(11,13) + ":" + date.substring(14,16)
        return newDate
    };

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

    const [columnDefs] = useState([
        { cellRenderer: params => <Button size="small" onClick={() => deleteTraining(params.data.id)
            }>Delete</Button>
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


}