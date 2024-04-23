import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { editTask, currentUser } from '../../features/Services';
import { Typography } from '@mui/material';
export default function Tache(props) {
    const [tache, setTache] = useState(props.tache)
    const [isFocus, setIsFocus] = useState(false)
    const [user, setUser] = useState(null)

    const handleTache = async (event) => {
        event.preventDefault()
        const current = await currentUser()
        setUser(current.result)
        try {
            const res = await editTask(props.id, user, {tache: tache})
            console.log(res.data)
            if(res.status === 200){
                console.log('task updated!')
                setIsFocus(false)
            }
        } catch(error) {
            console.error('Error while updating the note!')
        }
    }
    
    return(
        <section id='task-tache'>
        {!isFocus ? (
            <Typography
            onClick={() => {setIsFocus(true)}}>{tache}</Typography>
        ) : (
            <TextField
            multiline
            variant="standard"
            InputProps={{ disableUnderline: true }}
            autoFocus
            value={tache}
            onChange={event => setTache(event.target.value)}
            onBlur={handleTache}/>
        )}
        </section>
    )
}