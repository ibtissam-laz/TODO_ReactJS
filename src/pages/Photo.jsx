import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import frog from '../assets/frog.jpeg'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ResponsiveDialog from './Logout';
import { Button } from '@mui/material';

export default function PhotoMenu({username}) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const navigate = useNavigate()
    const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
    setOpen(false);
    };
    const handleProfile = () => {
            navigate('/Profile')
    }
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

  // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
    }
    prevOpen.current = open;
    }, [open]);
return(
    <div>
    <IconButton ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{margin: '5px 1px 5px 20px'}}>
        <Avatar alt={username} src={frog} />
    </IconButton>
    <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        >
        {({ TransitionProps, placement }) => (
        <Grow
            {...TransitionProps}
            style={{
            transformOrigin:
            placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}>
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleProfile}><AccountBoxIcon/><Button variant="text">Profile</Button></MenuItem>
                    <MenuItem><LogoutIcon/><ResponsiveDialog/></MenuItem>
                </MenuList>
                </ClickAwayListener>
            </Paper>
        </Grow>
        )}
    </Popper>
    </div>
)
}
