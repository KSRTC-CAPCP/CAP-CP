import { Grid, TextField } from '@mui/material'
import React from 'react'

const Bank = () => {
    return (
        <div>
            <div>
                <Grid container >
                    <Grid item xs={3} p={2}>
                        <TextField label="Bank Name " placeholder="Bank Name " fullWidth required />
                    </Grid>
                    <Grid item xs={3} p={2}>
                        <TextField label="Bank Branch Name " placeholder="Bank Branch Name" fullWidth  required/>
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="Bank Account Number" placeholder="Bank Account Number" fullWidth  required />
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="IFSC Code" placeholder="IFSC Code" fullWidth  required/>
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="EPFO UAN Number" placeholder="EPFO UAN Number" fullWidth />
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="ESIC Number" placeholder="ESIC Number" fullWidth />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Bank
