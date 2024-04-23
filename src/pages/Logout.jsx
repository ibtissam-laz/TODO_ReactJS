import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { logoutUser } from '../features/Services';
import { useNavigate } from 'react-router-dom'
import { loggedOut, logout, selectUser, selectIsLoggedIn } from '../features/Slices';
import { useSelector, useDispatch } from 'react-redux';
export default function ResponsiveDialog() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedUser = useSelector(selectUser)
    const SloggedIn = useSelector(selectIsLoggedIn)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout = async () => {
        await logoutUser();
        navigate('/Login')
        dispatch(logout(SloggedIn))
        dispatch(loggedOut(loggedUser))
        console.log('You logged out!')
    }
    return (
    <>
        <Button variant="text" onClick={handleClickOpen}>
        Logout
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
            {"Do You Want To Logout?"}
        </DialogTitle>
        <DialogActions>
            <Button autoFocus onClick={handleLogout}>
            Logout
            </Button>
            <Button onClick={handleClose} autoFocus>
            Cancel
            </Button>
        </DialogActions>
        </Dialog>
    </>
    );
}
