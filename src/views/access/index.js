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
import { useState, useEffect } from 'react';
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
import { DateRangePicker } from 'rsuite';
import { deleteData, fetchData, postData } from 'utils/apiUtils';
import { TEAM_CREATION, TEAM_DELETE, TEAM_GET_ALL } from 'api/apiEndPoint';

const columnHelper = createMRTColumnHelper();
const data = [
  {
    Access: 'Admin',
    Team: 'IT'
  },
  {
    Access: 'User',
    Team: 'HR'
  }
];
const columns = [
  columnHelper.accessor('Team', {
    header: 'Team'
  })
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true
});
// const dataForHistory = [
//   {
//       NameOfCandidate: 'Thara',
//       DateOfBirth: '27-04-2001',
//       Designation: 'Developer',
//       Team: 'Abc Team',
//       ContactNumber: '9876543293',
//       assigneddate: '2-04-2001',
//       targetdate: '27-04-2001'
//   },
//   {
//       NameOfCandidate: 'Thara',
//       DateOfBirth: '27-04-2001',
//       Designation: 'Developer',
//       Team: 'Abc Team',
//       ContactNumber: '9876543293',
//       assigneddate: '2-04-2001',
//       targetdate: '27-04-2001'

//   }
// ];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Access = () => {
  const [dob, setDOB] = useState('');
  const [teamName, setTeamName] = useState();
  const [localData, setLocalData] = useState();
  const [teamData, setTeamData] = useState([]);
  const handleDOBChange = (event) => {
    setDOB(event.target.value);
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
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const handleDelete = (e) => {
    setOpen(true);
    console.log('open', open);
    console.log('open', e.original._id);
    setDeleteId(e.original._id);
  };
  const confirmDelete = async () => {
    try {
      const apiEndPoint = TEAM_DELETE(deleteId);
      await deleteData(apiEndPoint, localData?.accessToken);
      fetchTeams();
      setOpen(false);
    } catch (error) {
      console.log(error, 'error');
    }
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
    // data,
    data: teamData,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex' }}>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteRounded style={{ color: '#2196f3' }} />
        </IconButton>
        {/* <IconButton onClick={handleView}>
                  <VisibilityRounded style={{ color: '#2196f3' }} />
              </IconButton> */}
        {/* <IconButton onClick={() => handleEdit(row)}>
          <ModeEditRounded style={{ color: '#2196f3' }} />
        </IconButton> */}
      </div>
    ),
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: () => (
      <>
        <div></div>
        {/* <div style={{ marginLeft: '0.5rem' }}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} accept=".xls,.xlsx" />
          <Button
            variant="contained"
            style={{ marginRight: '1rem' }}
            color="primary"
            onClick={handleImportClick}
            startIcon={<IconUpload />}
          >
            Import
          </Button>
          <Button onClick={handleExportData} variant="contained" color="primary" startIcon={<IconDownload />}>
            Export
          </Button>
        </div> */}
      </>
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

  const handleChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger the save button click
      handlePost();
    }
  };
  const fetchTeams = async () => {
    try {
      const data = await fetchData(TEAM_GET_ALL, localData?.accessToken);
      console.log(data, 'data');
      if (data) {
        setTeamData(data);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error in fetchTeams:', error);
    }
  };

  const handlePost = async () => {
    console.log('calling');
    try {
      await postData(TEAM_CREATION, { Team: teamName ? teamName : '' }, localData?.accessToken);
      fetchTeams(); // Wait for fetchTeams to complete before proceeding
      setView({
        visible: true,
        mode: 'Initial'
      });
    } catch (error) {
      console.error('Error in handlePost:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const localStore = localStorage.getItem('userData');
        setLocalData(JSON.parse(localStore));

        if (localStore) {
          const parsedData = JSON.parse(localStore);
          setLocalData(parsedData);

          const data = await fetchData(TEAM_GET_ALL, parsedData?.accessToken);
          console.log(data, 'data');
          setTeamData(data);

          await fetchTeams(); // Assuming fetchTeams is an asynchronous function
        }
      } catch (error) {
        console.error('Error in fetchDataAndUpdate:', error);
      }
    };
    fetchDataAndUpdate();
  }, []);

  console.log(teamName, 'teamName');
  return (
    <div className="max">
      {view.mode === 'Add' && (
        <MainCard
          title="Access Creation"
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
          <form>
            <Grid container>
              <Grid xs={4} p={2}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Team"
                  variant="outlined"
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                />
              </Grid>
              <Grid xs={4} p={2}>
                <Button variant="contained" style={{ margin: '2rem' }} onClick={handlePost}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      )}
      {view.mode === 'Initial' && (
        <MainCard
          title="Role&Access"
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
          title="Role Updations"
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
              <TextField fullWidth id="outlined-basic" label="Team" variant="outlined" onChange={handleChange} />
            </Grid>
          </Grid>
          <Button variant="contained" style={{ float: 'right', margin: '2rem' }} onClick={handlePost}>
            Save
          </Button>
        </MainCard>
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
          <Button variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Access;
