import React, { useState, useRef, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

export default function DateList() {

    return (
    <section className='imp-date-list'>
        <Paper id='1'  style={{borderRadius: '15px', padding: '20px 30px 20px 30px', width: '12rem'}}>
        <Typography variant="h5" style={{color: '#33691e', maxHeight: '4rem', lineHeight: '1.25rem'}}>{'Today'}</Typography>
        <br/>
        <Typography variant="body2" style={{maxHeight: '10rem', lineHeight: '1.25rem', overflow: 'hidden'}}>{dayjs(new Date()).format('YYYY-MM-DD')}</Typography>
        </Paper>
    </section>
    )
}

// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import CommentIcon from '@mui/icons-material/Comment';
// import IconButton from '@mui/material/IconButton';

// export default function GutterlessList() {
//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       {[1, 2, 3].map((value) => (
//         <ListItem
//           key={value}
//           disableGutters
//           secondaryAction={
//             <IconButton aria-label="comment">
//               <CommentIcon />
//             </IconButton>
//           }
//         >
//           <ListItemText primary={`Line item ${value}`} />
//         </ListItem>
//       ))}
//     </List>
//   );
// }
