import { Card, Grid, TextField } from '@mui/material'
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

            <div >
            <Card style={{width:'50rem', height:'25rem',marginLeft:'15rem',}} >
                <div className='d-flex justify-content-between align-iteam-center'>
                    <h6 className='h5margin' >View</h6> 
                </div>
                <hr />
                <div className="name-list" style={{marginLeft:'6rem'}}>
                    <Grid className='d-flex align-items-center' container>
                        <Grid  xs={6} style={{ fontWeight: 'bolder', alignItems:'center' }}> Languages Know</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid> Tamil, English</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Professional Skills</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid> Java, Python</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Other Skills</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid> TeamWork</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Last Company Name</Grid>
                        <Grid xs={4}  >:</Grid>
                        <Grid> TackDo</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid xs={6}  style={{ fontWeight: 'bolder', alignItems:'center' }}> Designation While Leaving Last Company</Grid>
                        <Grid  xs={4} >:</Grid>
                        <Grid>Developer</Grid>
                    </Grid>
                    <Grid className='d-flex align-items-center' container>
                        <Grid  xs={6} style={{ fontWeight: 'bolder', alignItems:'center' }}> Total Years Of Experience</Grid>
                        <Grid  xs={4} >:</Grid>
                        <Grid>2 years</Grid>
                    </Grid>
                </div>

            </Card></div>
        </div>

    )
}

export default Skills
