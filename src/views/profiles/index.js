/*eslint-disable */
import {
     Avatar,
     Box,
     ButtonBase,
     Button,
     Tooltip,
     IconButton,
     MenuItem,
     Grid,
     TextField,
     FormControl,
     InputLabel,
     Select,
     Divider,
     Typography,
     TableContainer,
     Table,
     TableHead,
     TableRow,
     TableBody,
     TableCell,
     Paper,
     tableCellClasses,
     Dialog,
     DialogTitle,
     DialogContent,
     DialogContentText,
     DialogActions,
     Slide,
     Input,
     FormControlLabel,
     Checkbox,
     RadioGroup,
     Radio,
     FormLabel,
     LinearProgress
   } from '@mui/material';
   import React, { forwardRef } from 'react';
   import MainCard from 'ui-component/cards/MainCard';
   import { useTheme } from '@mui/material/styles';
   import { IconDownload, IconEdit, IconEye, IconHistoryToggle, IconPlus, IconTrash, IconUpload } from '@tabler/icons';
   import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
   import { mkConfig, generateCsv, download } from 'export-to-csv';
   import * as XLSX from 'xlsx';
   
   import {
     ConnectWithoutContact,
     Delete,
     DeleteRounded,
     Group,
     History,
     KeyboardBackspaceRounded,
     Label,
     ModeEditRounded,
     NotStarted,
     PersonAdd,
     TaskAlt,
     ThumbDown,
     ThumbDownAltSharp,
     ThumbUpSharp,
     VisibilityRounded
   } from '@mui/icons-material';
   import { useState } from 'react';
   import styled from '@emotion/styled';
   import {
     DatePicker,
     Timeline,
     TimelineConnector,
     TimelineContent,
     TimelineDot,
     TimelineItem,
     TimelineOppositeContent,
     TimelineSeparator
   } from '@mui/lab';
   import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
   import { DateRangePicker } from 'rsuite';
   
   const columnHelper = createMRTColumnHelper();
   const data = [
     {
      rfqNo: 111,
       startDate: '22-04-2022',
       endDate: '23-08-2023',
       projectTeamAllocation: 'Rose Team',
       PONO: 'yes',
       No: '1234',
       companyname:'abc'
     },
     {
      rfqNo: 222,
       startDate: '22-04-2022',
       endDate: '23-08-2023',
       projectTeamAllocation: 'Rose Team',
       PONO: 'yes',
       No: '1234',
       companyname:'abc'
     }
   ];
   const columns = [
     columnHelper.accessor('rfqNo', {
       header: 'RFQ No'
     }),
     columnHelper.accessor('startDate', {
       header: 'Start Date'
     }),
     columnHelper.accessor('endDate', {
       header: 'End Date'
     }),
     columnHelper.accessor('projectTeamAllocation', {
       header: 'Project Team Allocation'
     }),
     columnHelper.accessor('PONO', {
       header: 'PONO'
     }),
     columnHelper.accessor('No', {
       header: 'No'
     }),
     columnHelper.accessor('companyname', {
      header: 'Company Name'
    })
   ];
   const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
   const optionsForHistoryStatus = [' OnGoing', 'Customer Review', 'Internal Review', 'Complete', 'Hold'];
   const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];
   const optionsForproject = ['CAE0001', 'CAE0002', 'CAE0003'];
   const optionsForteamproject = ['IT Team', 'Finance Team', 'Teardown Team'];
   const optionsForlocation = ['Thiruvallur', 'Ambattur'];
   const coumnsForHistory = [
    {
      accessorKey: 'date',
      header: 'Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'description',
      header: 'Lead Description',
      enableEditing: true
    },
    {
      accessorKey: 'requeststatus',
      header: 'Request Status',
      editVariant: 'select',
      editSelectOptions: optionsForHistoryStatus,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    },
    {
      accessorKey: 'approvalstatus',
      header: 'Approval Status',
      editVariant: 'select',
      editSelectOptions: optionsForHistoryApproval,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    }
   ];

   const coumnsForproject = [
    {
      accessorKey: 'empcode',
      header: 'Employee Code',
      editVariant: 'select',
      editSelectOptions: optionsForproject,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    },
    {
      accessorKey: 'name',
      header: 'Name',
      enableEditing: true
    },
    {
      accessorKey: 'fromdate',
      header: 'From Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'todate',
      header: 'To Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'percentage',
      header: 'Percentage',
      enableEditing: true
    },
   
    {
      accessorKey: 'team',
      header: 'Team',
      editVariant: 'select',
      editSelectOptions: optionsForteamproject,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    },
    {
      accessorKey: 'location',
      header: 'Location',
      editVariant: 'select',
      editSelectOptions: optionsForlocation,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    },
    
   ];


   const coumnsForTask = [
    {
      accessorKey: 'title',
      header: 'Title'
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableEditing: true
    },
    {
      accessorKey: 'responsible',
      header: 'Responsible',
      enableEditing: true
    },
    {
      accessorKey: 'remarks',
      header: 'Remarks',
      enableEditing: true
    },
    {
      accessorKey: 'assigneddate',
      header: 'Assigned Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'targetdate',
      header: 'Target Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      editVariant: 'select',
      editSelectOptions: optionsForTaskStatus,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    }
   ];



   
   const csvConfig = mkConfig({
     fieldSeparator: ',',
     decimalSeparator: '.',
     useKeysAsHeaders: true
   });
   const dataForHistory = [
     {
      date: '12-09-2023',
      description: 'description',
      remarks: 'remarks',
      status: 'status',
      assigneddate:'2-04-2001',
      targetdate:'27-04-2001'
     },
     {
      date: '12-09-2023',
      description: 'description',
      remarks: 'remarks',
      status: 'status',
      assigneddate:'2-04-2001',
      targetdate:'27-04-2001'
     }
   ];



   const dataForproject = [
    {
      empcode: 'CAE0001',
      name: 'Ram',
      fromdate: '21-02-2001',
      todate: '21-05-2001',
      percentage:'50%',
      team:'IT Team',
      location:'Chennai',
     
    },
    {
      empcode: 'CAE0002',
      name: 'Anbu',
      fromdate: '21-02-2001',
      todate: '21-05-2001',
      percentage:'50%',
      team:'IT Team',
      location:'Chennai'
    }
  ];
   
   const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });
   
   
   const Projects = () => {
   
     const teamMembers = [
       { name: 'Ram', projects: 28 },
       { name: 'Arun', projects: 3 },
       { name: 'Anu', projects: 7 },
       { name: 'Latha', projects: 4 },
       { name: 'Junnu', projects: 6 },
     ];
   
     const [selectedDate, setSelectedDate] = useState('');
   
     const handleDateChange = (event) => {
       setSelectedDate(event.target.value);
     };
   
     const [selectedOption, setSelectedOption] = React.useState('no');
     const [textFieldText, setTextFieldText] = React.useState('PONO Number is Not Allocated');
   
     const handleOptionChange = (event) => {
       setSelectedOption(event.target.value);
       if (event.target.value === 'yes') {
         setTextFieldText('');
       } else {
         setTextFieldText('PONO Number is Not Allocated');
       }
     };
   
     const fileInputRef = React.createRef();
     const handleImportClick = () => {
       fileInputRef.current.click();
     };
   
     const handleFileUpload = async (event) => {
       const file = event.target.files[0];
       if (file) {
         const reader = new FileReader();
         reader.onload = async (e) => {
           const data = new Uint8Array(e.target.result);
           const workbook = XLSX.read(data, { type: 'array' });
           const sheetName = workbook.SheetNames[0];
           const sheet = workbook.Sheets[sheetName];
           const parsedData = XLSX.utils.sheet_to_json(sheet);
   
           await uploadToServer(parsedData);
         };
         reader.readAsArrayBuffer(file);
       }
     };
   
     const uploadToServer = async (data) => {
       try {
         const response = await fetch('http://localhost:3001/upload', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ data }),
         });
   
         
         console.log('Upload successful:', response);
       } catch (error) {
         console.error('Error uploading file:', error);
       }
     };
   
     const [inputValue, setInputValue] = useState('');
     const [options, setOptions] = useState([]);
     const [selectedValue, setSelectedValue] = useState('');
   
     const handleInputChange = (e) => {
       setInputValue(e.target.value);
     };
   
     const handleAddOption = () => {
       if (inputValue.trim() !== '') {
         setOptions([...options, inputValue]);
         setInputValue('');
       }
     };
   
     const handleSelectChange = (event) => {
       setSelectedValue(event.target.value);
     };
   
     const [view, setView] = useState({
       visible: false,
       mode: 'Initial' 
     });
     const [open, setOpen] = useState(false);
     const handleDelete = () => {
       setOpen(true);
       console.log('open', open);
     };
     const theme = useTheme();
     const handleExportData = () => {
       const csv = generateCsv(csvConfig)(data);
       download(csvConfig)(csv);
     };
     const handleEdit = () => {
       console.log('worked');
       setView({
         visible: true,
         mode: 'Edit'
       });
     };
     const handleView = () => {
       console.log('worked');
       setView({
         visible: true,
         mode: 'View'
       });
     };

    
   
     const table = useMaterialReactTable({
       columns,
       data,
       enableRowActions: true,
       positionActionsColumn: 'last',
       renderRowActions: ({ row }) => (
         <div style={{ display: 'flex' }}>
           <IconButton onClick={handleDelete}>
             <DeleteRounded style={{ color: '#2196f3' }} />
           </IconButton>
           <IconButton onClick={handleView}>
             <VisibilityRounded style={{ color: '#2196f3' }} />
           </IconButton>
           <IconButton onClick={handleEdit}>
             <ModeEditRounded style={{ color: '#2196f3' }} />
           </IconButton>
         </div>
       ),
       enableRowSelection: true,
       columnFilterDisplayMode: 'popover',
       paginationDisplayMode: 'pages',
       positionToolbarAlertBanner: 'bottom',
       renderTopToolbarCustomActions: () => (
         <>
           <div style={{ marginLeft: '0.5rem' }}>
             <input
               type="file"
               ref={fileInputRef}
               style={{ display: 'none' }}
               onChange={handleFileUpload}
               accept=".xls,.xlsx"
             />
             <Button variant="contained" style={{ marginRight: '1rem' }} color="primary" onClick={handleImportClick} startIcon={<IconUpload />}>
               Import
             </Button>
             <Button onClick={handleExportData} variant="contained" color="primary" startIcon={<IconDownload />}>
               Export
             </Button>
           </div>
         </>
       )
       
       
     });
     const editableForHistory = useMaterialReactTable({
       columns: coumnsForHistory,
       data: dataForHistory,
       createDisplayMode: 'row', 
       editDisplayMode: 'row', 
       enableEditing: true,
       positionActionsColumn: 'last',
       enableColumnFilters: false,
       enableFilters: false,
       enableDensityToggle: false,
       enablePagination: false,
       enableHiding: false,
       enableFullScreenToggle: false,
       getRowId: (row) => row.id,
       onCreatingRowCancel: () => console.log('err'),
      
       onEditingRowCancel: () => console.log('err'),
      
       renderRowActions: ({ row, table }) => (
         <Box sx={{ display: 'flex', gap: '1rem' }}>
           <Tooltip title="Edit">
             <IconButton onClick={() => table.setEditingRow(row)}>
               <ModeEditRounded style={{ color: '#2196f3' }} />
             </IconButton>
           </Tooltip>
           <Tooltip title="Delete">
             <IconButton color="error" onClick={() => console.log('del')}>
               <DeleteRounded style={{ color: '#2196f3' }} />
             </IconButton>
           </Tooltip>
         </Box>
       ),
       renderTopToolbarCustomActions: ({ table }) => (
         
         <div className="title-bar">
           <div className="custum-header">
             <p style={{ fontWeight: 'bold', fontSize: 'large' }}>History Creation</p>
             <ButtonBase sx={{ borderRadius: '12px' }}>
               <Avatar
                 variant="rounded"
                 sx={{
                   ...theme.typography.commonAvatar,
                   ...theme.typography.mediumAvatar,
                   transition: 'all .2s ease-in-out',
                   background: theme.palette.secondary.light,
                   color: theme.palette.secondary.dark,
                   '&[aria-controls="menu-list-grow"],&:hover': {
                     background: theme.palette.secondary.dark,
                     color: theme.palette.secondary.light
                   }
                 }}
                 onClick={() => {
                   table.setCreatingRow(true);
                 }}
                 color="inherit"
               >
                 <IconPlus />
               </Avatar>
             </ButtonBase>
           </div>
         </div>
       )
     });
     const editableForproject = useMaterialReactTable({
      columns: coumnsForproject,
      data: dataForproject,
      createDisplayMode: 'row', 
      editDisplayMode: 'row', 
      enableEditing: true,
      positionActionsColumn: 'last',
      enableColumnFilters: false,
      enableFilters: false,
      enableDensityToggle: false,
      enablePagination: false,
      enableHiding: false,
      enableFullScreenToggle: false,
      getRowId: (row) => row.id,
      onCreatingRowCancel: () => console.log('err'),
     
      onEditingRowCancel: () => console.log('err'),
     
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <ModeEditRounded style={{ color: '#2196f3' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => console.log('del')}>
              <DeleteRounded style={{ color: '#2196f3' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="add here">
            <IconButton color="error" onClick={() => console.log('add')}>
              <IconPlus style={{ color: '#2196f3' }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <div className="title-bar">
          <div className="custum-header">
            <p style={{ fontWeight: 'bold', fontSize: 'large' }}>Project Team Allocation</p>
            <ButtonBase sx={{ borderRadius: '12px' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  transition: 'all .2s ease-in-out',
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  '&[aria-controls="menu-list-grow"],&:hover': {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light
                  }
                }}
                onClick={() => {
                  table.setCreatingRow(true);
                }}
                color="inherit"
              >
                <IconPlus />
              </Avatar>
            </ButtonBase>
          </div>
        </div>
      )
    });
     const editableForTask = useMaterialReactTable({
       columns: coumnsForTask,
       data: dataForHistory,
       createDisplayMode: 'row', 
       editDisplayMode: 'row', 
       enableEditing: true,
       positionActionsColumn: 'last',
       enableColumnFilters: false,
       enableFilters: false,
       enableDensityToggle: false,
       enablePagination: false,
       enableHiding: false,
       enableFullScreenToggle: false,
       getRowId: (row) => row.id,
       onCreatingRowCancel: () => console.log('err'),
       
       onEditingRowCancel: () => console.log('err'),
      
       renderRowActions: ({ row, table }) => (
         <Box sx={{ display: 'flex', gap: '1rem' }}>
           <Tooltip title="Edit">
             <IconButton onClick={() => table.setEditingRow(row)}>
               <ModeEditRounded style={{ color: '#2196f3' }} />
             </IconButton>
           </Tooltip>
           <Tooltip title="Delete">
             <IconButton color="error" onClick={() => console.log('del')}>
               <DeleteRounded style={{ color: '#2196f3' }} />
             </IconButton>
           </Tooltip>
         </Box>
       ),
       renderTopToolbarCustomActions: ({ table }) => (
         <div className="title-bar">
           <div className="custum-header">
             <p style={{ fontWeight: 'bold', fontSize: 'large' }}>Task Creation</p>
             <ButtonBase sx={{ borderRadius: '12px' }}>
               <Avatar
                 variant="rounded"
                 sx={{
                   ...theme.typography.commonAvatar,
                   ...theme.typography.mediumAvatar,
                   transition: 'all .2s ease-in-out',
                   background: theme.palette.secondary.light,
                   color: theme.palette.secondary.dark,
                   '&[aria-controls="menu-list-grow"],&:hover': {
                     background: theme.palette.secondary.dark,
                     color: theme.palette.secondary.light
                   }
                 }}
                 onClick={() => {
                   table.setCreatingRow(true);
                 }}
                 color="inherit"
               >
                 <IconPlus />
               </Avatar>
             </ButtonBase>
           </div>
         </div>
       )
     });
     const StyledTableCell = styled(TableCell)(({ theme }) => ({
       [`&.${tableCellClasses.head}`]: {
         backgroundColor: '#e3f2fd',
         color: '#333'
       },
       [`&.${tableCellClasses.body}`]: {
         fontSize: 14
       }
     }));
   
     const StyledTableRow = styled(TableRow)(({ theme }) => ({
       '&:nth-of-type(even)': {
         backgroundColor: theme.palette.action.hover
       },
      
       '&:last-child td, &:last-child th': {
         border: 0
       }
     }));
   
     function createData(name, calories, fat, carbs) {
       return { name, calories, fat, carbs };
     }
   

     

     const rows = [
       createData('Frozen yoghurt', 159, 6.0, 24),
       createData('Ice cream sandwich', 237, 9.0, 3),
       createData('Eclair', 262, 16.0, 24),
       createData('Cupcake', 305, 3.7, 67),
       createData('Gingerbread', 356, 16.0, 49)
     ];
     const handleToggle = () => {
       setView({
         visible: true,
         mode: 'Add'
       });
     };
     const handleClose = () => {
       setView({
         visible: true,
         mode: 'Initial'
       });
     };
   
     return (
       <div className="max">
         {view.mode === 'Add' && (
           <MainCard
             title="Project Creation"
             secondary={
               <Box
                 sx={{
                   ml: 2,
                   // mr: 3,
                   [theme.breakpoints.down('md')]: {
                     mr: 2
                   }
                 }}
               >
                 <ButtonBase sx={{ borderRadius: '12px' }}>
                   <Avatar
                     variant="rounded"
                     sx={{
                       ...theme.typography.commonAvatar,
                       ...theme.typography.mediumAvatar,
                       transition: 'all .2s ease-in-out',
                       background: theme.palette.secondary.light,
                       color: theme.palette.secondary.dark,
                       '&[aria-controls="menu-list-grow"],&:hover': {
                         background: theme.palette.secondary.dark,
                         color: theme.palette.secondary.light
                       }
                     }}
                     aria-haspopup="true"
                     onClick={handleClose}
                     color="inherit"
                   >
                     <KeyboardBackspaceRounded stroke={2} size="1.3rem" />
                   </Avatar>
                 </ButtonBase>
               </Box>
             }
           >
             <Grid container>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="RFQ No" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Company Name" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <DateRangePicker
                   format="dd-MM-yyyy "
                   placeholder="Start Date - End Date"
                   showMeridian
                   defaultCalendarValue={[new Date('01-02-2001 '), new Date('01-05-2001 ')]}
                 />
               </Grid>
          
    
               <Grid xs={4} p={2}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Status</InputLabel>
                   <Select labelId="demo-simple-select-label" id="demo-simple-select" label="status">
                     <MenuItem value={'newlead'}>OnGoing</MenuItem>
                     <MenuItem value={'contactEstablish'}>Customer Review</MenuItem>
                     <MenuItem value={'technicleMeeting'}>Internal Review</MenuItem>
                     <MenuItem value={'requirementConfirm'}>Complete</MenuItem>
                     <MenuItem value={'hold'}>Hold</MenuItem>
                   </Select>
                 </FormControl>
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth variant="outlined" placeholder="Add Description Here" multiline rows={1} maxRows={4} />{' '}
               </Grid>
   
               <Grid item xs={4} p={2}>
                 <FormLabel id="demo-row-radio-buttons-group-label">PONO</FormLabel>
                 <RadioGroup
                   aria-label="yesno"
                   name="yesno"
                   value={selectedOption}
                   onChange={handleOptionChange}
                   row
                 >
                   <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                   <FormControlLabel value="no" control={<Radio />} label="No" />
                 </RadioGroup>
               </Grid>
               {selectedOption === 'yes' && ( 
                 <Grid item xs={4} p={2}>
                   <TextField
                     fullWidth
                     id="status-display"
                     label="Number"
                     variant="outlined"
                     value={textFieldText}
                     disabled={selectedOption === 'no'}
                     onChange={(e) => setTextFieldText(e.target.value)}
                   />
                 </Grid>
               )}
         <Box p={2} className="edit-table-container">

         <MaterialReactTable sx={{ boxShadow: 'rgba(0, 0, 0, 0.18) 1.95px 1.95px 2.7px' }} table={editableForproject} />

             </Box>

             </Grid>
             <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
               Save
             </Button>
           </MainCard>
         )}
         {view.mode === 'Initial' && (
           <MainCard
             title="Project"
             secondary={
               <Box
                 sx={{
                   ml: 2,
                   // mr: 3,
                   [theme.breakpoints.down('md')]: {
                     mr: 2
                   }
                 }}
               >
                 <ButtonBase sx={{ borderRadius: '12px' }}>
                   <Avatar
                     variant="rounded"
                     sx={{
                       ...theme.typography.commonAvatar,
                       ...theme.typography.mediumAvatar,
                       transition: 'all .2s ease-in-out',
                       background: theme.palette.secondary.light,
                       color: theme.palette.secondary.dark,
                       '&[aria-controls="menu-list-grow"],&:hover': {
                         background: theme.palette.secondary.dark,
                         color: theme.palette.secondary.light
                       }
                     }}
                     aria-haspopup="true"
                     onClick={handleToggle}
                     color="inherit"
                   >
                     <IconPlus stroke={2} size="1.3rem" />
                   </Avatar>
                 </ButtonBase>
               </Box>
             }
           >
             <MaterialReactTable table={table} />
           </MainCard>
         )}
         {view.mode === 'Edit' && (
           <MainCard
             title="Project Updations"
             secondary={
               <Box
                 sx={{
                   ml: 2,
                   // mr: 3,
                   [theme.breakpoints.down('md')]: {
                     mr: 2
                   }
                 }}
               >
                 <ButtonBase sx={{ borderRadius: '12px' }}>
                   <Avatar
                     variant="rounded"
                     sx={{
                       ...theme.typography.commonAvatar,
                       ...theme.typography.mediumAvatar,
                       transition: 'all .2s ease-in-out',
                       background: theme.palette.secondary.light,
                       color: theme.palette.secondary.dark,
                       '&[aria-controls="menu-list-grow"],&:hover': {
                         background: theme.palette.secondary.dark,
                         color: theme.palette.secondary.light
                       }
                     }}
                     aria-haspopup="true"
                     onClick={handleClose}
                     color="inherit"
                   >
                     <KeyboardBackspaceRounded stroke={2} size="1.3rem" />
                   </Avatar>
                 </ButtonBase>
               </Box>
             }
           >
             <Grid container>
               <Grid xs={4} p={2}>
                 <TextField fullWidth type="date" variant="outlined" name="dob" className="w-100" />
               </Grid>
               <Grid xs={4} p={2}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Source</InputLabel>
                   <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                     <MenuItem value={'website'}>Website</MenuItem>
                     <MenuItem value={'Expo'}>Expo</MenuItem>
                     <MenuItem value={'Reference'}>Reference</MenuItem>
                     <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                     <MenuItem value={'others'}>Others</MenuItem>
                   </Select>
                 </FormControl>
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Pilot" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Company Name" variant="outlined" />
               </Grid>{' '}
               <Grid xs={4} p={2}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Category</InputLabel>
                   <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     label="Category"
                     value={selectedValue}
                     onChange={handleSelectChange}
                   >
                     <MenuItem value="">
                       <em>None</em>
                     </MenuItem>
                     <MenuItem value={'website'}>Website</MenuItem>
                     <MenuItem value={'Expo'}>Expo</MenuItem>
                     <MenuItem value={'Reference'}>Reference</MenuItem>
                     <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                     <MenuItem value={'others'}>Others</MenuItem>
   
                   </Select>
   
                 </FormControl>
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Contact Name" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Department" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" />
               </Grid>
               <Grid xs={4} p={2}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Business Verticle</InputLabel>
                   <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                     <MenuItem value={'teardown'}>Tear Down</MenuItem>
                     <MenuItem value={'operations'}>Operations</MenuItem>
                     <MenuItem value={'concerns'}>Concerns</MenuItem>
                     <MenuItem value={'software'}>Software</MenuItem>
                     <MenuItem value={'hr'}>HR</MenuItem>
                     <MenuItem value={'finance'}>Finance</MenuItem>
                     <MenuItem value={'scanning'}>Scanning</MenuItem>
                     <MenuItem value={'Modeling'}>Modeling</MenuItem>
                     <MenuItem value={'drivingunit'}>Driving Unit</MenuItem>
                   </Select>
                 </FormControl>
               </Grid>
               
             </Grid>
             
             <Box p={2} className="edit-table-container">
               <MaterialReactTable table={editableForHistory} />
             </Box>
             <Box p={2} className="edit-table-container">
               <MaterialReactTable table={editableForTask} />
             </Box>
             <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
               Save
             </Button>
           </MainCard>
         )}
         {view.mode === 'View' && (
           <>
             <MainCard
               title="Note"
               secondary={
                 <Box
                   sx={{
                     ml: 2,
                    
                     [theme.breakpoints.down('md')]: {
                       mr: 2
                     }
                   }}
                 >
                   <ButtonBase sx={{ borderRadius: '12px' }}>
                     <Avatar
                       variant="rounded"
                       sx={{
                         ...theme.typography.commonAvatar,
                         ...theme.typography.mediumAvatar,
                         transition: 'all .2s ease-in-out',
                         background: theme.palette.secondary.light,
                         color: theme.palette.secondary.dark,
                         '&[aria-controls="menu-list-grow"],&:hover': {
                           background: theme.palette.secondary.dark,
                           color: theme.palette.secondary.light
                         }
                       }}
                       aria-haspopup="true"
                       onClick={handleClose}
                       color="inherit"
                     >
                       <KeyboardBackspaceRounded stroke={2} size="1.3rem" />
                     </Avatar>
                   </ButtonBase>
                 </Box>
               }
             >
               <Grid container m={3}>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Project Number</label>
                   <p>001</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Date</label>
                   <p>23-09-2022</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Source</label>
                   <p>Website</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Pilot</label>
                   <p>Lakshmi</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Company Name</label>
                   <p>AB & Co</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Category</label>
                   <p>Automobile</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Contact Name</label>
                   <p>Krishna</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Department</label>
                   <p>Testing</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Phone Number</label>
                   <p>9876543210</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Email</label>
                   <p>abcd@gmail.com</p>
                 </Grid>
                 <Grid xs={3} p={2}>
                   <label className="text-muted">Business Verticle</label>
                   <p>Modeling</p>
                 </Grid>
               </Grid>
               <Grid container p={3}>
                 <Grid xs={4} p={2}>
                   <div className="history-container">
                     <MainCard
                       title="History"
                       secondary={
                         <Box
                           sx={{
                             ml: 2,
                            
                             [theme.breakpoints.down('md')]: {
                               mr: 2
                             }
                           }}
                         >
                           <ButtonBase sx={{ borderRadius: '12px' }}>
                             <Avatar
                               variant="rounded"
                               sx={{
                                 ...theme.typography.commonAvatar,
                                 ...theme.typography.mediumAvatar,
                                 transition: 'all .2s ease-in-out',
                                 background: theme.palette.secondary.light,
                                 color: theme.palette.secondary.dark,
                                 '&[aria-controls="menu-list-grow"],&:hover': {
                                   background: theme.palette.secondary.dark,
                                   color: theme.palette.secondary.light
                                 }
                               }}
                               aria-haspopup="true"
                               color="inherit"
                             >
                               <History stroke={2} size="1.3rem" />
                             </Avatar>
                           </ButtonBase>
                         </Box>
                       }
                     >
                       <Timeline>
                         <TimelineItem>
                           <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                           <TimelineSeparator>
                             <Tooltip title="New Lead" placement="top" arrow>
                               <TimelineDot color="secondary">
                                 <PersonAdd />
                               </TimelineDot>
                             </Tooltip>
                             <TimelineConnector />
                           </TimelineSeparator>
                           <TimelineContent>
                             <Typography variant="h6" component="span" className="text-muted">
                               23-01-2021
                             </Typography>
                             <li> New Lead is arrived from mannaran company</li>
                           </TimelineContent>
                         </TimelineItem>
                         <TimelineItem>
                           <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                           <TimelineSeparator>
                             <TimelineConnector />
                             <Tooltip title="Contact Established" placement="top" arrow>
                               <TimelineDot color="secondary">
                                 <ConnectWithoutContact />
                               </TimelineDot>
                             </Tooltip>
                             <TimelineConnector />
                           </TimelineSeparator>
                           <TimelineContent>
                             <Typography variant="h6" component="span" className="text-muted">
                               25-01-20221
                             </Typography>
                             <Typography>Contact received</Typography>
                           </TimelineContent>
                         </TimelineItem>
                         <TimelineItem>
                           <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                           <TimelineSeparator>
                             <TimelineConnector />
                             <Tooltip title="Technicle Meeting" placement="top" arrow>
                               <TimelineDot color="secondary">
                                 <Group />
                               </TimelineDot>
                             </Tooltip>
                             <TimelineConnector />
                           </TimelineSeparator>
                           <TimelineContent>
                             <Typography variant="h6" component="span" className="text-muted">
                               25-01-2021
                             </Typography>
                             <Typography>technicle Meeting Arranged</Typography>
                           </TimelineContent>
                         </TimelineItem>
                         <TimelineItem>
                           <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                           <TimelineSeparator>
                             <TimelineConnector />
                             <Tooltip title="Hold" placement="top" arrow>
                               <TimelineDot color="secondary">
                                 <NotStarted />
                               </TimelineDot>
                             </Tooltip>
                             <TimelineConnector />
                           </TimelineSeparator>
                           <TimelineContent>
                             <Typography variant="h6" component="span" className="text-muted">
                               25-01-2021
                             </Typography>
                             <Typography>Because this is the life you love!</Typography>
                           </TimelineContent>
                         </TimelineItem>
                         <TimelineItem>
                           <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                           <TimelineSeparator>
                             <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                             <Tooltip title="Requirement Confirmed" placement="top" arrow>
                               <TimelineDot color="secondary">
                                 <ThumbUpSharp />
                               </TimelineDot>
                             </Tooltip>
                             <TimelineConnector />
                           </TimelineSeparator>
                           <TimelineContent>
                             <Typography variant="h6" component="span" className="text-muted">
                               26-01-2021
                             </Typography>
                             <Typography>Because this is the life you love!</Typography>
                           </TimelineContent>
                         </TimelineItem>
                         <TimelineItem>
                           <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                           <TimelineSeparator>
                             <TimelineConnector />
                             <Tooltip title="Reject" placement="top" arrow>
                               <TimelineDot color="secondary">
                                 <ThumbDown />
                               </TimelineDot>
                             </Tooltip>
                            
                           </TimelineSeparator>
                           <TimelineContent>
                             <Typography variant="h6" component="span" className="text-muted">
                               27-01-2021
                             </Typography>
                             <Typography>Because this is the life you love!</Typography>
                           </TimelineContent>
                         </TimelineItem>
                       </Timeline>
                     </MainCard>
                   </div>
                 </Grid>
                 <Grid xs={8} p={2}>
                   <div className="history-container">
                     <MainCard
                       title="Task"
                       secondary={
                         <Box
                           sx={{
                             ml: 2,
                             
                             [theme.breakpoints.down('md')]: {
                               mr: 2
                             }
                           }}
                         >
                           <ButtonBase sx={{ borderRadius: '12px' }}>
                             <Avatar
                               variant="rounded"
                               sx={{
                                 ...theme.typography.commonAvatar,
                                 ...theme.typography.mediumAvatar,
                                 transition: 'all .2s ease-in-out',
                                 background: theme.palette.secondary.light,
                                 color: theme.palette.secondary.dark,
                                 '&[aria-controls="menu-list-grow"],&:hover': {
                                   background: theme.palette.secondary.dark,
                                   color: theme.palette.secondary.light
                                 }
                               }}
                               aria-haspopup="true"
                               color="inherit"
                             >
                               <TaskAlt stroke={2} size="1.3rem" />
                             </Avatar>
                           </ButtonBase>
                         </Box>
                       }
                     ></MainCard>
                   </div>
                 </Grid>
               </Grid>
             </MainCard>
           </>
         )}
         <Dialog
           fullWidth
           open={open}
           TransitionComponent={Transition}
           keepMounted
        
         >
           <DialogTitle>
             <Typography variant="h3">Delete Lead</Typography>
           </DialogTitle>
           <Divider />
           <DialogContent>
             <DialogContentText id="alert-dialog-slide-description" className="d-flex justify-content-center align-item-center">
               <div className="bg-light rounded ">
                 <Delete style={{ fontSize: '32' }} />
               </div>
             </DialogContentText>
             <Typography variant="h4" className="muted" display="block" gutterBottom style={{ textAlign: 'center' }} mt={2}>
               Are you want to Delete ?
             </Typography>
           </DialogContent>
           <DialogActions className="d-flex justify-content-center mb-1">
             <Button variant="outlined" onClick={() => setOpen(false)}>
               Cancel
             </Button>
             <Button variant="contained">Delete</Button>
           </DialogActions>
         </Dialog>
       </div>
     );
   };
   export default Projects;
   
   
   