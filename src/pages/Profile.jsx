import React, {useEffect, useState} from "react";
import { currentUser } from "../features/Services";
import frog from '../assets/frog.jpeg'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

export default function Profile() {
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const getUser = async () => {
            const current = await currentUser()
            setUser(current.result)
            setEmail(current.result.email)
            setId(current.result.userId)
            setUsername(current.result.username)
        }
        getUser()
    }, [])
    const handleClick = async () => {
        navigate('/')
    }
    return(
        <>
        <Grid container>
        <Grid item>
        <IconButton onClick={handleClick}><HomeIcon/></IconButton>
        </Grid>
        <Grid item xs={12}>
        <Box display="flex" flexDirection='column' alignItems="center" style={{marginTop: '30px'}}>
        <Avatar alt={username} src={frog} sx={{ width: 100, height: 100 }}/>
        <Typography variant="h4" style={{color: 'black', marginTop: '10px'}}>{username}</Typography>
        </Box>
        </Grid>
        </Grid>
        </>
    )
}