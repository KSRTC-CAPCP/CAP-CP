/*eslint-disable */
import TaskView from './task-panel';
import { TASKS } from './mockData';
import MainCard from 'ui-component/cards/MainCard';
import {
  Autocomplete,
  AvatarGroup,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Avatar from '@mui/material/Avatar';
import { DatePicker, Modal } from 'rsuite';
import { Box } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import SunEditor from 'suneditor-react';
import { useTheme } from '@mui/material/styles';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GroupIcon from '@mui/icons-material/Group';
import FlagIcon from '@mui/icons-material/Flag';
import { CloseTwoTone, FlagTwoTone, KeyboardBackspaceRounded, PlusOne, ViewAgendaTwoTone } from '@mui/icons-material';
import { IconPlus } from '@tabler/icons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PROFILES_GETBY_STATUS, TASKS_CREATE, TASKS_GET_ALL } from 'api/apiEndPoint';
import { fetchData, postData } from 'utils/apiUtils';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import ModalHeader from 'rsuite/esm/Modal/ModalHeader';
import { useFormik } from 'formik';

function createData(ReferenceID, Title, Description, Status, priority, RemainingDays, CreatedBy) {
  return { ReferenceID, Title, Description, Status, priority, RemainingDays, CreatedBy };
}

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
    leaddescription: 'Nepal',
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
    leaddescription: 'Nepal',
    status: 'Nepal'
  }
];
const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor('referenceId', {
    header: 'Ref. Id'
  }),
  columnHelper.accessor('title', {
    header: 'Title'
  }),
  columnHelper.accessor('description', {
    header: 'Description'
  }),
  columnHelper.accessor('responsible', {
    header: 'Responsible'
  }),
  columnHelper.accessor('startDate', {
    header: 'Start Date'
  }),
  columnHelper.accessor('endDate', {
    header: 'End Date'
  }),
  columnHelper.accessor('priority', {
    header: 'priority',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="status-task">
        <p>{row.original.priority}</p>
      </Box>
    )
  }),
  columnHelper.accessor('status', {
    header: 'status',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="status-task">
        <p>{row.original.status}</p>
      </Box>
    )
  }),
  columnHelper.accessor('createdBy', {
    header: 'Created By'
  })
];
const TaskPanel = () => {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();

  const buttonStyles = {
    color: hovered ? '#ede7f6' : '#5e35b1',
    backgroundColor: hovered ? '#5e35b1' : '#ede7f6',
    transition: 'color 0.3s, background-color 0.3s' // Smooth transition effect
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    // Handle search logic here
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'start',
    width: '50%',
    margin: '20px 0'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    // width: '200%',
    maxWidth: '400px',
    borderColor: '#bbb'
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allOptions = {
    buttonList: [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],

      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'table'],
      ['link', 'image', 'video'],
      ['fullScreen', 'showBlocks', 'codeView'],
      ['preview']
    ]
  };
  const [fileCount, setFileCount] = useState(0);
  const [profilesData, setProfilesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(); // Ref to file input
  const employeesOption = profilesData?.map((data) => ({
    label: data?.EmployeeCode + '-' + data?.NameOfCandidate,
    value: data?.EmployeeCode + '-' + data?.NameOfCandidate
  }));
  const UPLOAD_ENDPOINT = 'http://localhost/react-php-file-upload/backend/upload.php';
  console.log('employeesOption', employeesOption);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length > 0) {
      try {
        const responses = await Promise.all(files.map((file) => uploadFile(file)));
        console.log(responses.map((res) => res.data)); // Handle the responses from the server
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  const handleStartDateChange = (event) => {
    const inputDate = new Date(event);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    const [day, month, year] = formattedDate.split('/');
    const formattedStartDate = `${day}-${month}-${year}`;
    setStartDate(formattedStartDate);
    formik.setValues({
      ...formik.values,
      startDate: formattedStartDate
    });
  };
  const handleEndDateChange = (event) => {
    const inputDate = new Date(event);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    const [day, month, year] = formattedDate.split('/');
    const formattedStartDate = `${day}-${month}-${year}`;
    setEndDate(formattedStartDate);
    formik.setValues({
      ...formik.values,
      endDate: formattedStartDate
    });
  };
  const parseDate = (dateString) => {
    // Check if dateString is provided and is a non-empty string
    if (dateString && typeof dateString === 'string' && dateString.trim() !== '') {
      // Assuming dateString is in the format 'dd-MM-yyyy'
      const [day, month, year] = dateString.split('-');
      const parsedDate = new Date(`${year}-${month}-${day}`);
      return parsedDate;
    } else {
      // Return null or handle the case when dateString is not valid
      // return null;
    }
  };
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  };

  const handleOnChange = (e) => {
    const selectedFilesArray = Array.from(e.target.files);
    setSelectedFiles(selectedFilesArray);

    // Clear the input value to allow reselection of the same file
    fileInputRef.current.value = null;
  };

  const [view, setView] = useState({
    visible: false,
    mode: 'Initial'
  });

  const handleToggle = () => {
    setView({
      visible: true,
      mode: 'Add'
    });
  };
  const handleBoard = () => {
    setView({
      visible: true,
      mode: 'Initial'
    });
  };
  const [localData, setLocalData] = useState();
  const [tasksData, setTasksData] = useState([]);
  const [valueForSuggest, setValueForSuggest] = React.useState(null);
  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  const table = useMaterialReactTable({
    columns,
    data: tasksData
  });
  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const localStore = localStorage.getItem('userData');
        if (localStore) {
          setLocalData(JSON.parse(localStore));
        }
        if (localStore) {
          const parsedData = JSON.parse(localStore);
          const data = await fetchData(TASKS_GET_ALL, parsedData?.accessToken);
          setTasksData(data.data);
          const data4Employee = await fetchData(PROFILES_GETBY_STATUS('active'), parsedData?.accessToken);
          console.log(data, 'parsedddd');
          setProfilesData(data4Employee?.data);
        }
      } catch (error) {
        console.error('Error in fetchDataAndUpdate:', error);
      }
    };
    fetchDataAndUpdate();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      responsible: '',
      assignedBy: '',
      priority: '',
      startDate: '',
      endDate: '',
      status: '',
      createdBy: '',
      referenceId: '', // Lead/RFQ serial number or Project number
      createdAt: '',
      updatedBy: '',
      updatedAt: ''
    },
    // validationSchema,
    onSubmit: async (values) => {
      console.log('worked', values);
      try {
        const formattedData = {
          ...values,
          status: 'In Backlog',
          responsible: valueForSuggest?.label || values?.responsible
        };
        const taskCreation = await postData(TASKS_CREATE, formattedData, localData?.accessToken);
        console.log(taskCreation, 'projectAllocate');
        setView({
          visible: true,
          mode: 'Initial'
        });
      } catch {}
    }
  });
  console.log(formik.values, 'values here');
  return (
    <>
      <MainCard
        title={
          <div className="d-flex">
            <p>Task Panel</p>
            <AvatarGroup total={24} className="ms-01">
              <Avatar alt="R" src="/static/images/avatar/1.jpg" />
              <Avatar alt="T" src="/static/images/avatar/2.jpg" />
              <Avatar alt="A" src="/static/images/avatar/4.jpg" />
              <Avatar alt="T" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </div>
        }
        secondary={
          <div className="d-flex justify-content-center align-items-center">
            {/* <AccessTimeIcon sx={{ fontSize: '1.1rem' }} /> */}
            {/* <span className="text-muted" style={{ paddingLeft: '5px', paddingRight: '10px' }}>
              7 days remaining
            </span> */}

            <Box sx={{ ml: 2 }}>
              <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleOpen}>
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
                  <IconPlus />
                </Avatar>
              </ButtonBase>
            </Box>
            {view.mode === 'Add' ? (
              <Box sx={{ ml: 2 }}>
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
                    onClick={handleBoard}
                    color="inherit"
                  >
                    <ViewAgendaTwoTone style={{ rotate: '90deg' }} />
                  </Avatar>
                </ButtonBase>
              </Box>
            ) : (
              <Box sx={{ ml: 2 }}>
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
                    <ViewAgendaTwoTone />
                  </Avatar>
                </ButtonBase>
              </Box>
            )}
          </div>
        }
      >
        {view.mode === 'Add' && (
          <div>
            <MaterialReactTable table={table} />
          </div>
        )}
        {view.mode === 'Initial' && (
          <div className="task-panel-container">
            <TaskView tasks={tasksData} />
            <Dialog open={open} fullWidth maxWidth="lg">
              <form onSubmit={formik.handleSubmit}>
                <DialogTitle className="d-flex justify-content-between m-0">
                  <Typography variant="h3">Create Task</Typography>
                  <Typography variant="h4" onClick={handleClose}>
                    <CloseTwoTone />
                  </Typography>
                </DialogTitle>
                <DialogContent className="m-1">
                  <Grid container>
                    <Grid xs={4} p={2}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Ref.no"
                        name="referenceId"
                        variant="outlined"
                        value={formik.values.referenceId}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid xs={4} p={2}>
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Title"
                        name="title"
                        variant="outlined"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                      />
                    </Grid>
                    <Grid xs={4} p={2}>
                      <FormControl fullWidth error={Boolean(formik.touched.status && formik.errors.status)}>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="status"
                          fullWidth
                          name="priority"
                          value={formik.values.priority}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem value={'High'}>
                            <FlagTwoTone style={{ fontSize: '19px', color: '#c62828' }} /> - High
                          </MenuItem>
                          <MenuItem value="Medium">
                            <FlagTwoTone style={{ fontSize: '19px', color: '#faaf00' }} /> - Medium
                          </MenuItem>
                          <MenuItem value="Low">
                            <FlagTwoTone style={{ fontSize: '19px', color: '#00e676' }} /> - Low
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} p={2}>
                      <SunEditor setOptions={allOptions} setAllPlugins={true} getSunEditorInstance={getSunEditorInstance} />
                    </Grid>
                    <Grid xs={4} p={2}>
                      {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Responsible</InputLabel>
                        <Select
                          isSearchable={true}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Responsible"
                          name="Responsible"
                        >
                          {employeesOption.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                      <Autocomplete
                        fullWidth
                        disablePortal
                        id="combo-box-demo"
                        name="responsible"
                        options={employeesOption}
                        value={valueForSuggest}
                        onChange={(event, newValue) => {
                          if (typeof newValue === 'string') {
                            setValueForSuggest({
                              title: newValue
                            });
                          } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValueForSuggest({
                              title: newValue.inputValue
                            });
                          } else {
                            setValueForSuggest(newValue);
                          }
                        }}
                        renderInput={(params) => <TextField {...params} label="Responsible" />}
                      />
                    </Grid>
                    <Grid xs={4} p={2}>
                      <DatePicker
                        oneTap
                        placeholder="Assigned Date"
                        name="startDate"
                        aria-autocomplete="false"
                        className="form-control"
                        // onClean={() => setStartDate('')}
                        autoComplete="false"
                        value={parseDate(formik.values.startDate)}
                        onChange={(e) => handleStartDateChange(e)}
                        // onChange={(e) => handleStartDateChange(e)}
                        // value={parseDate(formik.values.assignedDate)}
                      />
                    </Grid>
                    <Grid xs={4} p={2}>
                      <DatePicker
                        oneTap
                        placeholder="Target Date"
                        name="endDate"
                        aria-autocomplete="false"
                        className="form-control"
                        // value={formik.values.endDate}
                        value={parseDate(formik.values.endDate)}
                        onChange={(e) => handleEndDateChange(e)}
                        // onChange={(e) => handleStartDateChange(e)}
                        // value={parseDate(formik.values.assignedDate)}
                      />{' '}
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions className="d-flex justify-content-center">
                  <Button variant="contained" type="submit">
                    Assign
                  </Button>
                </DialogActions>{' '}
              </form>
            </Dialog>
          </div>
        )}
      </MainCard>
    </>
  );
};

export default TaskPanel;
