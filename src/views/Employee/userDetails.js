import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Tab, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import Avatar from '@mui/material/Avatar';
import './userDetails.css';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Divider, Grid } from 'rsuite';
import PersonalDetails from './Details/PersonalDetails';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import Family from './Details/Family';
import Skills from './Details/Skills';
import Bank from './Details/Bank';
import Documents from './Details/Documents';




const UserDetails = () => {


    const [leave, setLeave] = React.useState('');

    const handleChanges = (event) => {
        setLeave(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const handleDelete = () => {
        setOpen(true);

    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleNext1 = () => {
        setValue('3')
    }
    const handleNext2 = () => {
        setValue('4')
    }
    const handleNext3 = () => {
        setValue('5')
    }
    const handleNext4 = () => {
        setValue('6')
    }

    // const [description, setDescription] = useState('');

    return (
        <MainCard>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">

                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountCircleTwoToneIcon style={{ marginRight: '15px' }} />
                                        Profile
                                    </div>
                                }
                                value="1"
                                style={{ fontSize: '15px' }}
                            />
                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <DescriptionTwoToneIcon style={{ marginRight: '15px' }} />
                                        Personal Details
                                    </div>
                                }
                                value="2"
                                style={{ fontSize: '15px' }}
                            />
                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Diversity2TwoToneIcon style={{ marginRight: '15px' }} />
                                        Family Details
                                    </div>
                                }
                                value="3"
                                style={{ fontSize: '15px' }}
                            />
                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <EngineeringTwoToneIcon style={{ marginRight: '15px' }} />
                                        Skill & Experience Details
                                    </div>
                                }
                                value="4"
                                style={{ fontSize: '15px' }}
                            />
                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountBalanceTwoToneIcon style={{ marginRight: '15px' }} />
                                        Bank Details
                                    </div>
                                }
                                value="5"
                                style={{ fontSize: '15px' }}
                            />
                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <ArticleTwoToneIcon style={{ marginRight: '15px' }} />
                                        Document Details
                                    </div>
                                }
                                value="6"
                                style={{ fontSize: '15px' }}
                            />
                            <div className='float-end'>
                                <Button
                                    // style={{ marginLeft: '480px' }}
                                    sx={{
                                        backgroundColor: '#ede7f6',
                                        color: '#5e35b1',
                                        transition: 'background-color 0.3s, color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#5e35b1',
                                            color: '#ede7f6',
                                        },
                                    }}
                                    onClick={handleDelete}
                                >
                                    Request To Leave
                                </Button>


                                <Dialog
                                    fullWidth
                                    open={open}

                                // keepMounted

                                >
                                    <DialogTitle className='d-flex justify-content-between m-0'>
                                        <Typography variant="h3">Request For Leave</Typography>
                                        <ClearIcon onClick={() => setOpen(false)} />
                                    </DialogTitle>
                                    <Divider />
                                    <DialogContent className='m-1'>


                                        <FormControl fullWidth>
                                            <InputLabel id="demo-select-small-label">Leave</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={leave}
                                                label="Leave"
                                                onChange={handleChanges}
                                                style={{ width: '100%' }}
                                            >
                                                <MenuItem value={10}>CL - Casual Leave</MenuItem>
                                                <MenuItem value={20}>SL - Sick Leave</MenuItem>
                                                <MenuItem value={30}>PL - Personal Leave</MenuItem>
                                                <MenuItem value={30}>EL - Emergency Leave</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            id="description"
                                            className='mt-1'
                                            label="Description"
                                            multiline
                                            rows={3}
                                            variant="outlined"
                                            fullWidth
                                        // value={description}

                                        />

                                    </DialogContent>
                                    <br />
                                    <DialogActions className="d-flex justify-content-center mb-1">
                                        <Button variant="outlined" onClick={() => setOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" >
                                            Request
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>


                        </TabList>
                    </Box>
                    <TabPanel value="1" >
                        <div className='d-flex align-iteam-center'>
                            <Card className="card-style">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="profile-container">
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkx7MKWlJ53IVpHCSTOf4UixgZ16UXWQDqQ&usqp=CAU"
                                            className="avatar"
                                        />
                                        <div className="text-container">
                                            <h5>Darla Josh</h5>
                                            <span>Developer</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '30px' }} className='text-muted'>
                                        <p>Logged In : 12.00PM</p>
                                    </div>
                                </div>
                                <Divider />
                                <div className='p-2'>
                                    <div className="d-flex justify-content-between align-items-center contact-section p-2">
                                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '35px' }}>
                                            <EmailTwoToneIcon />
                                            <h6 style={{ margin: '0 0 0 5px' }}>Email</h6>
                                        </div>

                                        <div className='text-muted'>
                                            <span>Tharavasu@gmail.com</span>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="d-flex justify-content-between align-items-center contact-section p-2">
                                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '35px' }}>
                                            <PhonelinkRingTwoToneIcon />
                                            <h6 style={{ margin: '0 0 0 5px' }}>Phone</h6>
                                        </div>

                                        <div className='text-muted'>
                                            <span>(+91) 2345678945</span>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="d-flex justify-content-between align-items-center contact-section p-2 " >
                                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '35px' }}>
                                            <PinDropTwoToneIcon />
                                            <h6 style={{ margin: '0 0 0 5px' }}>Location</h6>
                                        </div>

                                        <div className='text-muted'>
                                            <span>Poonamallee</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between align-iteam-center mar-top ' >
                                        <div >
                                            <h6 className="centered">5</h6>
                                            <span className='text-muted'>PROJECT</span>
                                        </div>
                                        <div >
                                            <h6 className="centered">10</h6>
                                            <span className='text-muted'>TASK</span>
                                        </div>
                                        <div >
                                            <h6 className="centered">7/10</h6>
                                            <span className='text-muted'> PERFORMANCE</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card >
                                <div className='d-flex justify-content-between align-iteam-center'>
                                    <h6 className='h5margin' >About Me</h6>
                                    <div style={{ backgroundColor: '#ede7f6', borderRadius: '10px', padding: '6px', display: 'inline-block', marginTop: '24px' }}>
                                        <EditTwoToneIcon style={{ color: '#663fb5', marginBottom: '0.9px' }} />
                                    </div>


                                </div>
                                <hr />
                                <p className='ptag text-muted'>Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.</p>
                                <br />
                                <h6 style={{ marginLeft: '24px' }}>Personal Details</h6>
                                <br />
                                <div className="name-list">
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}>Full Name</Grid>
                                        <Grid>:</Grid>
                                        <Grid> JWT User</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}>Fathers Name</Grid>
                                        <Grid>:</Grid>
                                        <Grid>  Mr. Deepen Handgun</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}>Address</Grid>
                                        <Grid>:</Grid>
                                        <Grid>  Street 110-B Kalians Bag, Dewan, M.P. INDIA</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}>Zip Code</Grid>
                                        <Grid>:</Grid>
                                        <Grid>  12345</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}>Phone</Grid>
                                        <Grid>:</Grid>
                                        <Grid>  +0 123456789 , +0 123456789</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}> Email</Grid>
                                        <Grid>:</Grid>
                                        <Grid>  support@example.com</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{ fontWeight: 'bolder' }}>Website</Grid>
                                        <Grid>:</Grid>
                                        <Grid>  http://example.com</Grid>
                                    </Grid>


                                </div>

                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <PersonalDetails />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                sx={{
                                    backgroundColor: '#ede7f6',
                                    color: '#5e35b1',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#5e35b1',
                                        color: '#ede7f6',
                                    },
                                }}
                                onClick={handleNext1}
                            >
                                Next
                            </Button>
                        </Box>
                    </TabPanel>
                    <TabPanel value="3">
                        <Family />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                sx={{
                                    backgroundColor: '#ede7f6',
                                    color: '#5e35b1',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#5e35b1',
                                        color: '#ede7f6',
                                    },
                                }}
                                onClick={handleNext2}
                            >
                                Next
                            </Button>
                        </Box>
                    </TabPanel>

                    <TabPanel value="4">
                        <Skills />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                sx={{
                                    backgroundColor: '#ede7f6',
                                    color: '#5e35b1',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#5e35b1',
                                        color: '#ede7f6',
                                    },
                                }}
                                onClick={handleNext3}
                            >
                                Next
                            </Button>
                        </Box>

                    </TabPanel>

                    <TabPanel value="5">
                        <Bank />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                sx={{
                                    backgroundColor: '#ede7f6',
                                    color: '#5e35b1',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#5e35b1',
                                        color: '#ede7f6',
                                    },
                                }}
                                onClick={handleNext4}
                            >
                                Next
                            </Button>
                        </Box>

                    </TabPanel>
                    <TabPanel value="6">

                        <Documents />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                sx={{
                                    backgroundColor: '#ede7f6',
                                    color: '#5e35b1',
                                    transition: 'background-color 0.3s, color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#5e35b1',
                                        color: '#ede7f6',
                                    },
                                }}

                            >
                                Submit
                            </Button>
                        </Box>
                    </TabPanel>

                </TabContext>
            </Box>


        </MainCard>
    )
}

export default UserDetails
