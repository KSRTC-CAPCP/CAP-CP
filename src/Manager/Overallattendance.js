
/*eslint-disable */

import 'react-calendar/dist/Calendar.css';
import './Overallattendance.css'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InputBase from "@mui/material/InputBase";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import YearlyAttendance from './YearlyAttendance';



const data = [
  {
    SNo: 1,
    EmpCode: 'CACE0012',
    Name: 'Sara',
    Date: '2023-12-25',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Present',
    workDur: '8 Hours',
    ot: '2 Hours',
    totalduration: '8 Hours',
    location: 'Ambattur',
    project: 'CAP-CP'


  },
  {
    SNo: 2,
    EmpCode: 'CACE0013',
    Name: 'Sara',
    Date: '2023-12-25',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Leave',
    workDur: '8 Hours',
    ot: '2 Hours',
    totalduration: '8 Hours',
    location: 'Ambattur',
    project: 'CAP-CP'

  },
  {
    SNo: 3,
    EmpCode: 'CACE0014',
    Name: 'Sara',
    Date: '2023-12-25',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Present',
    workDur: '8 Hours',
    ot: '2 Hours',
    totalduration: '8 Hours',
    location: 'Ambattur',
    project: 'CAP-CP'

  },
  {
    SNo: 4,
    EmpCode: 'CACE0015',
    Name: 'Sara',
    Date: '2023-12-25',
    Shift: 'General Shift',
    Intime: '9:00 AM',
    Outtime: '6:00 PM',
    Status: 'Leave',
    workDur: '8 Hours',
    ot: '2 Hours',
    totalduration: '8 Hours',
    location: 'Ambattur',
    project: 'CAP-CP'

  },
];




const Overallattendance = () => {


  const rowData = [
    {
      name: 'Zara',
      code: 'CACE0015',
      values: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'L', 'L', 'WK', 'WK', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'WK', 'WK', 'L', 'SH', 'SH', 'SH', 'FH', 'FH', 'FH'],
    },
    {
      name: 'Sam',
      code: 'CACE0016',
      values: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'L', 'L', 'WK', 'WK', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'WK', 'WK', 'L', 'SH', 'SH', 'SH', 'FH', 'FH', 'FH'],
    },
    {
      name: 'Jack',
      code: 'CACE0017',
      values: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'L', 'L', 'WK', 'WK', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'WK', 'WK', 'L', 'SH', 'SH', 'SH', 'FH', 'FH', 'FH'],
    },
    {
      name: 'Kotty',
      code: 'CACE0018',
      values: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'L', 'L', 'L', 'WK', 'WK', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'WK', 'WK', 'L', 'SH', 'SH', 'SH', 'FH', 'FH', 'FH'],
    },

  ];

  const getColorBasedOnContent = (content) => {
    switch (content) {
      case 'WK':
        return '#cce8fa';
      case 'P':
        return '#b9f6ca';
      case 'L':
        return '#ef9a9a';
      case 'HL':
        return '#d3ddee';
      case 'FH':
        return '#B39DDA';
      case 'SH':
        return '#fff8e1';
      default:
        return 'transparent';
    }
  };

  const rowsByColor = {
    '#1884c9': [],
    '#b9f6ca': [],
    '#ef9a9a': [],
    '#d3ddee': [],
    '#B39DDA': [],
    '#90caf9': [],
    transparent: [],
  };

  rowData.forEach((row) => {
    row.values.forEach((value) => {
      const colorInfo = getColorBasedOnContent(value);
      const colorKey = typeof colorInfo === 'object' ? colorInfo.background : colorInfo;
      if (!rowsByColor[colorKey]) {
        rowsByColor[colorKey] = [];
      }
      rowsByColor[colorKey].push(row);
    });
  });

  console.log(rowsByColor);
  console.log(rowsByColor);
  // Organizing rows by code
  const rowsByCode = {};

  rowData.forEach((row) => {
    const { code } = row;
    if (!rowsByCode[code]) {
      rowsByCode[code] = [];
    }
    rowsByCode[code].push(row);
  });

  console.log(rowsByColor);
  console.log(rowsByCode);

  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
  const [months, setMonths] = useState([]);
  const [dates, setDates] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const monthNames = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(0, index);
      return date.toLocaleString("default", { month: "short" });
    });
    setMonths(monthNames);
    setSelectedYear(currentYear);
  }, [currentYear]);

  useEffect(() => {
    generateDates(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const generateDates = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const datesArray = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);
      return {
        date: date.toLocaleDateString("default", { day: "numeric" }),
        day: date.toLocaleDateString("default", { weekday: "short" }),
      };
    });
    setDates(datesArray);
  };

  const handleArrowClick = (direction) => {
    let newMonth = selectedMonth;
    let newYear = selectedYear;

    if (direction === "previous") {
      if (selectedMonth === 0) {
        newMonth = 11;
        newYear -= 1;
      } else {
        newMonth -= 1;
      }
    } else {
      if (selectedMonth === 11) {
        newMonth = 0;
        newYear += 1;
      } else {
        newMonth += 1;
      }
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };





  const [Dept, setDept] = React.useState('');

  const handleChange = (event) => {
    setDept(event.target.value);
  };
  const [loc, setLoc] = React.useState('');

  const handleChanges = (event) => {
    setLoc(event.target.value);
  };



  const [view, setView] = useState('daily'); // State to track the current view



  const handleTabChange = (selectedView) => {
    setView(selectedView);

  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'SNo',
        header: 'S No',
        size: 100,
      },
      {
        accessorKey: 'EmpCode',
        header: 'Emp Code',
        size: 150,
      },
      {
        accessorKey: 'Name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'Date',
        header: 'Date',
        size: 150,
      },
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
        accessorKey: 'workDur',
        header: 'Work Duration',
        size: 150,
      },
      {
        accessorKey: 'ot',
        header: 'OT',
        size: 150,
      },
      {
        accessorKey: 'totalduration',
        header: 'Total Duration',
        size: 150,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 150,
      },
      {
        accessorKey: 'project',
        header: 'Project',
        size: 150,
      },
      {
        accessorKey: 'Status',
        header: 'Status',
        size: 300,
        Cell: ({ value, row }) =>
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

  const renderCalendarView = () => {
    switch (view) {
      case 'daily':
        return (
          <div>


            <div style={{ marginTop: '40px', marginBottom: '10px', }}>
              {/* SNo, EmpCode, Date, Name, Shift, Intime, Outtime, Status, Action */}
              <MaterialReactTable table={table} />;
            </div>

          </div>
        );
      case 'monthly':
        return (
          <div style={{ marginTop: '20px' }}>
            <TableContainer component={Paper} style={{ backgroundColor: '#eef0f1', borderColor: '#fff' }}>
              <Table aria-label="simple table">
                <TableHead >
                  <TableRow>
                    <TableCell style={{ padding: '25px' }} >Employee Code</TableCell>
                    <TableCell >Employee Name</TableCell>
                    {dates.map((dateInfo, index) => (
                      <TableCell key={index}>
                        <div style={{ color: '#6e7a8a' }}> {months[selectedMonth]} </div> <div style={{ color: 'black', fontSize: '13px' }}>{dateInfo.date}</div> <div style={{ color: '#6e7a8a', fontSize: '13px' }}> {dateInfo.day}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>


                <TableBody>
                  {rowData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell component="th" scope="row" >
                        {row.code}
                      </TableCell>
                      <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center', }}>
                        <Avatar style={{ width: '24px', height: '24px', marginRight: '8px', fontSize: '14px', backgroundColor: '#6495ED' }}>{row.name.charAt(0)}</Avatar>
                        <span style={{ fontSize: '13px' }}>{row.name}</span> <AccessAlarmTwoToneIcon style={{ fontSize: '19px', marginLeft: '30px', color: '#1da1f2' }} />
                        <Button style={{ backgroundColor: '#6e6a6a', color: '#364152', padding: '5px', fontSize: '13px', height: '20px', marginLeft: '5px' }}>10<span className='text-muted'>/22</span></Button>


                      </TableCell>
                      {row.values.map((value, columnIndex) => (
                        <TableCell
                          key={columnIndex}
                          align="right"
                          className='align-item-center'
                          style={{
                            backgroundColor: getColorBasedOnContent(value), border: ' 5px solid #fff',
                            color: value === 'L' ? '#c62828' : value === 'P' ? '#00c853' : value === 'WK' ? '#1da1f2' : value === 'HL' ? '#4267b2' : value === 'FH' ? '#590be3' : value === 'SH' ? '#ffc13f' : 'white',
                          }}
                        >
                          {value}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>


              </Table>
            </TableContainer>

          </div>
        );
      case 'yearly':
        return (
          <div>
          <YearlyAttendance/>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div >
      <div className='d-flex justify-content-between align-item-center'>
        <h5>Employees</h5>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "25ch",
            border: "1px solid #ccc",
            padding: "5px",
            borderRadius: "15px",
            marginRight: '35rem'
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <IconButton onClick={() => handleArrowClick("previous")}>
              <NavigateBeforeIcon />
            </IconButton>
            <div>{months[selectedMonth]}</div>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              variant="outlined"
              input={<InputBase sx={{ border: "none" }} />}
              sx={{ minWidth: "80px", border: "none" }}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <MenuItem key={index} value={currentYear + index - 2}>
                  &nbsp; {currentYear + index - 2}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => handleArrowClick("next")}>
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
        {/* <Box sx={{ marginTop: "10px" }}>
        {dates.map((dateInfo, index) => (
          <div key={index}>
            {dateInfo.date} - {dateInfo.day}
          </div>
        ))}
      </Box> */}

        <div  >


          <div className='butdiv d-flex'>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Department</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={Dept}
                  label="Department"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>IT</MenuItem>
                  <MenuItem value={20}>Finance</MenuItem>
                  <MenuItem value={30}>Tear down</MenuItem>
                </Select>

              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }} >
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={loc}
                  label="Location"
                  onChange={handleChanges}
                >
                  <MenuItem value={10}>Ambathur</MenuItem>
                  <MenuItem value={20}>Thiruvallur</MenuItem>
                  <MenuItem value={30}>Kerala</MenuItem>
                </Select>

              </FormControl>
            </Box>

            <ButtonGroup variant="outlined" aria-label="outlined primary button group" className='align-item-center'>
              <Button onClick={() => handleTabChange('daily')} style={{ color: '#5e35b1', borderColor: '#5e35b1', backgroundColor: '#d6cdea' }}>Daily</Button>
              <Button onClick={() => handleTabChange('monthly')} style={{ color: '#5e35b1', borderColor: '#5e35b1', backgroundColor: '#d6cdea' }}>Monthly</Button>
              <Button onClick={() => handleTabChange('yearly')} style={{ color: '#5e35b1', borderColor: '#5e35b1', backgroundColor: '#d6cdea' }}>Yearly</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div>
        {renderCalendarView()}
      </div>
    </div >
  )
}

export default Overallattendance
