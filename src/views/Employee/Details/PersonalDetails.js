/*eslint-disable */

import { FormControl, InputLabel, MenuItem, Select, TextField, } from '@mui/material'
import React from 'react'
import { Grid } from '@mui/material'
import MainCard from 'ui-component/cards/MainCard';




const PersonalDetails = () => {

    const handleNextClick = () => {

        window.location.href = '/user-detail';
    };



    const [gender, setGender] = React.useState('');

    const handleChange = (event) => {
        setGender(event.target.value);
    };


    return (

        <div >
            <Grid container >
                <Grid item xs={3} p={2}>
                    <TextField label=" Name " placeholder="Name" fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label="Surname " placeholder="Surname" fullWidth required />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Mother Tongue" placeholder="Mother Tongue" fullWidth required />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Blood Group" placeholder="Blood Group" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Education Qualification" placeholder="Education Qualification" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField label="Year Of Graduation" placeholder="Year Of Graduation" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField
                        id="date-picker-birth"
                        label="Date Of Birth"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            placeholder: 'Date Of Birth',

                        }}
                    />
                </Grid>
                <Grid xs={3} p={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" required>Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={handleChange}

                        >
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                            <MenuItem value={30}>Others</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} p={2} >
                    <TextField label="Contact Number" placeholder="Contact Number" fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label="Emergency Contact Number" placeholder="Emergency Contact Number" fullWidth />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Personal Email ID" placeholder="Personal Email ID" fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Current Address " placeholder=" Current Address" fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Permanent Address " placeholder=" Permanent Address" fullWidth />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Aadhaar Number " placeholder=" Aadhaar Number" fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Pan Number " placeholder=" Pan Number" fullWidth required />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Driving License Number " placeholder="Driving License Number" fullWidth required />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField
                        id="date-picker-birth"
                        label="Driving License Expiry Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            placeholder: 'Driving License Expiry Date',

                        }}
                    />
                </Grid>
                <Grid item xs={3} p={2}>
                    <TextField label=" Passport Number " placeholder="Passport Number" fullWidth />
                </Grid>
                <Grid xs={3} p={2}>
                    <TextField
                        id="date-picker-birth"
                        label="Passport Expiry Date"
                        type="date"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            placeholder: 'Passport Expiry Date ',

                        }}
                    />
                </Grid>

            </Grid>
           
        </div>

    )
}

export default PersonalDetails
