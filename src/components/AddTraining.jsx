import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining({ fetchCustomers, data }) {
  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: data.links[0].href,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTraining = () => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(training)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding training: " + response.statusText);
        fetchCustomers();
    })
    .catch(err => console.error(err));

    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD TRAINING
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            fullWidth
            variant="standard"
            value={training.date}
            onChange={e => setTraining({...training, date: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={training.activity}
            onChange={e => setTraining({...training, activity: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}