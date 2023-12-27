import { Grid, TextField } from '@mui/material'
import React from 'react'


const Skills = () => {
    return (
        <div>
            <Grid container >
                <Grid item xs={3} p={2}>
                    <TextField label="Languages Know " placeholder="Languages Know " fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label="Professional Skills " placeholder="Professional Skills" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Other Skills" placeholder="Other Skills" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Last Company Name" placeholder="Last Company Name" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Designation While Leaving Last Company" placeholder="Designation While Leaving Last Company" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Total Years Of Experience" placeholder="Total Years Of Experience" fullWidth />
                </Grid>
            </Grid>
        </div>

    )
}

export default Skills
