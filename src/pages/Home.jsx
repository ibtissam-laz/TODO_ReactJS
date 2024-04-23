import React from "react";
import DateComponent from '../dateC'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import DateTimePickerValue from "./Dates/DatePicker";
import { Grid } from '@mui/material';
import DateList from "./Dates/DateList";

export default function Home() {

    return (
        <>
        <DateComponent/>
        <Grid container justifyContent="center">
        <Grid item>
        <DateTimePickerValue/>
        </Grid>
        </Grid>
        <h2 style={{textAlign: 'center'}}>Important Dates</h2>
        <DateList/>
        </>
    )
}