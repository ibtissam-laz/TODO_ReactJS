import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { currentUser, editContent } from '../../features/Services';
import { Typography } from '@mui/material';
export default function ContentText(props) {
    const [textC, setText] = useState(props.tx)
    const [isFocus, setIsFocus] = useState(false)
    const [user, setUser] = useState(null)

    const handleContentNote = async (event) => {
        event.preventDefault()
        const current = await currentUser()
        setUser(current.result)
        try {
            const res = await editContent(props.id, user, textC)
            console.log(res.data)
            if(res.status === 200){
                console.log('content updated!')
                setIsFocus(false)
            }
        } catch(error) {
            console.error('Error while updating the note!')
        }
    }
    
    return(
        <section id='content-text'>
        {!isFocus ? (
            <Typography
            onClick={() => {setIsFocus(true)}}>{textC}</Typography>
        ) : (
            <TextField
            multiline
            variant="standard"
            InputProps={{ disableUnderline: true }}
            autoFocus
            value={textC}
            onChange={event => setText(event.target.value)}
            onBlur={handleContentNote}/>
        )}
        </section>
    )
}