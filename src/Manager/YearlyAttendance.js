/*eslint-disable */
import { useMemo } from 'react';
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Card, Grid, Tooltip, Typography, styled } from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelIcon from '@mui/icons-material/Cancel';



const tooltipClasses = {
  tooltip: 'your-tooltip-class', // Replace with the actual tooltip class
};

// Define styled components for tooltips
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const longText = `
Present : 2 
Absent  : 3
HoliDay : 6
On Duty : 29
UnInformed Leave : 1
Comp Off : 3
Balance CompOff : 1
CL : 1
SL : 1
PL : 2
`;

const data = [
  {
    SNo: 1,
    name: 'Junnu',
    EmployeeCode: 'CACE015',
    location: 'Thiruvallur',
    Jan: 'Present',
    Feb: 'Absent',
    Mar: 'Present',
    April: 'Present',
    May: 'Absent',
    June: 'Absent',
    July: 'Present',
    Aug: 'Absent',
    Sep: 'Present',
    Oct: 'Present',
    Nov: 'Absent',
    Dec: 'Present',
  },
  {
    SNo: 2,
    name: 'Clara',
    EmployeeCode: 'CACE016',
    location: 'Thiruvallur',
    Jan: 'Present',
    Feb: 'Present',
    Mar: 'Present',
    April: 'Present',
    May: 'Present',
    June: 'Present',
    July: 'Present',
    Aug: 'Absent',
    Sep: 'Present',
    Oct: 'Present',
    Nov: 'Present',
    Dec: 'Present',
  },
  {
    SNo: 3,
    name: 'Baru',
    EmployeeCode: 'CACE017',
    location: 'Thiruvallur',
    Jan: 'Present',
    Feb: 'Present',
    Mar: 'Present',
    April: 'Present',
    May: 'Present',
    June: 'Present',
    July: 'Present',
    Aug: 'Present',
    Sep: 'Present',
    Oct: 'Present',
    Nov: 'Present',
    Dec: 'Present',
  },
];

const columnHelper = createMRTColumnHelper();

const renderIcon = (value) => {
  console.log(value, "value");
  if (value === 'Present') {
    return  <CustomWidthTooltip title={longText}><CheckCircleSharpIcon style={{ color: 'green' }} /></CustomWidthTooltip>; 
  } else if (value === 'Absent') {
    return <CustomWidthTooltip title={longText}><CancelIcon style={{ color: 'red' }} /></CustomWidthTooltip>; 
  }
  return null;
};





const YearlyAttendance = () => {

  

  const columns = useMemo(
    () => [

      columnHelper.accessor('SNo', {
        header: 'S No',
      }),

      columnHelper.accessor('name', {
        header: 'Name',
      }),

      columnHelper.accessor('EmployeeCode', {
        header: 'Employee Code',
      }),
      columnHelper.accessor('location', {
        header: 'Location',
      }),

      columnHelper.accessor('Jan', {
        header: 'Jan',

        Cell: ({ row }) => renderIcon(row.original.Jan),
      }),

      columnHelper.accessor('Feb', {
        header: 'Feb',

        Cell: ({ row }) => renderIcon(row.original.Feb),
      }),

      columnHelper.accessor('Mar', {
        header: 'Mar',

        Cell: ({ row }) => renderIcon(row.original.Mar),
      }),
      columnHelper.accessor('April', {
        header: 'April',

        Cell: ({ row }) => renderIcon(row.original.April),
      }),
      columnHelper.accessor('May', {
        header: 'May',

        Cell: ({ row }) => renderIcon(row.original.May),
      }),
      columnHelper.accessor('June', {
        header: 'June',

        Cell: ({ row }) => renderIcon(row.original.June),
      }),
      columnHelper.accessor('July', {
        header: 'July',

        Cell: ({ row }) => renderIcon(row.original.July),
      }),
      columnHelper.accessor('Aug', {
        header: 'Aug',

        Cell: ({ row }) => renderIcon(row.original.Aug),
      }),
      columnHelper.accessor('Sep', {
        header: 'Sep',

        Cell: ({ row }) => renderIcon(row.original.Sep),
      }),
      columnHelper.accessor('Oct', {
        header: 'Oct',

        Cell: ({ row }) => renderIcon(row.original.Oct),
      }),
      columnHelper.accessor('Nov', {
        header: 'Nov',

        Cell: ({ row }) => renderIcon(row.original.Nov),
      }),
      columnHelper.accessor('Dec', {
        header: 'Dec',

        Cell: ({ row }) => renderIcon(row.original.Dec),
      }),
    ],
    [],
  );

  // const columns = useMemo(
  //   () => [
  //     
  //     // {
  //     //   accessorKey: 'present',
  //     //   header: 'Present ',
  //     //  
  //     // },
  //     // {
  //     //   accessorKey: 'absent',
  //     //   header: 'Absent ',
  //     //  
  //     // },
  //     // {
  //     //   accessorKey: 'holyday',
  //     //   header: 'Holy Day ',
  //     //  
  //     // },
  //     // {
  //     //   accessorKey: 'onduty',
  //     //   header: 'On Duty ',
  //     //   size: 50,
  //     // },
  //     // {
  //     //   accessorKey: 'Uninformedleave',
  //     //   header: 'UnInformed Leave ',
  //     //   size: 50,
  //     // },
  //     // {
  //     //   accessorKey: 'compoff',
  //     //   header: 'Comp Off ',
  //     //   size: 50,
  //     // },
  //     // {
  //     //   accessorKey: 'balancecompoff',
  //     //   header: 'Balance Comp Off ',
  //     //   size: 50,
  //     // },
  //   ],
  //   [],
  // );


  const table = useMaterialReactTable({
    columns,
    data,
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
    <div className='d-flex ' >
      {/* <Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc', marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>January</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card> */}
{/* <Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc', marginLeft:'30px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>February</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>March</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>April</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>May</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>June</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>July</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>August</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>September</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>October</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>November</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card>
<Card sx={{ maxWidth: 300 }} style={{backgroundColor:'#f8fafc',  marginLeft:'10px'}}>
  <h5 style={{ marginLeft: '30px', marginTop: '10px' }}>December</h5>
  <Grid container spacing={2} sx={{ p: 2 }} >
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Present : 29{row.original.address}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }}  >
      <Typography>Absent : 3 {row.original.city}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Holiday : 6{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>On Duty : 29{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>UnInformed leave : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>Comp Off : 3{row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>Balance Comp Off : 1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>CL : 2 {row.original.country}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'left' }} >
      <Typography>SL :  1{row.original.state}</Typography>
    </Grid>
    <Grid xs={6} sx={{ textAlign: 'right' }} >
      <Typography>PL : 1{row.original.country}</Typography>
    </Grid>
  </Grid>
</Card> */}
</div> 

      </Box>
    ),
  });

   
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export default YearlyAttendance
