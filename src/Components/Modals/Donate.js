import * as React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';

export default function FormDialog(props) {
    //   const [open, setOpen] = useState(true);

    const handleClose = () => {
        props.handleShowDonate(false);
    };

    const [currency, setCurrency] = React.useState('');
    const handleChange = (e) => {
        setCurrency(e.target.value);
      };

    return (
        //   <Dialog onClose={handleClose}>
        <Dialog open={props.showDonate} onClose={handleClose}>

            <DialogTitle textAlign="center">Donate</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the amount you want to donate.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount-input"
                    label="Amount"
                    type="number"
                    inputProps={{ inputMode: 'numeric', step: '0.1', min: 0 }}
                    fullWidth
                    variant="standard"
                /><FormControl fullWidth>
                {/* <InputLabel>Currency</InputLabel>
                <Select
                    // labelId="demo-simple-select-label"
                    id="currency-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>$</MenuItem>
                    <MenuItem value={20}>Algo</MenuItem>
                </Select> */}
            </FormControl>
                

            </DialogContent>
            <DialogActions  style={{justifyContent: 'center'}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Donate</Button>
            </DialogActions>
        </Dialog>
    );
}
