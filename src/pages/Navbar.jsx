import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import PhotoMenu from './Photo'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
        main: '#7F9F80',
        },
    },
});

export default function Navbar() {

    return (
    <>
    <ThemeProvider theme={theme}>
    <AppBar position="static" style={{marginBottom: '20px', minWidth: '320px'}}>
    <Toolbar>
        <Box  style={{ flexGrow: 1 }}><Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}>Home</Link></Box>
        <Box  style={{ flexGrow: 1 }}><Link to ={"/Notes"} style={{ textDecoration: 'none', color: 'black' }}>Notes</Link></Box>
        <Box  style={{ flexGrow: 1 }}><Link to={"/Tasks"} style={{ textDecoration: 'none', color: 'black' }}>Tasks</Link></Box>
        <PhotoMenu/>
    </Toolbar>
    </AppBar>
    </ThemeProvider>
    <Outlet/>
    </>
    )
}
