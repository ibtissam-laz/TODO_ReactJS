import React from 'react';
import '../../styles/style.css'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
export default function DateTimePickerValue() {
    const [value, setValue] = useState(dayjs(new Date()));

    return (
    <section className='date-time-picker'>
    <h4>Pick a date : </h4>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker sx={{width: '400px', bgcolor: 'white', boxShadow: '0 0 5px #89be8a', borderRadius: '5px'}}
            value={value}
            onChange={(newValue) => setValue(newValue)}/>
        </DemoContainer>
    </LocalizationProvider>
    </section>
    );
}