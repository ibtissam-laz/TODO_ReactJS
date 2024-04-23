import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { deleteNote, currentUser } from '../../features/Services';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import ContentTitle from './ContentTitle';
import ContentText from './ContentText';


export default function ScrollNote(props) {
    const [isOpen, setOpen] = useState(false)
    const navigate = useNavigate()
    
    const handleClickOpen = () => {
        setOpen(true)
        navigate(`/Notes/${props.noteId}`)
    }


    const handleClose = () => {
        setOpen(false)
        props.getNotes()
        navigate('/Notes')
    }

    const descriptionElementRef = useRef(null)
    useEffect(() => {
    if (isOpen) {
        const { current: descriptionElement } = descriptionElementRef
        if (descriptionElement !== null) {
        descriptionElement.focus()
        }
    }
    }, [isOpen])

    const formatDate = (dateString) => {
        const format = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-US', format)
    }

    const handleDelete = async () => {
        const current = await currentUser()
            await deleteNote(props.noteId, current.result)
            props.getNotes()
    }
    

    return (
    <section id='scroll-note'>
    <Paper id={props.noteId}  style={{borderRadius: '15px', padding: '20px 30px 20px 30px', width: '12rem'}}
        onClick={handleClickOpen}>
        <Typography variant="h5" style={{color: '#33691e', maxHeight: '4rem', lineHeight: '1.25rem'}}>{props.title}</Typography>
        <br/>
        <Typography variant="body2" style={{maxHeight: '10rem', lineHeight: '1.25rem', overflow: 'hidden'}}>{props.content}</Typography>
    </Paper>
    <Dialog
        id={props.noteId}
        open={isOpen}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title"><ContentTitle t={props.title} id={props.noteId} getNotes={props.getNotes}/></DialogTitle>
        <DialogContent dividers={false}>
            <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef}>
            <ContentText tx={props.content} id={props.noteId} getNotes={props.getNotes}/>
            </DialogContentText>
            <br/>
            <Typography variant="caption" >
            last modification : {formatDate(props.updatedDate)}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Tooltip title='delete'><IconButton size='small' onClick={handleDelete}><DeleteIcon/></IconButton></Tooltip>
            <Tooltip title='cancel'><IconButton size='small' onClick={handleClose}><CancelIcon/></IconButton></Tooltip>
        </DialogActions>
    </Dialog>
    </section>
    )
}
