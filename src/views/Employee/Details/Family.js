import { Card, TextField } from '@mui/material'
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
            <br/>
            <div >
            <Card style={{width:'50rem', height:'25rem',marginLeft:'15rem',}} >
                <div className='d-flex justify-content-between align-iteam-center'>
                    <h6 className='h5margin' >View</h6> 
                </div>
                <hr />
                <div className="name-list" style={{marginLeft:'6rem'}}>
                    <Grid className='d-flex align-items-center' container>
                        <Grid  xs={6} style={{ fontWeight: 'bolder', alignItems:'center' }}> Name</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid   > Darla</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Mather Name</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid   > Lax</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Siblings</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid   > 3</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Marital Status</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid   > Single</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Spouse Name(If married)</Grid>
                        <Grid  xs={4} >:</Grid>
                        <Grid   > -</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid  xs={6} style={{ fontWeight: 'bolder', alignItems:'center' }}> Spouse Contact Number(If married)</Grid>
                        <Grid  xs={4} >:</Grid>
                        <Grid   > -</Grid>
                    </Grid>
                </div>

            </Card></div>
        </div>






    )
}

export default Family
