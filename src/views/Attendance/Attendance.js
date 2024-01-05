/*eslint-disable */

import MainCard from 'ui-component/cards/MainCard';
import './Attendance.css';
import React from 'react';
import { Avatar, Card, Table, TableBody, TableHead } from '@mui/material';
import Stack from '@mui/material/Stack';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { Box } from '@mui/system';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import Divider from '@mui/material/Divider';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Button from '@mui/material/Button';



const data = [
  {
    SNo: 1,
   
    Date: '2023-12-25',
    Name: 'Sara',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Present',
   
  },
  {
    SNo: 2,
   
    Date: '2023-12-25',
    Name: 'Sara',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Leave',
   
  },
  {
    SNo: 3,
   
    Date: '2023-12-25',
    Name: 'Sara',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Present',
   
  },
  {
    SNo: 4,
    
    Date: '2023-12-25',
    Name: 'Sara',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Leave',
   
  },
];









const Attendance = () => {


  const columns = useMemo(
    () => [
      {
        accessorKey: 'SNo',
        header: 'S No',
        size: 100,
      },
      // {
      //   accessorKey: 'EmpCode',
      //   header: 'Emp Code',
      //   size: 150,
      // },
      {
        accessorKey: 'Date',
        header: 'Date',
        size: 150,
      },
      // {
      //   accessorKey: 'Name',
      //   header: 'Name',
      //   size: 200,
      // },
      {
        accessorKey: 'Shift',
        header: 'Shift',
        size: 150,
      },
      {
        accessorKey: 'Intime',
        header: 'In Time',
        size: 150,
      },
      {
        accessorKey: 'Outtime',
        header: 'Out Time',
        size: 150,
      },
      {
        accessorKey: 'Status',
        header: 'Status',
        size: 300,
        Cell: ({ value,row }) => 
          (
          <div>
            {row?.original?.Status === 'Present' && (
              <Button
                variant="outlined"
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#b9f6ca',
                  color: '#00c857',
                  border: '2px solid #00c857',
                }}
              >
                Present
              </Button>
            )}
            {row?.original?.Status === 'Leave' && (
              <Button
                variant="outlined"
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#ef9a9a',
                  color: '#c6282f',
                  border: '2px solid #c6282f',
                }}
              >
                Leave
              </Button>
            )}
          </div>
        ),
      },
      // {
      //   accessorKey: 'Action',
      //   header: 'Action',
      //   size: 150,
      //   Cell: ({ renderedCellValue, row }) => (
      //     <Button variant="outlined">
      //   Edit
      // </Button>
      //   ),
      // },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'popover',
  });

  const commonStyles = {
    m: 1,
    border: '2.5px solid #f0f0f0',
    width: '80rem',
    height: '10rem',
    marginLeft: '55px',

  };


  return (
    <div className="max" style={{ marginLeft: '60px' }}>
      <MainCard >
        <h5 className='Attendh5'>Attendance</h5>
        <Grid className='d-flex '>

          <Card className="card-styleatt" style={{ backgroundColor: '#fff8e1', borderColor: '#f1e7c5', marginLeft: '110px' }}>
            <Grid className="d-flex justify-content-between align-items-center">
              <div className="avatarimage">

                <Stack direction="row" spacing={2}>
                  <Avatar style={{ marginRight: '15px', backgroundColor: '#f5ebc9', color: '#efba05' }}>V</Avatar>
                </Stack>

                <div className="text-container">
                  <h6>Vimal{name}</h6>
                  <span className='text-muted' style={{ fontSize: '12px' }}>Developer</span>
                </div>
              </div>
            </Grid>
          </Card>
          <Card className="card-styleatt" style={{ backgroundColor: '#b9f6ca', borderColor: '#8de5a6' }}>
            <Grid className="d-flex ">
              <div className="avatarimage">

                <Stack direction="row" spacing={2}>
                  <Avatar style={{ marginRight: '15px', backgroundColor: '#87e3a1', color: '#00c853' }}> <BackHandOutlinedIcon /> </Avatar>
                </Stack>

                <div className="text-container">
                  <h6>Employee ID{name}</h6>
                  <span className='text-muted' style={{ fontSize: '12px' }}>CAC00012</span>
                </div>
              </div>
            </Grid>
          </Card>
          <Card className="card-styleatt" style={{ backgroundColor: '#cce8fa', borderColor: '#9fd2f3' }}>
            <Grid className="d-flex justify-content-between align-items-center">
              <div className="avatarimage">

                <Stack direction="row" spacing={2}>
                  <Avatar style={{ marginRight: '15px', backgroundColor: '#a2d3f3', color: '#1da1f2' }}> <InsertInvitationOutlinedIcon /> </Avatar>
                </Stack>

                <div className="text-container">
                  <h6>Joining Date {name}</h6>
                  <span className='text-muted' style={{ fontSize: '12px' }}>12 Jan 2015</span>
                </div>
              </div>
            </Grid>
          </Card>
          <Card className="card-styleatt" style={{ backgroundColor: '#e7e0f4', borderColor: '#d1bdf5' }}>
            <Grid className="d-flex justify-content-between align-items-center">
              <div className="avatarimage">

                <Stack direction="row" spacing={2}>
                  <Avatar style={{ marginRight: '15px', backgroundColor: '#d0bef3', color: '#7e58c2' }}> <AccountTreeOutlinedIcon /> </Avatar>
                </Stack>

                <div className="text-container">
                  <h6>Department {name}</h6>
                  <span className='text-muted' style={{ fontSize: '12px' }}>Software</span>
                </div>
              </div>
            </Grid>
          </Card>
        </Grid>
      </MainCard>
      <br />
      <br />
      <div >
        <MainCard>
          <Box sx={{ ...commonStyles, borderRadius: '16px' }} >
            <Grid className='d-flex justify-content-center align-item-center'>
              <Grid style={{ marginTop: '20px' }} >
                <div className='justify-content-center align-item-center'>
                  <Stack direction="row" spacing={2}>
                    <Avatar style={{
                      backgroundColor: '#e7e0f4',
                      color: '#7e58c2',
                      marginLeft: '-10px',
                      width: '60px',
                      height: '60px',
                      marginRight: '5rem'
                    }}>
                      <LaptopChromebookOutlinedIcon />
                    </Avatar>
                  </Stack>
                  <br />
                  <h5 style={{ marginLeft: '-10px' }}>08.00</h5>
                  <span className='text-muted' style={{ marginLeft: '-4rem' }} >Average Working Hour</span>
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem style={{ marginLeft: '20px', width: '10px', height: '8rem', marginTop: '11px' }} />
              <Grid style={{ marginTop: '20px', marginLeft: '10rem' }} >
                <div className='justify-content-center align-item-center'>
                  <Stack direction="row" spacing={2}>
                    <Avatar style={{
                      backgroundColor: '#cce8fa',
                      color: '#1da1f2',
                      marginLeft: '-10px',
                      width: '60px',
                      height: '60px',
                      marginRight: '6rem'
                    }} >
                      <QueryBuilderOutlinedIcon />
                    </Avatar>
                  </Stack>
                  <br />
                  <h5 style={{ marginLeft: '-8px' }}>09.00</h5>
                  <span className='text-muted' style={{ marginLeft: '-30px' }}>Average In Time</span>
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem style={{ marginLeft: '20px', width: '10px', height: '8rem', marginTop: '11px' }} />
              <Grid style={{ marginTop: '20px', marginLeft: '10rem' }} >
                <div className='justify-content-center align-item-center'>
                  <Stack direction="row" spacing={2}>
                    <Avatar style={{
                      backgroundColor: '#b9f6ca',
                      color: '#10cb5c',
                      marginLeft: '-10px',
                      width: '60px',
                      height: '60px',
                      marginRight: '5rem'
                    }}>
                      <PauseCircleOutlineOutlinedIcon />
                    </Avatar>
                  </Stack>
                  <br />
                  <h5 style={{ marginLeft: '-8px' }}>06.00</h5>
                  <span className='text-muted' style={{ marginLeft: '-40px' }}>Average Out Time</span>
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem style={{ marginLeft: '20px', width: '10px', height: '8rem', marginTop: '11px' }} />
              <Grid style={{ marginTop: '20px', marginLeft: '10rem' }} >
                <div style={{ alignItems: 'center' }}>
                  <Stack direction="row" spacing={2}>
                    <Avatar style={{
                      backgroundColor: '#fff8e1',
                      color: '#f0ba05',
                      marginLeft: '-10px',
                      width: '60px',
                      height: '60px',
                    }}>
                      <HourglassEmptyOutlinedIcon />
                    </Avatar>
                  </Stack>
                  <br />
                  <h5 style={{ marginLeft: '-8px' }}>01.00</h5>
                  <span className='text-muted' style={{ marginLeft: '-40px' }} >Average Break Time</span>
                </div>
              </Grid>
            </Grid>
          </Box>
          <div style={{ marginTop: '40px', marginBottom: '10px', }}>
            {/* SNo, EmpCode, Date, Name, Shift, Intime, Outtime, Status, Action */}
            <MaterialReactTable  table={table} />;
          </div>
        </MainCard>
      </div>
    </div>
  );
};

export default Attendance;
