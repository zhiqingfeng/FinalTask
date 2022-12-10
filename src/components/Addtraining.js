import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';




export default function Addtraining(props) {
    const [open, setOpen] = React.useState(false);

    const [ trainings, setTrainings ] = React.useState({
        date:new Date(), duration:'', activity:'', firstname:'', lastname:'',  id:''
    })

    
    const handleClickOpen = () => {
        setTrainings({...trainings, customter: props.row.value[1].href})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
      };
    
    const handleInputChange = (event) => {
        setTrainings({...trainings, [event.target.name]: event.target.value})
    }

    const Addtraining = () => {
        props.saveTraining(trainings);
        handleClose();
    }
   
    return(
        <div>
        <Button variant="outlined" style={{margin:10}} color="primary" onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
        >
            <DialogTitle id="alert-dialog-title">New Trainging List</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={trainings.date}
                        onChange={e => handleInputChange(e)}
                        label="Date"
                        fullWidth
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        name="duration"
                        value={trainings.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                     <TextField
                        autoFocus
                        margin="dense"
                        name="activity"
                        value={trainings.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={Addtraining} color="primary">Save</Button>
                </DialogActions>
        </Dialog>
    </div>
    )

}