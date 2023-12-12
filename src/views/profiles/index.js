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
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
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
import { DatePicker, DateRangePicker } from 'rsuite';
import { deleteData, fetchData, postData, updateData } from 'utils/apiUtils';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PROFILES_CREATE, PROFILES_DELETE, PROFILES_GET, PROFILES_GET_ID, PROFILES_UPDATE, TEAMS_GET } from 'api/apiEndPoint';
import { useEffect } from 'react';

const columnHelper = createMRTColumnHelper();

const validationSchema = Yup.object({
  NameOfCandidate: Yup.string().required('Name is required'),
  DateOfBirth: Yup.string().required('Date Of Birth is required'),
  Designation: Yup.string().required('Designation is required'),
  Team: Yup.string().required('Team is required'),
  ContactNumber: Yup.string().required('ContactNumber is required'),
  Role: Yup.string().required('Role is required')
});
const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
const optionsForHistoryStatus = ['Contact Establish'];
const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];
const coumnsForHistory = [
  {
    accessorKey: 'NameOfCandidate',
    header: 'Name Of Candidate'
  },
  {
    accessorKey: 'DateOfBirth',
    header: 'Date Of Borth',
    muiEditTextFieldProps: {
      type: 'date',
      required: true
    }
  },
  {
    accessorKey: 'Designation',
    header: 'Designation',
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
  },
  {
    accessorKey: 'Team',
    header: 'Team',
    enableEditing: true
  },
  {
    accessorKey: 'ContactNumber',
    header: 'Contact Number',
    enableEditing: true
  }
];
const coumnsForTask = [
  {
    accessorKey: 'NameOfCandidate',
    header: 'Name Of Candidate'
  },
  {
    accessorKey: 'DateOfBirth',
    header: 'Date Of Birth'
  },
  {
    accessorKey: 'Designation',
    header: 'Designation',
    enableEditing: true
  },
  {
    accessorKey: 'Team',
    header: 'Team',
    enableEditing: true
  },
  {
    accessorKey: 'ContactNumber',
    header: 'Contact Number',
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
  }
];
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true
});
const dataForHistory = [
  {
    NameOfCandidate: 'Thara',
    DateOfBirth: '27-04-2001',
    Designation: 'Developer',
    Team: 'Abc Team',
    ContactNumber: '9876543293',
    assigneddate: '2-04-2001',
    targetdate: '27-04-2001'
  },
  {
    NameOfCandidate: 'Thara',
    DateOfBirth: '27-04-2001',
    Designation: 'Developer',
    Team: 'Abc Team',
    ContactNumber: '9876543293',
    assigneddate: '2-04-2001',
    targetdate: '27-04-2001'
  }
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profiles = () => {
  const [dob, setDOB] = useState('');
  const [localData, setLocalData] = useState('');
  const [teamsData, setTeamsData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState('');
  const [viewId, setViewId] = useState('');
  const teamsOption = teamsData.map((data) => ({
    label: data.Team,
    value: data.Team
  }));
  console.log(teamsOption, 'teamsOption');
  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  };
  const data = [
    {
      NameOfCandidate: 'Thara',
      DateOfBirth: '27-04-2001',
      Designation: 'Developer',
      Team: 'Abc Team',
      ContactNumber: '9876543293'
    },
    {
      NameOfCandidate: 'Thara',
      DateOfBirth: '27-04-2001',
      Designation: 'Developer',
      Team: 'Abc Team',
      ContactNumber: '9876543293'
    }
  ];
  const columns = [
    {
      accessorKey: 'EmployeeCode',
      header: 'Employee Code',
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.EmployeeCode}</p>
        </Box>
      )
    },
    columnHelper.accessor('NameOfCandidate', {
      header: 'Name Of Candidate'
    }),

    columnHelper.accessor('DateOfBirth', {
      header: 'Date Of Birth'
    }),
    columnHelper.accessor('Designation', {
      header: 'Designation'
    }),
    columnHelper.accessor('Team', {
      header: 'Team'
    }),
    columnHelper.accessor('Role', {
      header: 'Role'
    }),
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.status ? 'Active' : 'Inactive'}</p>
        </Box>
      )
    },
    columnHelper.accessor('ContactNumber', {
      header: 'Contact Number'
    })
  ];
  const fileInputRef = React.createRef();
  const handleImportClick = () => {
    fileInputRef.current.click();
  };
  const [selectedOption, setSelectedOption] = React.useState('active');

  const handleOptionChange = (event) => {
    console.log(event.target.value, 'event');
    setSelectedOption(event.target.value);
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
  const handleDelete = (id) => {
    setOpen(true);
    setDeleteId(id.original._id);
    console.log('open', id.original._id);
  };
  const theme = useTheme();
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const handleEdit = async (id) => {
    console.log(id.original._id, 'worked');
    setEditId(id.original._id);
    const endpoint = PROFILES_GET_ID(id.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    console.log(getByIdData, 'ids');
    // Assuming getByIdData?.DateOfBirth is in a format that can be interpreted by Date constructor
    // If needed, adjust the format to match "YYYY-MM-DD"
    // const formattedDateOfBirth = new Date(getByIdData?.DateOfBirth).toISOString().split('T')[0];

    formik.setValues({
      NameOfCandidate: getByIdData?.NameOfCandidate,
      DateOfBirth: getByIdData?.DateOfBirth,
      Designation: getByIdData?.Designation,
      ContactNumber: getByIdData?.ContactNumber,
      Team: getByIdData?.Team,
      Role: getByIdData?.Role
    });
    setSelectedOption(getByIdData?.status ? 'active' : 'inActive');

    setView({
      visible: true,
      mode: 'Edit'
    });
  };
  const handleView = (id) => {
    setViewId(id.original._id);
    console.log(id.original._id, 'worked');
    setView({
      visible: true,
      mode: 'View'
    });
  };
  const confirmDelete = async () => {
    try {
      const apiEndPoint = PROFILES_DELETE(deleteId);
      await deleteData(apiEndPoint, localData?.accessToken);
      fetchAllData();
      setOpen(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const table = useMaterialReactTable({
    columns,
    data: employeeData,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex' }}>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteRounded style={{ color: '#2196f3' }} />
        </IconButton>
        <IconButton onClick={() => handleView(row)}>
          <VisibilityRounded style={{ color: '#2196f3' }} />
        </IconButton>
        <IconButton onClick={() => handleEdit(row)}>
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
    formik.resetForm();
  };
  const handleClose = () => {
    setView({
      visible: true,
      mode: 'Initial'
    });
  };

  const formik = useFormik({
    initialValues: {
      NameOfCandidate: '',
      DateOfBirth: '',
      Designation: '',
      Team: '',
      ContactNumber: '',
      Role: '',
      status: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(editId, 'worked id');
      try {
        if (editId) {
          // Convert the date format to dd-mm-yyyy
          const formattedDateOfBirth = new Date(values.DateOfBirth).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          const formattedDate = formattedDateOfBirth.replace(/\//g, '-');
          // Update the values with the formatted date
          const formattedValues = {
            ...values,
            DateOfBirth: formattedDate,
            status: selectedOption === 'active' ? true : false
          };

          console.log(formattedValues, 'worked');
          // Create leadDescription array from leadDescription field
          const endpoint = PROFILES_UPDATE(editId);
          await updateData(endpoint, formattedValues, localData?.accessToken);
          setView({
            visible: true,
            mode: 'Initial'
          });
          fetchAllData();
          formik.resetForm();
        } else {
          console.log('create logged');
          // Convert the date format to dd-mm-yyyy
          const formattedDateOfBirth = new Date(values.DateOfBirth).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          });
          const formattedDate = formattedDateOfBirth.replace(/\//g, '-');
          // Update the values with the formatted date
          const formattedValues = {
            ...values,
            DateOfBirth: formattedDate,
            status: selectedOption === 'active' ? true : false
          };

          console.log(formattedValues, 'worked');
          // Create leadDescription array from leadDescription field
          await postData(PROFILES_CREATE, formattedValues, localData?.accessToken);
          setView({
            visible: true,
            mode: 'Initial'
          });
          fetchAllData();
          formik.resetForm();
        }
      } catch (error) {
        console.error('API error:', error);
      }
    }
  });
  const fetchAllData = async () => {
    try {
      const fetchProfiles = await fetchData(PROFILES_GET, localData?.accessToken);
      // Set employee data in the state
      setEmployeeData(fetchProfiles?.data);
    } catch (error) {
      console.log('error :', error);
    }
  };
  useEffect(() => {
    // Define an async function to fetch data
    const fetchDataAsync = async () => {
      try {
        // Retrieve user data from local storage
        const localStore = localStorage.getItem('userData');
        const parsedData = JSON.parse(localStore);
        // If user data exists, proceed to fetch teams and profiles
        if (parsedData) {
          // Fetch teams data using the access token
          const fetchTeams = await fetchData(TEAMS_GET, parsedData?.accessToken);
          // Set local data and teams data in the state
          setLocalData(parsedData);
          setTeamsData(fetchTeams);
          // Fetch profiles data using the access token
          const fetchProfiles = await fetchData(PROFILES_GET, parsedData?.accessToken);
          // Set employee data in the state
          setEmployeeData(fetchProfiles?.data);
        }
      } catch (error) {
        // Handle errors during data fetching
        console.error('Error fetching data:', error);
      }
      fetchAllData();
    };
    // Call the async function to fetch data when the component mounts
    fetchDataAsync();
  }, []); // Empty dependency array to mimic componentDidMount behavior

  console.log(employeeData, 'fetchTeams');

  return (
    <div className="max">
      {view.mode === 'Add' && (
        <MainCard
          title="Profile Creation"
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.NameOfCandidate && formik.errors.NameOfCandidate)}
                  fullWidth
                  type="text"
                  variant="outlined"
                  name="NameOfCandidate"
                  label="Name of the Candidate"
                  className="w-100"
                  value={formik.values.NameOfCandidate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.NameOfCandidate && formik.errors.NameOfCandidate && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.NameOfCandidate}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.DateOfBirth && formik.errors.DateOfBirth)}
                  fullWidth
                  type="date"
                  variant="outlined"
                  name="DateOfBirth"
                  placeholder="Date"
                  className="w-100"
                  value={formik.values.DateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.DateOfBirth}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.Designation && formik.errors.Designation)}
                  fullWidth
                  type="text"
                  variant="outlined"
                  name="Designation"
                  label="Designation"
                  className="w-100"
                  value={formik.values.Designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Designation && formik.errors.Designation && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Designation}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.ContactNumber && formik.errors.ContactNumber)}
                  fullWidth
                  type="number"
                  variant="outlined"
                  name="ContactNumber"
                  label="Contact Number"
                  className="w-100"
                  value={formik.values.ContactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ContactNumber && formik.errors.ContactNumber && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.ContactNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.Team && formik.errors.Team)}>
                  <InputLabel id="demo-simple-select-label">Team</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="demo-simple-select"
                    label="Team"
                    name="Team"
                    value={formik.values.Team}
                  >
                    {teamsOption.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.Team && formik.errors.Team && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Team}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.Team && formik.errors.Team)}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={formik.values.Role}
                    id="demo-simple-select"
                    label="Role"
                    name="Role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'Manager'}>Manager</MenuItem>
                    <MenuItem value={'Employee'}>Employee</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.Role && formik.errors.Role && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Role}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={4} p={2}>
                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                <RadioGroup aria-label="yesno" name="status" value={selectedOption} onChange={handleOptionChange} row>
                  <FormControlLabel value="active" control={<Radio />} label="Active" />
                  <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button variant="contained" style={{ float: 'right', margin: '2rem' }} type="submit">
              Save
            </Button>
          </form>
        </MainCard>
      )}
      {view.mode === 'Initial' && (
        <MainCard
          title="Profiles"
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
          title="Profile Updations"
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.NameOfCandidate && formik.errors.NameOfCandidate)}
                  fullWidth
                  type="text"
                  variant="outlined"
                  name="NameOfCandidate"
                  label="Name of the Candidate"
                  className="w-100"
                  value={formik.values.NameOfCandidate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.NameOfCandidate && formik.errors.NameOfCandidate && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.NameOfCandidate}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.DateOfBirth && formik.errors.DateOfBirth)}
                  fullWidth
                  type="date"
                  variant="outlined"
                  name="DateOfBirth"
                  placeholder="Date"
                  className="w-100"
                  value={formik.values.DateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.DateOfBirth}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.Designation && formik.errors.Designation)}
                  fullWidth
                  type="text"
                  variant="outlined"
                  name="Designation"
                  label="Designation"
                  className="w-100"
                  value={formik.values.Designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Designation && formik.errors.Designation && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Designation}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.ContactNumber && formik.errors.ContactNumber)}
                  fullWidth
                  type="number"
                  variant="outlined"
                  name="ContactNumber"
                  label="Contact Number"
                  className="w-100"
                  value={formik.values.ContactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ContactNumber && formik.errors.ContactNumber && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.ContactNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.Team && formik.errors.Team)}>
                  <InputLabel id="demo-simple-select-label">Team</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="demo-simple-select"
                    label="Team"
                    name="Team"
                    value={formik.values.Team}
                  >
                    {teamsOption.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.Team && formik.errors.Team && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Team}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.Team && formik.errors.Team)}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={formik.values.Role}
                    id="demo-simple-select"
                    label="Role"
                    name="Role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'user'}>Employee</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.Role && formik.errors.Role && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Role}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={4} p={2}>
                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                <RadioGroup aria-label="yesno" name="status" value={selectedOption} onChange={handleOptionChange} row>
                  <FormControlLabel value="active" control={<Radio />} label="Active" />
                  <FormControlLabel value="inActive" control={<Radio />} label="In Active" />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button variant="contained" style={{ float: 'right', margin: '2rem' }} type="submit">
              Save
            </Button>
          </form>
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
                <label className="text-muted">Employee Code</label>
                <p>001</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Name Of Candidate</label>
                <p>Thara</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Date Of Birth</label>
                <p>27-09-2001</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Designation</label>
                <p>Developer</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Team</label>
                <p>ABC Team</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Contact Number</label>
                <p>9876543278</p>
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
export default Profiles;
