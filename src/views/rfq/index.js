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
     InputAdornment
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
     Timeline,
     TimelineConnector,
     TimelineContent,
     TimelineDot,
     TimelineItem,
     TimelineOppositeContent,
     TimelineSeparator
   } from '@mui/lab';
   
   const columnHelper = createMRTColumnHelper();
   const data = [
     {
      date: '02-04-2001',
      source: 'Berneice',
      pilot: 'Feil',
      companyname: 'Deckow, Leuschke and Jaskolski',
      category: 'Millcreek',
      contactname: 'Nepal',
      department: 'Nepal',
      phonenumber: 'Nepal',
      email: 'Nepal',
      businessverticle: 'Nepal',
      rfqdescription: 'Nepal',
      status: 'Nepal'
     },
     {
      date: '02-04-2001',
      source: 'Berneice',
      pilot: 'Feil',
      companyname: 'Deckow, Leuschke and Jaskolski',
      category: 'Millcreek',
      contactname: 'Nepal',
      department: 'Nepal',
      phonenumber: 'Nepal',
      email: 'Nepal',
      businessverticle: 'Nepal',
      rfqdescription: 'Nepal',
      status: 'Nepal'
     }
   ];
   const columns = [
    columnHelper.accessor('date', {
      header: 'Date'
    }),
    columnHelper.accessor('source', {
      header: 'Source'
    }),
    columnHelper.accessor('pilot', {
      header: 'Pilot'
    }),
    columnHelper.accessor('companyname', {
      header: 'Company Name'
    }),
    columnHelper.accessor('category', {
      header: 'Category'
    }),
    columnHelper.accessor('contactname', {
      header: 'Contact Name'
    }),
    columnHelper.accessor('department', {
      header: 'Department'
    }),
    columnHelper.accessor('phonenumber', {
      header: 'Phone Number'
    }),
    columnHelper.accessor('email', {
      header: 'Email'
    }),
    columnHelper.accessor('businessverticle', {
      header: 'Business Verticle'
    }),
    columnHelper.accessor('rfqdescription', {
      header: 'RFQ Description'
    }),
    columnHelper.accessor('status', {
      header: 'Status'
    })
   ];
   const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
   const optionsForHistoryStatus = [' New RFQ', 'Tech Meet Done', 'TCO Sumbited', 'Negotiation', 'Business Awarded', 'Lost'];
   const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];
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
      // id: '123',
      date: '12-09-2023',
      description: 'description',
      remarks: 'remarks',
      status: 'status',
      assigneddate:'2-04-2001',
      targetdate:'27-04-2001'
    },
    {
      // id: '123',
      date: '12-09-2023',
      description: 'description',
      remarks: 'remarks',
      status: 'status',
      assigneddate:'2-04-2001',
      targetdate:'27-04-2001'
    }
   ];
   
   const Transition = forwardRef(function Transition(props, ref) {
     return <Slide direction="up" ref={ref} {...props} />;
   });
   
   
   const BusinessRFQ = () => {
   
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
   
         // Handle response if needed
         console.log('Upload successful:', response);
       } catch (error) {
         console.error('Error uploading file:', error);
       }
     };
   


     const [showAdditionalSelect, setShowAdditionalSelect] = useState(false);
     const [selectedOption, setSelectedOption] = useState('');
   
     const handleSelectChanged = (event) => {
       setSelectedOption(event.target.value);
   
       // Check if 'RFQ From Lead' is selected, then show the additional Select
       if (event.target.value === 'rfqfromlead') {
         setShowAdditionalSelect(true);
       } else {
         setShowAdditionalSelect(false);
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
       mode: 'Initial' // 'add', 'edit', 'view'
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
       // renderRowActions: ({ row, table }) => (
       //   <Box sx={{ display: 'flex', gap: '1rem' }}>
       //     <Tooltip title="Edit">
       //       <IconButton onClick={() => table.setEditingRow(row)}>
       //         <IconEdit />
       //       </IconButton>
       //     </Tooltip>
       //     <Tooltip title="Delete">
       //       <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
       //         <IconEdit />
       //       </IconButton>
       //     </Tooltip>
       //   </Box>
       // )
     });
     const editableForHistory = useMaterialReactTable({
       columns: coumnsForHistory,
       data: dataForHistory,
       createDisplayMode: 'row', // ('modal', and 'custom' are also available)
       editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
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
       // onCreatingRowSave: handleCreateUser,
       onEditingRowCancel: () => console.log('err'),
       // onEditingRowSave: handleSaveUser,
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
         // <Button
         //   variant="contained"
         //   onClick={() => {
         //     table.setCreatingRow(true);
         //   }}
         // >
         //   Create History
         // </Button>
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
     const editableForTask = useMaterialReactTable({
       columns: coumnsForTask,
       data: dataForHistory,
       createDisplayMode: 'row', // ('modal', and 'custom' are also available)
       editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
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
       // onCreatingRowSave: handleCreateUser,
       onEditingRowCancel: () => console.log('err'),
       // onEditingRowSave: handleSaveUser,
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
         // <Button
         //   variant="contained"
         //   onClick={() => {
         //     table.setCreatingRow(true);
         //   }}
         // >
         //   Create History
         // </Button>
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
       // hide last border
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
             title="RFQ Creation"
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
             <Grid item xs={4} p={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">RFQ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={selectedOption}
            onChange={handleSelectChanged}
            style={{ backgroundColor: 'lightgray' }}
          >
            <MenuItem value={'rfqfromlead'}>RFQ From Lead</MenuItem>
            <MenuItem value={'createnewrfq'}>Create New RFQ</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {showAdditionalSelect && (
        <Grid item xs={4} p={2}>
          <FormControl fullWidth>
            {/* Additional Select */}
            <InputLabel id="additional-select-label">Select Lead</InputLabel>
            <Select
              labelId="additional-select-label"
              id="additional-select"
              label="Additional Option"
              style={{ backgroundColor: 'lightgray' }}
            >
              <MenuItem value={'option1'}>Option 1</MenuItem>
              <MenuItem value={'option2'}>Option 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}
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
               <Grid xs={4} p={2}>
                 <TextField fullWidth variant="outlined" placeholder="RFQ Description" multiline rows={1} maxRows={4} />{' '}
               </Grid>
               <Grid xs={4} p={2}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Status</InputLabel>
                   <Select labelId="demo-simple-select-label" id="demo-simple-select" label="status">
                     <MenuItem value={'newlead'}>New RFQ</MenuItem>
                     {/* <MenuItem value={'contactEstablish'}>Tech Meet Done</MenuItem>
                     <MenuItem value={'technicleMeeting'}>TCO Submited</MenuItem>
                     <MenuItem value={'requirementConfirm'}>Negotiation</MenuItem>
                     <MenuItem value={'hold'}>Business Awarded</MenuItem>
                     <MenuItem value={'reject'}>Lost</MenuItem> */}
                   </Select>
                 </FormControl>
               </Grid>
              
               {/* <Grid xs={4} p={2}>
                 <TextField fullWidth id="outlined-basic" label="TCO No" variant="outlined" />
               </Grid> */}
               {/* <Grid xs={4} p={2}>
                 <TextField
                   fullWidth
                  
                   id="outlined-basic"
                   label="Approx Project value"
                   variant="outlined"
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         ₹
                       </InputAdornment>
                     ),
                   }}
                 />
               </Grid> */}
             </Grid>
   
             <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
               Save
             </Button>
           </MainCard>
         )}
         {view.mode === 'Initial' && (
           <MainCard
             title="RFQ"
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
             title="RFQ Updations"
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
               {/* <Grid xs={4} p={2}>
                 <TextField fullWidth variant="outlined" placeholder="Lead Description" multiline rows={1} maxRows={4} />{' '}
               </Grid>
               <Grid xs={4} p={2}>
                 <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">Status</InputLabel>
                   <Select labelId="demo-simple-select-label" id="demo-simple-select" label="status">
                     <MenuItem value={'newlead'}>New Lead</MenuItem>
                     <MenuItem value={'contactEstablish'}>Contact Establish</MenuItem>
                     <MenuItem value={'technicleMeeting'}>Technicle Meeting</MenuItem>
                     <MenuItem value={'requirementConfirm'}>Requirement Confirm</MenuItem>
                     <MenuItem value={'hold'}>Hold</MenuItem>
                     <MenuItem value={'reject'}>Reject</MenuItem>
                   </Select>
                 </FormControl>
               </Grid> */}
             </Grid>
             {/* <Divider /> */}
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
                               {/* <TimelineConnector /> */}
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
         // onClose={handleClose}
         // aria-describedby="alert-dialog-slide-description"
         >
           <DialogTitle>
             <Typography variant="h3">Delete RFQ</Typography>
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
   export default BusinessRFQ;
   
   
   