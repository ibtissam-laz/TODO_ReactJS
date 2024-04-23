import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { currentUser, editTitle } from '../../features/Services';
import { Typography } from '@mui/material';

export default function ContentTitle(props) {
    const [titleC, setTitle] = useState(props.t)
    const [isFocus, setIsFocus] = useState(false)
    const [user, setUser] = useState(null)
    const handleTitleNote = async (event) => {
        event.preventDefault()
        const current = await currentUser()
        setUser(current.result)
        try {
            const res = await editTitle(props.id, user, titleC)
            console.log(res.data)
            if(res.status === 200){
                console.log('title updated!')  
                setIsFocus(false)
            }
        } catch(error) {
            console.error('Error while updating the note!')
        }
    }
    
    return(
        <section id='content-title'>
        {!isFocus ? (
            <Typography
            onClick={() => {setIsFocus(true)}}>{titleC}</Typography>
        ) : (
            <TextField
            multiline
            variant="standard"
            InputProps={{ disableUnderline: true }}
            autoFocus
            value={titleC}
            onChange={event => setTitle(event.target.value)}
            onBlur={handleTitleNote}/>
        )}
        </section>
    )
}