import { Stack, Rating } from '@mui/material'
import React, { useState } from 'react'

const MyRating = () => {
    const [value, setValue] = useState(null)
    const handleChange = (newValue) =>{
        setValue(newValue)
    }
    return (
        <Stack spacing={2}>
            <Rating value={value} onChange={handleChange} precision={1} size='large'/>
        </Stack>
    )
}

export default MyRating;