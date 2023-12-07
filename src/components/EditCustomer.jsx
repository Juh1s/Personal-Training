import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerDialog from './CustomerDialog';

export default function EditCustomer({ fetchCustomers, data }) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: '',
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        streetaddress: data.streetaddress,
        postcode: data.postcode,
        city: data.city,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveCustomer = () => {
    fetch(data.links[0].href, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding customer: " + response.statusText);
        fetchCustomers();
    })
    .catch(err => console.error(err));
    handleClose();
  }


  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerDialog customer={customer} handleChange={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}