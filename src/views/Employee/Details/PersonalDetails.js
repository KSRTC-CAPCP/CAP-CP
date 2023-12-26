import { Card, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, } from '@mui/material'
import React from 'react'
import { Grid } from '@mui/material'
import { Avatar, Button } from 'rsuite';
import { useRef } from 'react';


const PersonalDetails = () => {



    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Process the file as needed (e.g., upload to server, display preview, etc.)
        console.log('Uploaded file:', file);
    };
    return (
        <div>
            <Card style={{ width: '80%', margin: 'auto', marginTop: '5px', padding: '0px' }}>
                <h5 style={{ marginTop: '30px', marginLeft: '40px' }}>Personal Details</h5>


                <hr />
                <div style={{ paddingLeft: '150px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} p={3}>
                            <TextField label="Full Name With Initial" placeholder="Name" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid item xs={6} p={3}>
                            <TextField label="Employee ID" placeholder="Employee Id" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid item xs={6} p={3}>
                            <TextField label="Designation" placeholder="Designation" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField label="Height" placeholder="Height" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField label="Weight" placeholder="Weight" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField label="Mother Tongue" placeholder="Mother Tongue" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField label="Blood Group" placeholder="Blood Group" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField label="Education Qualification" placeholder="Education Qualification" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField label="Year Of Graduation" placeholder="Year Of Graduation" sx={{ width: '80%' }} />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField
                                id="date-picker-joining"
                                label="Date Of Joining"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    placeholder: 'Date Of Joining',
                                    style: { width: '235%' },
                                }}
                            />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <TextField
                                id="date-picker-birth"
                                label="Date Of Birth"
                                type="date"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    placeholder: 'Date Of Birth',
                                    style: { width: '235%' },
                                }}
                            />
                        </Grid>
                        <Grid xs={6} p={3}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Avatar alt="Passport Photo" sx={{ width: 100, height: 100 }} />
                        </Grid>
                        <Grid item>
                            <input
                                accept="image/*"
                                id="passport-photo-upload"
                                type="file"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <Button variant="contained" onClick={handleFileUpload}>
                                Upload Passport Photo
                            </Button>
                        </Grid>
                    </Grid>
                </div>

            </Card>
        </div>
    )
}

export default PersonalDetails
