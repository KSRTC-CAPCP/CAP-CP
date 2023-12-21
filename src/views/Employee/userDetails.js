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
import { Divider } from 'rsuite';








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
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </Box>
        </MainCard>
    )
}

export default UserDetails
