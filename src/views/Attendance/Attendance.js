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
  Input
} from '@mui/material';
import './Attendance.css';
import React, { forwardRef, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import {
  IconDots,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconEye,
  IconHistoryToggle,
  IconPlus,
  IconTrash,
  IconUpload
} from '@tabler/icons';
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
import theme from 'themes';
import { useRef } from 'react';
import TaskPanel from 'views/task';

const ViewModal = ({ rowData, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>View Details</DialogTitle>
      <DialogContent>
        {/* Display the details of the selected row */}
        <Typography>Name: {rowData.name}</Typography>
        <Typography>Employee Code: {rowData.employeecode}</Typography>
        {/* Add other details here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const columnHelper = createMRTColumnHelper();
const data = [
  {
    name: 'Darla',
    employeecode: 'EMP001',
    jobtitle: 'Testing',
    status: ''
  },
  {
    name: 'Zara',
    employeecode: 'EMP001',
    jobtitle: 'Testing',
    status: ''
  },
  {
    name: 'Bharathi',
    employeecode: 'EMP001',
    jobtitle: 'Testing',
    status: ''
  }
];

// const [openModal, setOpenModal] = useState(false);

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Attendance = () => {
  const [viewData, setViewData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleView = (id) => {
    setOpen(true);
    setViewData(id?.original);
    console.log(id, 'viewData');
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {row && row.original && (
            <Avatar alt="Profile" style={{ marginRight: '8px' }}>
              {row.original.name.charAt(0)}
            </Avatar>
          )}
          {row && row.original && row.original.name}
        </div>
      )
    }),
    columnHelper.accessor('employeecode', {
      header: 'Employee Code'
    }),
    columnHelper.accessor('jobtitle', {
      header: 'Job Title'
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      Cell: ({ row }) => (
        <div>
          <Button
            onClick={() => handleView(row)}
            sx={{
              backgroundColor: '#ede7f6',
              color: '#5e35b1',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#5e35b1',
                color: '#ede7f6'
              }
            }}
          >
            View
          </Button>
        </div>
      )
    })
  ];

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });

      // Handle response if needed
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
    mode: 'Initial' // 'add', 'edit', 'view'
  });

  const theme = useTheme();
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    // enableRowActions: true,
    // positionActionsColumn: 'last',
    // renderRowActions: ({ row }) => (
    //     <div style={{ display: 'flex' }}>
    //         <IconButton onClick={handleDelete}>
    //             <DeleteRounded style={{ color: '#2196f3' }} />
    //         </IconButton>
    //         {/* <IconButton onClick={handleView}>
    //           <VisibilityRounded style={{ color: '#2196f3' }} />
    //       </IconButton> */}
    //         <IconButton onClick={handleEdit}>
    //             <ModeEditRounded style={{ color: '#2196f3' }} />
    //         </IconButton>
    //     </div>
    // ),
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: () => (
      <>
        <div style={{ marginLeft: '0.5rem' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} accept=".xls,.xlsx" />
          {/* <Button variant="contained" style={{ marginRight: '1rem' }} color="primary" onClick={handleImportClick} startIcon={<IconUpload />}>
                        Import
                    </Button> */}
          <Button onClick={handleExportData} variant="contained" color="primary" startIcon={<IconDownload />}>
            Export
          </Button>
        </div>
      </>
    )
  });

  const handleApprove = () => {
    alert('Approved successfully!');
    setOpen(false);
  };

  return (
    <div className="max">
      {view.mode === 'Initial' && (
        // <MainCard
        //   title="Attendance Approval"
        //   secondary={
        //     <Box
        //       sx={{
        //         ml: 2,
        //         // mr: 3,
        //         [theme.breakpoints.down('md')]: {
        //           mr: 2
        //         }
        //       }}
        //     ></Box>
        //   }
        // >
          <MaterialReactTable table={table} />
        // </MainCard>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        // onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <section class="section-style m-1">
            <div class="main-container d-flex align-items-center w-100 m-0">
              <div className="left-container border-left w-40">
                <div class="image-container mt-2">
                  <Avatar sx={{ bgcolor: '#90caf9', width: '100px', height: '100px', fontSize: '36px' }}>B</Avatar>
                  {/* <img src="https://i.postimg.cc/bryMmCQB/profile-image.jpg" alt="Profile Image" /> */}
                </div>
                <div class="level mt-1">
                  <p style={{ padding: '5px 10px' }}>#CAE001</p>
                </div>
                <p class="name text-center">Darla Joes</p>
                <p class="job_title text-center">Developer</p>
              </div>
              <div class="details right-container w-60 mt-1 mb-1 ms-1">
                <Grid container>
                  <Grid xs={5} className="text-muted mt-1">
                    Location
                  </Grid>
                  <Grid xs={2} className='mt-1'>:</Grid>
                  <Grid xs={5} className='mt-1'>Ambattur</Grid>
                  <Grid xs={5} className="text-muted mt-1">
                    Project
                  </Grid>
                  <Grid xs={2} className='mt-1'>:</Grid>
                  <Grid xs={5} className='mt-1'>CAP-CP</Grid>
                  <Grid xs={5} className="text-muted mt-1">
                    Date
                  </Grid>
                  <Grid xs={2} className='mt-1'>:</Grid>
                  <Grid xs={5} className='mt-1'>12-12-2023</Grid>
                  <Grid xs={5} className="text-muted mt-1">
                    In-Time
                  </Grid>
                  <Grid xs={2} className='mt-1'>:</Grid>
                  <Grid xs={5} className='mt-1'>09:00 AM</Grid>
                  <Grid xs={5} className="text-muted mt-1">
                    Out-Time
                  </Grid>
                  <Grid xs={2} className='mt-1'>:</Grid>
                  <Grid xs={5} className='mt-1'>06:00 PM</Grid>
                </Grid>
                <hr />
                <div class="button-popup">
                  <div>
                    <Button className="custom-red" onClick={handleClose}>
                      Declined
                    </Button>
                  </div>
                  <div>
                    <Button className="custom-green" onClick={handleApprove}>
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Attendance;
