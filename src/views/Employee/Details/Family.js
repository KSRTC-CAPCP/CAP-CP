import { TextField } from '@mui/material'
import React from 'react'
import { Grid } from '@mui/material'

const Family = () => {
    return (

        <div>
            <Grid container >
                <Grid item xs={3} p={2}>
                    <TextField label="Father Name " placeholder="Father Name" fullWidth />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label="Mather Name " placeholder="Mather Name" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Siblings" placeholder="Siblings" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Marital Status" placeholder="Marital Status" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Spouse Name(If married)" placeholder="Spouse Name(If married)" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Spouse Contact Number(If married)" placeholder="Spouse Contact Number(If married)" fullWidth />
                </Grid>
            </Grid>
        </div>






    )
}

export default Family
