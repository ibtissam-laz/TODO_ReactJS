import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DialogSelect() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');

    const handleChange = (event) => {
    setType(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
        setOpen(false);
    }
    };

    return (
    <div>
        <Button onClick={handleClickOpen}>Open select dialog</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Choose the category</DialogTitle>
        <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={type}
                onChange={handleChange}
                input={<OutlinedInput label="category" />}>
                <MenuItem value={''}>
                    <em>One</em>
                </MenuItem>
                <MenuItem value={''}>Ten</MenuItem>
                <MenuItem value={''}>Twenty</MenuItem>
                <MenuItem value={''}>Thirty</MenuItem>
                <MenuItem value={''}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}
