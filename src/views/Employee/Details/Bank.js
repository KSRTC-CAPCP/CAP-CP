import { Card, Grid, TextField } from '@mui/material'
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
                        <TextField label="Bank Branch Name " placeholder="Bank Branch Name" fullWidth required />
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="Bank Account Number" placeholder="Bank Account Number" fullWidth required />
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="IFSC Code" placeholder="IFSC Code" fullWidth required />
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="EPFO UAN Number" placeholder="EPFO UAN Number" fullWidth />
                    </Grid>
                    <Grid xs={3} p={2}>
                        <TextField label="ESIC Number" placeholder="ESIC Number" fullWidth />
                    </Grid>
                </Grid>
            </div>
            <div >
                <Card style={{ width: '50rem', height: '25rem', marginLeft: '15rem', }} >
                    <div className='d-flex justify-content-between align-iteam-center'>
                        <h6 className='h5margin' >View</h6>
                    </div>
                    <hr />
                    <div className="name-list" style={{ marginLeft: '6rem' }}>
                        <Grid className='d-flex align-items-center' container>
                            <Grid xs={6} style={{ fontWeight: 'bolder', alignItems: 'center' }}>Bank Name</Grid>
                            <Grid xs={2}  >:</Grid>
                            <Grid> Indian Bank</Grid>
                        </Grid>
                        <Grid className='d-flex align-items-center' container>
                            <Grid xs={6} style={{ fontWeight: 'bolder', alignItems: 'center' }}> Bank Branch Name</Grid>
                            <Grid xs={2}  >:</Grid>
                            <Grid> Ayanampakam</Grid>
                        </Grid>
                        <Grid className='d-flex align-items-center' container>
                            <Grid xs={6} style={{ fontWeight: 'bolder', alignItems: 'center' }}> Bank Account Number</Grid>
                            <Grid xs={2}  >:</Grid>
                            <Grid> 123459SSO6145987</Grid>
                        </Grid>
                        <Grid className='d-flex align-items-center' container>
                            <Grid xs={6} style={{ fontWeight: 'bolder', alignItems: 'center' }}> IFSC Code</Grid>
                            <Grid xs={2}  >:</Grid>
                            <Grid> 12365478</Grid>
                        </Grid>
                        <Grid className='d-flex align-items-center' container>
                            <Grid xs={6} style={{ fontWeight: 'bolder', alignItems: 'center' }}> EPFO UAN Number</Grid>
                            <Grid xs={2} >:</Grid>
                            <Grid>4569587</Grid>
                        </Grid>
                        <Grid className='d-flex align-items-center' container>
                            <Grid xs={6} style={{ fontWeight: 'bolder', alignItems: 'center' }}> ESIC Number</Grid>
                            <Grid xs={2} >:</Grid>
                            <Grid>12587654</Grid>
                        </Grid>
                    </div>

                </Card></div>

        </div>
    )
}

export default Bank
