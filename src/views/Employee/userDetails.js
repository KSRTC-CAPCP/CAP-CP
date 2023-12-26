import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Card, Tab } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import './userDetails.css';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import { Divider, Grid } from 'rsuite';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import PersonalDetails from './Details/PersonalDetails';






const UserDetails = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <MainCard>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab
                                label={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountCircleIcon style={{ marginRight: '5px' }} />
                                        Profile
                                    </div>
                                }
                                value="1"
                                style={{ fontSize: '15px' }}
                            />
                            <Tab label="Personal Detail" value="2" style={{ fontSize: '15px' }} />
                            <Tab label="Family Details" value="3" style={{ fontSize: '15px' }} />
                            <Tab label="Skill & Experience Details" value="4" style={{ fontSize: '15px' }} />
                            <Tab label="Bank Details" value="5" style={{ fontSize: '15px' }} />
                            <Tab label="Document Details" value="6" style={{ fontSize: '15px' }} />
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
                                    <div  style={{ backgroundColor: '#ede7f6', borderRadius: '10px', padding: '6px', display: 'inline-block', marginTop: '24px' }}>
                                        <EditNoteSharpIcon style={{ color: '#663fb5' }} />
                                    </div>


                                </div>
                                <hr />
                                <p className='ptag text-muted'>Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.</p>
                               <br/>
                                <h6 style={{ marginLeft: '24px' }}>Personal Details</h6>
                                <br/>
                                <div className="name-list">
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}>Full Name</Grid>
                                        <Grid> : JWT User</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}>Fathers Name</Grid>
                                        <Grid> : Mr. Deepen Handgun</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}>Address</Grid>
                                        <Grid> : Street 110-B Kalians Bag, Dewan, M.P. INDIA</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}>Zip Code</Grid>
                                        <Grid> : 12345</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}>Phone</Grid>
                                        <Grid> : +0 123456789 , +0 123456789</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}> Email</Grid>
                                        <Grid> : support@example.com</Grid>
                                    </Grid>
                                    <Grid className='d-flex align-items-center'>
                                        <Grid style={{fontWeight:'bolder'}}>Website</Grid>
                                        <Grid> : http://example.com</Grid>
                                    </Grid>


                                </div>

                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <PersonalDetails/>
                    </TabPanel>
                    <TabPanel value="3">Family</TabPanel>
                
                    <TabPanel value="4">Skill</TabPanel>
               
                    <TabPanel value="5">Bank</TabPanel>
                    <TabPanel value="6">Document</TabPanel>
                </TabContext>
            </Box>
        </MainCard>
    )
}

export default UserDetails
