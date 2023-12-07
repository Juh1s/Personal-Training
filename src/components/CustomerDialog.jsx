import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

function CustomerDialog({ customer, handleChange }) {
    return(
        <DialogContent>
          <TextField
            margin="dense"
            label="First name"
            fullWidth
            variant="standard"
            value={customer.firstname}
            onChange={e => handleChange({ ...customer, firstname: e.target.value }) }
          />
          <TextField
            margin="dense"
            label="Last name"
            fullWidth
            variant="standard"
            value={customer.lastname}
            onChange={e => handleChange({ ...customer, lastname: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={e => handleChange({ ...customer, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={e => handleChange({ ...customer, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            variant="standard"
            value={customer.streetaddress}
            onChange={e => handleChange({ ...customer, streetaddress: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
            value={customer.postcode}
            onChange={e => handleChange({ ...customer, postcode: e.target.value })}
          />
          <TextField
            margin="dense"
            label="city"
            fullWidth
            variant="standard"
            value={customer.city}
            onChange={e => handleChange({ ...customer, city: e.target.value })}
          />
        </DialogContent>

    );
}

export default CustomerDialog;