import React, { useState, useEffect } from 'react'
import { loggedIn, selectUser } from '../../features/Slices'
import { useSelector, useDispatch } from 'react-redux'
import { addNote, currentUser } from '../../features/Services'
import axios from 'axios'
import ScrollNote from './ScrollNote'
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export default function Notes() {
    const loggedUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const [notes, setNotes] = useState([])
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    
        const getNotes = async () => {
            dispatch(loggedIn(loggedUser))
            const current = await currentUser()
            setUser(current.result)
            try{
                const res = await axios.get('http://localhost:8000/Notes/mine', user)
                setNotes(res.data)
            }catch(error){
                console.error('Error while getting notes!')
            }
        }
    useEffect(() => {
        console.log(user)
        getNotes()
    },[loggedUser])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const added = await addNote(user, title, content)
        if(added){
            setNotes([...notes, added])
            console.log('Note added successfully!', added)
        } 
        setTitle('')
        setContent('')
    }

    return(
    <> 
    <Box style={{ marginBottom: '20px',}}>
    <Grid container justifyContent="center">
    <Grid item xs={6}>
    <TextField id="title" variant="standard" placeholder="title" multiline InputProps={{ disableUnderline: true }} style={{ width: '10cm'}} 
    value={title} onChange={(e) => setTitle(e.target.value)}/>
    <br/>
    <TextField id="content" multiline placeholder='create a note...' variant="standard" InputProps={{ disableUnderline: true }} style={{ width: '10cm'}} 
    value={content} onChange={(e) => setContent(e.target.value)}/>
    </Grid>
    <Grid item container xs={1} direction="column"><Grid item>
    <Tooltip title='Add' placement="right-end"><IconButton style={{backgroundColor: '#c5e1a5',}} onClick={handleSubmit}><AddIcon /></IconButton></Tooltip>
    </Grid></Grid></Grid>
    </Box>
    <br/>
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" justifyContent='center' style={{paddingBottom: '50px'}}>
    {notes.map(note => (
    <ScrollNote key={note.noteId} noteId={note.noteId} title={note.title} content={note.content} updatedDate={note.updatedDate} getNotes={getNotes}/> ))}
    </Stack>
    </>
    )
}
