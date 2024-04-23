import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

export default function DateComponent() {
    const [now, setNow] = useState(new Date().toString())
    useEffect(() => {
    const intervalId = setInterval(() => {
        setNow(format(new Date(), 'MMMM do yyyy, h:mm:ss a'))
    }, 1000);
    return () => clearInterval(intervalId)
    }, [])

    return (
    <>
        <p style={{fontSize: 'large', marginBottom: '40px'}}>{now}</p>
    </>
    )
}