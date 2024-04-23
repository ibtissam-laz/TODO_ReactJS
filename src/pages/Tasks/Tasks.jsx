import React, { useEffect, useState } from "react";
import axios from 'axios'
import '../../styles/style.css'
import { loggedIn, selectUser } from '../../features/Slices'
import { useSelector, useDispatch } from 'react-redux'
import { addTask, currentUser, deleteTask, doneTask, editTask } from "../../features/Services";
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';


export default function Tasks() {

    const loggedUser = useSelector(selectUser)
    const dispatch = useDispatch()
    const [tasks, setTasks] = useState([])
    const [user, setUser] = useState(null)
    const [tache, setTache] = useState('')


    const getTasks = async () => {
        dispatch(loggedIn(loggedUser))
        const current = await currentUser()
        setUser(current.result)
        try{
            const res = await axios.get('http://localhost:8000/Tasks/mine', user)
            setTasks(res.data)
        }catch(error){
            console.error('Error while getting notes!')
        }
    }
    useEffect(() => {
        console.log(user)
        getTasks()
    },[loggedUser])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const added = await addTask(user, tache)
        if(added){
            setTasks([...tasks, added])
            console.log('Task added successfully!', added)
        } 
        setTache('')
    }
    const handleToggle = async (id, value) => {
        console.log(value)
    const completed = !value;
    const res = await doneTask(id, user, completed);
    if(res.status === 200) {
        console.log(completed ? 'checked' : 'not checked');
        console.log(completed)  
    }
    getTasks()
    };

    const handleDelete = async (id) => {
        await deleteTask(id, user)
        getTasks()
    }
    // const handleEditTask = async () => {

    // }
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");


    const handleClickOpen = () => {
    setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    return(
    <>
    <h1>TODO LIST</h1>
    <Box style={{ marginBottom: '20px',}}>
    <Grid container justifyContent="center">
    <Grid item xs={6}>
    <TextField id="tache" variant="standard" placeholder="task" multiline InputProps={{ disableUnderline: true }} style={{ width: '10cm'}} 
    value={tache} onChange={(e) => setTache(e.target.value)}/>
    </Grid>
    <Grid item container xs={1} direction="column"><Grid item>
    <Tooltip title='Add' placement="right-end"><IconButton style={{backgroundColor: '#c5e1a5',}} onClick={handleSubmit}><AddIcon /></IconButton></Tooltip>
    </Grid></Grid></Grid>
    </Box>
    <Grid container justifyContent="center">
    <Grid item>
    <section className='tasks-list'>
    { tasks.length ===0 ? <span>{'No todo list yet, add tasks :) '}</span> :
    <List>
        {tasks.map((task) => {
        const labelId = `checkbox-list-label-${task.taskId}`;
        return (
            <ListItem
            key={task.taskId}
            secondaryAction={
                <Stack direction="row" spacing={1}>
                <Chip label={`${task.category}`} onClick={handleClickOpen} />
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Choose the category</DialogTitle>
        <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Category</InputLabel>
                <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                input={<OutlinedInput label="category" />}>
                <MenuItem value={task.category.PERSONAL}>
                    <em>Personal</em>
                </MenuItem>
                <MenuItem value={task.category.WORK}>Work</MenuItem>
                <MenuItem value={task.category.STUDY}>Study</MenuItem>
                <MenuItem value={task.category.IMPORTANT}>Important</MenuItem>
                <MenuItem value={task.category.OTHER}>Other</MenuItem>
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
            </Dialog>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.taskId)}>
                <DeleteIcon />
                </IconButton>
                </Stack>
            }
            disablePadding>
            <ListItemButton role={undefined} onClick={() => handleToggle(task.taskId, task.done)} dense>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={task.done}
                    inputProps={{ 'aria-labelledby': labelId }}
                    color="success" 
                />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${task.tache}`} />
            </ListItemButton>
            </ListItem>
        );
        })}
    </List> }
    </section>
    </Grid>
    </Grid>
    </>
    )
}