import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function Editcustomer (props) {
    const [open, setOpen] = React.useState(false);
    const [customers, setCustomers ]= React.useState({
        firstname:'', lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:''
    })

    const handleClickOpen = () => {
      setCustomers({
        firstname: props.customers.firstname,
        lastname: props.customers.lastname,
        streetaddress: props.customers.streetaddress,
        postcode: props.customers.postcode,
        city: props.customers.city,
        email: props.customers.email,
        phone: props.customers.phone
    })

      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomers({...customers, [event.target.name]: event.target.value})
    }

    const updateCustomer= () => {
        props.updateCustomer(customers, props.car._links.car.href);
        handleClose();
    }

    return(
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Edit Car
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">Edit Customer</DialogTitle>
                    <DialogContent>
                    <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            value={customers.firstname}
                            onChange={e => handleInputChange(e)}
                            label="Firstname"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="lastname"
                            value={customers.lastname}
                            onChange={e => handleInputChange(e)}
                            label="Lastname"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="streetaddress"
                            value={customers.streetaddress}
                            onChange={e => handleInputChange(e)}
                            label="Streetaddress"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="postcode"
                            value={customers.postcode}
                            onChange={e => handleInputChange(e)}
                            label="Postcode"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="city"
                            value={customers.city}
                            onChange={e => handleInputChange(e)}
                            label="City"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            value={customers.email}
                            onChange={e => handleInputChange(e)}
                            label="Email"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            value={customers.phone}
                            onChange={e => handleInputChange(e)}
                            label="Phone"
                            fullWidth
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={updateCustomer} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}