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
  LinearProgress,
  FormHelperText,
  Card
} from '@mui/material';
import React, { forwardRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { IconDownload, IconEdit, IconEye, IconHistoryToggle, IconPlus, IconTrash, IconUpload } from '@tabler/icons';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import * as XLSX from 'xlsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
  PeopleAltTwoTone,
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from 'rsuite';
import {
  MILESTONE_CREATE,
  MILESTONE_GET,
  PROFILES_CREATE,
  PROFILES_GET,
  PROFILES_GET_ROLE,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_UPDATE,
  RFQ_GET,
  RFQ_GET_ID
} from 'api/apiEndPoint';
import { useEffect } from 'react';
import { deleteData, fetchData, postData, updateData } from 'utils/apiUtils';

const columnHelper = createMRTColumnHelper();
const data = [
  {
    rfqNo: 111,
    startDate: '22-04-2022',
    endDate: '23-08-2023',
    projectTeamAllocation: 'Rose Team',
    PONO: 'yes',
    No: '1234',

    companyname: 'abc'
  },
  {
    rfqNo: 222,
    startDate: '22-04-2022',
    endDate: '23-08-2023',
    projectTeamAllocation: 'Rose Team',
    PONO: 'yes',
    No: '1234',

    companyname: 'abc'
  }
];
const columns = [
  columnHelper.accessor('rfqNumber', {
    header: 'RFQ No'
  }),
  columnHelper.accessor('projectNumber', {
    header: 'Project No'
  }),
  columnHelper.accessor('assignedDate', {
    header: 'Start Date',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        <p>{row.original.assignedDate?.slice(0, 10)}</p>
      </Box>
    )
  }),
  columnHelper.accessor('targetDate', {
    header: 'End Date',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        <p>{row.original.targetDate?.slice(0, 10)}</p>
      </Box>
    )
  }),
  // columnHelper.accessor('status', {
  //   header: 'Status'
  // }),
  columnHelper.accessor('manager', {
    header: 'Manager'
  }),
  columnHelper.accessor('milestone', {
    header: 'MileStone'
  }),
  columnHelper.accessor('companyName', {
    header: 'Company Name'
  })
];
const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
const optionsForHistoryStatus = [' OnGoing', 'Customer Review', 'Internal Review', 'Complete', 'Hold'];
const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];
const optionsForteamproject = ['IT Team', 'Finance Team', 'Teardown Team'];
const optionsForFinance = ['Credit', 'Invoice', 'Spent'];
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
    assigneddate: '2-04-2001',
    targetdate: '27-04-2001'
  },
  {
    date: '12-09-2023',
    description: 'description',
    remarks: 'remarks',
    status: 'status',
    assigneddate: '2-04-2001',
    targetdate: '27-04-2001'
  }
];

const dataForproject = [
  {
    empcode: 'CAE0001',
    name: 'Ram',
    fromdate: '21-02-2001',
    todate: '21-05-2001',
    percentage: '50%',
    team: 'IT Team',
    location: 'Chennai'
  },
  {
    empcode: 'CAE0002',
    name: 'Anbu',
    fromdate: '21-02-2001',
    todate: '21-05-2001',
    percentage: '50%',
    team: 'IT Team',
    location: 'Chennai'
  }
];
const validationSchema = Yup.object({
  rfqNumber: Yup.string().required('RFQ Number is required'),
  companyName: Yup.string().required('Company Name is required'),
  assignedDate: Yup.string().required('Assigned Date is required'),
  status: Yup.string().required('Status is required'),
  description: Yup.string().required('Description is required')
  // Add validation for other fields as needed
});
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Projects = ({ _history, tasks }) => {
  const navigateToTaskpage = () => {
    window.location.href = '/task-panel';
  };
  const [profilesData, setProfilesData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [managerId, setManagerId] = useState('');
  const handleEmployee = (e) => {
    console.log(e.target.value.slice(0, 7), 'its worked');
    const value = e.target.value;
    const filterEmployee = profilesData.filter((employee) => employee?.EmployeeCode === value.slice(0, 7));
    console.log(filterEmployee[0], 'filterEmployee');
    setManagerId(filterEmployee[0]);
  };
  const coumnsForproject = [
    {
      accessorKey: 'employeeCode',
      header: 'Employee Code',
      editVariant: 'select',
      editSelectOptions: profilesData.map((item) => item.EmployeeCode + '-' + item.NameOfCandidate),
      muiEditTextFieldProps: {
        select: true,
        onChange: (e) => handleEmployee(e)
      },
      enableEditing: true
    },
    {
      accessorKey: 'fromDate',
      header: 'From Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'toDate',
      header: 'To Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'percentage',
      header: 'Percentage',
      muiEditTextFieldProps: {
        type: 'number',
        required: true
      },
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
    }
  ];

  const coumnsForFinance = [
    {
      accessorKey: 'date',
      header: 'Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'refNumber',
      header: 'Ref No/Bill',
      muiEditTextFieldProps: {
        type: 'number',
        required: true
      },
      enableEditing: true
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      muiEditTextFieldProps: {
        type: 'number',
        required: true
      },
      enableEditing: true
    },
    {
      accessorKey: 'tax',
      header: 'Tax',
      muiEditTextFieldProps: {
        type: 'number',
        required: true
      },
      enableEditing: true
    },

    {
      accessorKey: 'status',
      header: 'Status',
      editVariant: 'select',
      editSelectOptions: optionsForFinance,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    }
  ];

  const teamMembers = [
    { name: 'Ram', projects: 28 },
    { name: 'Arun', projects: 3 },
    { name: 'Anu', projects: 7 },
    { name: 'Latha', projects: 4 },
    { name: 'Junnu', projects: 6 }
  ];

  const [selectedDate, setSelectedDate] = useState('');
  const parseDate = (dateString) => {
    // Assuming dateString is in the format 'dd-MM-yyyy'
    const [day, month, year] = dateString.split('-');
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return parsedDate;
  };
  const handleEndDateChange = (event) => {
    const inputDate = new Date(event);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    const [day, month, year] = formattedDate.split('/');
    const formattedStartDate = `${day}-${month}-${year}`;
    setEndDate(formattedStartDate);
  };
  const handleStartDateChange = (event) => {
    const inputDate = new Date(event);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    const [day, month, year] = formattedDate.split('/');
    const formattedStartDate = `${day}-${month}-${year}`;
    setStartDate(formattedStartDate);
  };

  const [selectedOption, setSelectedOption] = React.useState('no');

  const [mileselectedOption, setMileSelectedOption] = React.useState('');
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });

      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [milestone, setMilestone] = useState([]);
  const [showSelects, setShowSelects] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [customOptiones, setCustomOptions] = useState('');
  const [descriptionValues, setDescriptionValues] = useState({}); // State to store descriptions for options

  const customOptions1 = [
    { value: 'MileStone1', label: 'MileStone 1' },
    { value: 'MileStone2', label: 'MileStone 2' },
    { value: 'MileStone3', label: 'MileStone 3' }
    // Add other options as needed
  ];

  const [view, setView] = useState({
    visible: false,
    mode: 'Initial' // 'add', 'edit', 'view'
  });

  const handleSelectOnChanged = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleSelectInputChanged = (event) => {
    setCustomOptions(event.target.value);
  };

  const handleDescriptionChange = (optionValue, description) => {
    setDescriptionValues({ ...descriptionValues, [optionValue]: description });
  };

  const handleSaveCustomOptions = () => {
    // Logic for saving custom options and descriptions
  };
  const [historyTableColumns, setHistoryTableColumns] = useState(coumnsForHistory);
  const [historyTableData, setHistoryTableData] = useState([]);
  const [taskTableData, setTaskTableData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [localData, setLocalData] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [rfqData, setRFQData] = useState([]);
  const [selectedRFQ, setSelectedRFQ] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    if (inputValue.trim() !== '') {
      setOptions([...options, inputValue]);
      setInputValue('');
    }
  };

  const handleSaveRowHistorys = (newData, oldData) => {
    console.log('handleSaveRowHistory - newData:', newData);
    console.log('handleSaveRowHistory - oldData:', oldData);
    const updatedData = historyTableData.map((row) => {
      if (
        row._id === oldData._id || // For existing rows
        (row && !row._id && oldData && oldData._tempId && row._tempId === oldData._tempId) // For new rows
      ) {
        return { ...row, ...newData };
      } else {
        return row;
      }
    });
    console.log('handleSaveRowHistory - updatedData:', updatedData);
    setHistoryTableData(updatedData);
    setEditingRowId(null);
  };
  console.log(historyTableData, 'history');
  const handleCancelEditHistory = () => {
    setEditingRowId(null);
  };
  const handleCreateRowHistory = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setHistoryTableData([...historyTableData, newTask]);
    setIsCreatingRow(false);
  };
  const handleEditRowHistorye = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleCancelCreateHistory = () => {
    setIsCreatingRow(false);
  };
  const handleDeleteRowHistorye = (row) => {
    const updatedData = historyTableData.filter((item) => item._id !== row.id);
    setHistoryTableData(updatedData);
  };
  const editableForHistory = useMaterialReactTable({
    columns: historyTableColumns,
    data: historyTableData,
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
    getRowId: (row) => row._id,
    onEditingRowSave: ({ row, values, exitEditingMode }) => {
      handleSaveRowHistorys(values, row.original); // Pass the original row data to handleSaveRowHistory
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditHistory,
    onCreatingRowSave: handleCreateRowHistory,
    onCreatingRowCancel: handleCancelCreateHistory,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowHistorye(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowHistorye(row)}>
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

  const handleSaveRowTask = (newData, oldData) => {
    console.log('handleSaveRowtask - newData:', newData);
    console.log('handleSaveRowtask - oldData:', oldData);
    const updatedData = taskTableData.map((row) => {
      if (
        row._id === oldData._id || // For existing rows
        (row && !row._id && oldData && oldData._tempId && row._tempId === oldData._tempId) // For new rows
      ) {
        return { ...row, ...newData };
      } else {
        return row;
      }
    });
    console.log('handleSaveRowHistory - updatedData:', updatedData);
    setTaskTableData(updatedData);
    setEditingRowId(null);
  };

  const handleCancelEditTask = () => {
    setEditingRowId(null);
  };

  const handleCreateRowTask = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setTaskTableData([...taskTableData, newTask]);
    setIsCreatingRow(false);
  };
  const handleEditRowTask = (row) => {
    const editingId = row._id; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleCancelCreateTask = () => {
    setIsCreatingRow(false);
  };
  const handleDeleteRowTask = (row) => {
    const updatedData = taskTableData.filter((item) => item._id !== row.id);
    setTaskTableData(updatedData);
  };

  const editableForTask = useMaterialReactTable({
    columns: coumnsForTask,
    data: taskTableData,
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
    getRowId: (row) => row._id,
    onEditingRowSave: ({ row, values, exitEditingMode }) => {
      handleSaveRowTask(values, row.original); // Pass the original row data to handleSaveRowHistory
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditTask,
    onCreatingRowSave: handleCreateRowTask,
    onCreatingRowCancel: handleCancelCreateTask,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowHistory(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowTask(row)}>
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

  const [teamData, setTeamData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const generateTempId = () => `temp_${Math.random().toString(36).substr(2, 9)}`;
  const [isCreatingRow, setIsCreatingRow] = useState(false);
  const handleUpdate = async (values) => {
    try {
      console.log(values, '00000');
      // Make the API call to update the data
      // const endpoint = RFQ_UPDATE(updateId);
      // await updateData(endpoint, updatesValues, localData?.accessToken);

      // Reset the form and fetch updated data
      fetchFun();
      formik.resetForm();

      // Optionally, set the view mode to 'Initial' or perform other actions
      // setView({
      //   visible: true,
      //   mode: 'Initial'
      // });
    } catch (error) {
      console.error('API error:', error);
    }
  };
  const formik = useFormik({
    initialValues: {
      rfqNumber: '',
      assignedDate: '',
      targetDate: '',
      companyName: '',
      description: '',
      manager: '',
      milestone: '',
      poNumber: '',
      projectAllocation: [],
      finance: [],
      history: [],
      task: []
      // Add initial values for other fields
      // ...
    },
    // validationSchema,
    onSubmit: async (values) => {
      console.log('worked');
      try {
        if (editId) {
          const teamsValue = teamData
            ? teamData.map((item) => ({
                fromDate: item.fromDate,
                employeeCode: item.employeeCode?.slice(0, 7),
                employeeId: managerId?._id,
                toDate: item.toDate,
                location: item.location,
                percentage: Number(item.percentage),
                team: item.team
              }))
            : [];

          const formattedData = {
            ...values,
            assignedDate: startDate,
            targetDate: endDate,
            companyName: selectedRFQ,
            projectAllocation: teamsValue,
            finance: financeData,
            history: historyTableData,
            task: taskTableData
          };
          const endpoint = PROJECT_UPDATE(editId?.original?._id);
          await updateData(endpoint, formattedData, localData?.accessToken);
          setView({
            visible: true,
            mode: 'Initial'
          });
          fetchFun();
        } else {
          console.log('handle submit');
          const teamsValue = teamData
            ? teamData.map((item) => ({
                fromDate: item.fromDate,
                employeeCode: item.employeeCode?.slice(0, 7),
                employeeId: managerId?._id,
                toDate: item.toDate,
                location: item.location,
                percentage: Number(item.percentage),
                team: item.team
              }))
            : [];

          const formattedData = {
            ...values,
            assignedDate: startDate,
            targetDate: endDate,
            companyName: selectedRFQ,
            projectAllocation: teamsValue,
            finance: financeData,
            history: historyTableData,
            task: taskTableData
          };
          console.log(formattedData, 'values');

          const projectAllocate = await postData(PROJECT_CREATE, formattedData, localData?.accessToken);
          console.log(projectAllocate, 'projectAllocate');
          setView({
            visible: true,
            mode: 'Initial'
          });
          fetchFun();
          console.log(data.data, 'fetched using API');
        }
      } catch (error) {
        console.error('API error:', error);
      }
    }
  });
  const [deleteId, setDeleteId] = useState('');
  const [viewId, setViewId] = useState('');
  const [editId, setEditId] = useState('');
  const [open, setOpen] = useState(false);
  const fetchFun = async () => {
    const data = await fetchData(PROJECT_GET, localData?.accessToken);
    setProjectData(data.data);
  };
  const handleDelete = (e) => {
    setOpen(true);
    console.log('open', e.original._id);
    setDeleteId(e.original._id);
  };
  const confirmDelete = async () => {
    try {
      const apiEndPoint = PROJECT_DELETE(deleteId);
      await deleteData(apiEndPoint, localData?.accessToken);
      fetchFun();
      setOpen(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const [milestoneOptions, setMilestoneOptions] = useState([]);

  const theme = useTheme();
  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };
  const handleEdit = (row) => {
    console.log('worked', row);
    setView({
      visible: true,
      mode: 'Edit'
    });
    setEditId(row);
    setMileSelectedOption(row?.original?.milestone);
    setSelectedRFQ(row?.original?.companyName);
    formik.setValues({
      rfqNumber: row?.original?.rfqNumber,
      // companyName: row?.original?.companyName,
      status: row?.original?.status,
      assignedDate: row?.original?.assignedDate.slice(0, 10),
      targetDate: row?.original?.targetDate.slice(0, 10),
      description: row?.original?.description,
      manager: row?.original?.manager
      // milestone: row?.original?.milestone
    });
    setTeamData(row?.original?.projectAllocation);
    // setSelectedOption(row?.original?.requirePO === true ? 'yes' : 'no');
  };

  console.log(formik.values, 'formik');
  const handleView = (row) => {
    console.log('worked', row);
    setView({
      visible: true,
      mode: 'View'
    });
    setViewId(row?.original);
  };

  const table = useMaterialReactTable({
    columns,
    data: projectData,
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
  });
  const handleSaveRowHistory = (newData, oldData) => {
    console.log('handleSaveRowHistory - newData:', newData);
    console.log('handleSaveRowHistory - oldData:', oldData);
    const updatedData = teamData.map((row) => {
      if (
        row._id === oldData._id || // For existing rows
        (row && !row._id && oldData && oldData._tempId && row._tempId === oldData._tempId) // For new rows
      ) {
        return { ...row, ...newData };
      } else {
        return row;
      }
    });
    console.log('handleSaveRowHistory - updatedData:', updatedData);
    setTeamData(updatedData);
    setEditingRowId(null);
  };
  const handleSaveRowFinance = (newData, oldData) => {
    const updatedData = financeData.map((row) => {
      if (
        row._id === oldData._id || // For existing rows
        (row && !row._id && oldData && oldData._tempId && row._tempId === oldData._tempId) // For new rows
      ) {
        return { ...row, ...newData };
      } else {
        return row;
      }
    });
    setFinanceData(updatedData);
    setEditingRowId(null);
  };
  console.log(teamData, 'history');

  const handleEditRowHistorys = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleEditRowFinance = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };

  const handleDeleteRowHistorys = (row) => {
    const updatedData = teamData.filter((item) => item._id !== row.id);
    setTeamData(updatedData);
  };
  const handleDeleteRowFinance = (row) => {
    const updatedData = financeData.filter((item) => item._id !== row.id);
    setFinanceData(updatedData);
  };

  const handleCancelEditHistorys = () => {
    setEditingRowId(null);
  };
  const handleCancelEditFinance = () => {
    setEditingRowId(null);
  };
  const handleCreateRowHistorys = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setTeamData([...teamData, newTask]);
    setIsCreatingRow(false);
  };
  const handleCreateRowFinance = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setFinanceData([...financeData, newTask]);
    setIsCreatingRow(false);
  };
  const handleCancelCreateHistorys = () => {
    setIsCreatingRow(false);
  };
  const handleCancelCreateFinace = () => {
    setIsCreatingRow(false);
  };

  const handleEditRowHistory = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };

  const handleDeleteRowHistory = (row) => {
    const updatedData = teamData.filter((item) => item._id !== row.id);
    setTeamData(updatedData);
  };

  console.log(teamData, 'teamData');

  
  const editableForproject = useMaterialReactTable({
    columns: coumnsForproject,
    data: teamData,
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
    getRowId: (row) => row._id,
    onEditingRowSave: ({ row, values, exitEditingMode }) => {
      handleSaveRowHistory(values, row.original); // Pass the original row data to handleSaveRowHistory
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditHistorys,
    onCreatingRowSave: handleCreateRowHistorys,
    onCreatingRowCancel: handleCancelCreateHistorys,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowHistorys(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowHistorys(row)}>
            <DeleteRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: ({ table }) => (
      <div className="title-bar">
        <div className="custum-header">
          <p style={{ fontWeight: 'bold', fontSize: 'large' }}>Team Allocation</p>
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
  const financeHistorytable = useMaterialReactTable({
    columns: coumnsForFinance,
    data: financeData,
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
    getRowId: (row) => row._id,
    onEditingRowSave: ({ row, values, exitEditingMode }) => {
      handleSaveRowFinance(values, row.original); // Pass the original row data to handleSaveRowHistory
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditFinance,
    onCreatingRowSave: handleCreateRowFinance,
    onCreatingRowCancel: handleCancelCreateFinace,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowFinance(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowFinance(row)}>
            <DeleteRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: ({ table }) => (
      <div className="title-bar">
        <div className="custum-header">
          <p style={{ fontWeight: 'bold', fontSize: 'large' }}>Finance History</p>
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
    formik.resetForm();
    setEditId('');
  };
  const handleClose = () => {
    setView({
      visible: true,
      mode: 'Initial'
    });
  };
  const [description, setDescription] = useState('');
  const [showSelect, setShowSelect] = useState(true);
  const [customOption, setCustomOption] = useState('');

  const categoryOption = milestoneOptions?.map((data) => ({
    label: data.name,
    value: data.name
  }));
  const customOptions = [...categoryOption, { value: 'addMore', label: 'Add More Option' }];
  const [showDescription, setShowDescription] = useState(false);

  const handleSelectClick = () => {
    setShowDescription(true);
  };

  function createData(Date = '', Ref = 0, Amount = 0, Tax = 0, Status = '') {
    return { Date, Ref, Amount, Tax, Status };
  }

  const Financeviewrows = [
    createData('27-04-2001', 1579, 6.0, 24, 'Invoice'),
    createData('28-05-2001', 1599, 6.07, 24, 'Credit'),
    createData('29-06-2001', 1559, 6.08, 24, 'Spent')
  ];

  const handleSelectOnChange = (event) => {
    const value = event.target.value;
    formik.handleChange(event);
    formik.setFieldTouched('milestone', true, false); // Manually mark the field as touched
    // If "Add More Option" is selected, hide the select input and show the text input
    if (value === 'addMore') {
      setShowSelect(false);
    } else {
      setMileSelectedOption(value);
      setShowSelect(true);
    }
  };
  const handleSelectInputChange = (event) => {
    setCustomOption(event.target.value);
  };
  const handleSaveCustomOption = async () => {
    // if (customOption.trim() !== '') {
    //   const newOption = { value: customOption, label: customOption };
    //   setMilestoneOptions([...milestoneOptions, newOption]);
    //   setMileSelectedOption(customOption);
    //   setCustomOption('');
    //   setShowSelect(true);
    // }
    if (customOption.trim() !== '') {
      if (mileselectedOption === 'addMore') {
        // If "Add More Option" is selected, set selectedOption to the customOption value
        setMileSelectedOption(customOption);
      }
      // Save the custom option to the backend
      await postData(MILESTONE_CREATE, { name: customOption });
      // Fetch the updated category data
      const categoryData = await fetchData(MILESTONE_GET);
      setMilestoneOptions(categoryData);
      // Reset the customOption state
      setCustomOption('');
      // Show the select input
      setShowSelect(true);
    }
  };

  const rfqNumber = rfqData.map((item) => ({
    label: item.serialNumber + '  ' + item.companyName,
    value: item.serialNumber
  }));
  const managerList = managerData.map((item) => ({
    label: item.EmployeeCode + ' - ' + item.NameOfCandidate,
    value: item.EmployeeCode
  }));

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    console.log(selectedValue, 'DATA');

    try {
      const fetchedRFQAll = await fetchData(RFQ_GET, localData?.accessToken);
      console.log(fetchedRFQAll.data, 'ffff');
      const filteredData = fetchedRFQAll.data.filter((data) => data.serialNumber === selectedValue);
      if (filteredData.length > 0) {
        const selectedRFQ = filteredData[0].companyName;
        console.log(selectedRFQ, 'Selected RFQ');
        setSelectedRFQ(selectedRFQ);
      } else {
        console.log('No matching data found for the selected serialNumber');
      }
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
      // Handle error as needed
    }
  };

  console.log(startDate, '11111111111111');
  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      console.log('inside useeffect');
      try {
        const localStore = localStorage.getItem('userData');
        console.log(localStore, 'inside localStore');

        if (localStore) {
          setLocalData(JSON.parse(localStore));
        }
        if (localStore) {
          const parsedData = JSON.parse(localStore);
          console.log(parsedData, 'parsed');
          const data = await fetchData(PROJECT_GET, parsedData?.accessToken);
          const data4Rfq = await fetchData(RFQ_GET, parsedData?.accessToken);
          const data4Employee = await fetchData(PROFILES_GET_ROLE('Employee'), parsedData?.accessToken);
          const EmployeeRole = await fetchData(PROFILES_GET_ROLE('Manager'), parsedData?.accessToken);
          const categoryData = await fetchData(MILESTONE_GET);
          setMilestoneOptions(categoryData);
          setManagerData(EmployeeRole?.data);
          console.log(EmployeeRole, 'EmployeeRole');
          setProfilesData(data4Employee?.data);
          setRFQData(data4Rfq?.data);
          console.log(data, 'parsedddd');
          setProjectData(data?.data);
          console.log(data?.data, 'fetched using db');
          // Fetch updateId data
        }
      } catch (error) {
        console.error('Error in fetchDataAndUpdate:', error);
      }
    };

    fetchDataAndUpdate(); // Invoke the async function
  }, []); // Add dependencies if needed
  console.log(startDate, '1 date');
  console.log(endDate, '2 date');
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.rfqNumber && formik.errors.rfqNumber)}>
                  <InputLabel id="additional-select-label">RFQ Number</InputLabel>
                  <Select
                    name="rfqNumber"
                    value={formik.values.rfqNumber}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleSelectChange(e);
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {rfqNumber.map((lead, index) => (
                      <MenuItem key={index} value={lead.value}>
                        {lead.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.rfqNumber && formik.errors.rfqNumber && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.rfqNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                  fullWidth
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={selectedRFQ}
                  disabled
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.companyName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <DatePicker
                  oneTap
                  style={{ width: 200 }}
                  placeholder="Assigned Date"
                  name="assignedDate"
                  aria-autocomplete="false"
                  autoComplete="false"
                  onChange={(e) => handleStartDateChange(e)}
                  // value={formik.values.assignedDate}
                />
                {/* {formik.touched.assignedDate && formik.errors.assignedDate && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.assignedDate}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid xs={4} p={2}>
                <DatePicker
                  oneTap
                  style={{ width: 200 }}
                  placeholder="Target Date"
                  name="targetDate"
                  onChange={(e) => handleEndDateChange(e)}
                />
              </Grid>

              {/* <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.status && formik.errors.status)}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'newlead'}>OnGoing</MenuItem>
                    <MenuItem value={'contactEstablish'}>Customer Review</MenuItem>
                    <MenuItem value={'technicleMeeting'}>Internal Review</MenuItem>
                    <MenuItem value={'requirementConfirm'}>Complete</MenuItem>
                    <MenuItem value={'hold'}>Hold</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.status}
                  </FormHelperText>
                )}
              </Grid> */}
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.description && formik.errors.description)}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="description"
                  variant="outlined"
                />
                {formik.touched.description && formik.errors.description && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.description}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.manager && formik.errors.manager)}>
                  <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="manager"
                    name="manager"
                    value={formik.values.manager}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {managerList?.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={4} p={2}>
                {showSelect ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">MileStone</InputLabel>
                    <Select
                      error={Boolean(formik.touched.milestone && formik.errors.milestone)}
                      value={mileselectedOption}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      name="milestone"
                      onChange={handleSelectOnChange}
                      label="Select"
                      placeholder="Select"
                    >
                      {customOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>

                    {formik.touched.milestone && formik.errors.milestone && (
                      <FormHelperText error id="standard-weight-helper-text-Password-login">
                        {formik.errors.milestone}
                      </FormHelperText>
                    )}
                  </FormControl>
                ) : (
                  <>
                    <div style={{ display: 'flex' }}>
                      <TextField
                        type="text"
                        fullWidth
                        value={customOption}
                        onChange={handleSelectInputChange}
                        placeholder="Enter custom option"
                      />
                      <Button onClick={handleSaveCustomOption}>Save</Button>
                    </div>
                  </>
                )}
              </Grid>
              <Grid item>
                {showDescription && (
                  <TextField
                    type="text"
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                    style={{ marginTop: '10px' }}
                  />
                )}
              </Grid>
              <Grid item xs={4} p={2}>
                <FormLabel id="demo-row-radio-buttons-group-label">P0.NO</FormLabel>
                <RadioGroup aria-label="yesno" name="yesno" value={selectedOption} onChange={handleOptionChange} row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
              {/* {selectedOption === 'yes' && (
                <Grid item xs={4} p={2}>
                  <TextField
                    fullWidth
                    id="status-display"
                    label="PO Number"
                    variant="outlined"
                    value={textFieldText}
                    disabled={selectedOption === 'no'}
                    onChange={(e) => setTextFieldText(e.target.value)}
                  />
                </Grid>
              )} */}
            </Grid>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable sx={{ boxShadow: 'rgba(0, 0, 0, 0.18) 1.95px 1.95px 2.7px' }} table={editableForproject} />
            </Box>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable sx={{ boxShadow: 'rgba(0, 0, 0, 0.18) 1.95px 1.95px 2.7px' }} table={financeHistorytable} />
            </Box>
            <Button variant="contained" style={{ float: 'right', margin: '2rem' }} type="submit">
              Save
            </Button>
          </form>
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.rfqNumber && formik.errors.rfqNumber)}>
                  <InputLabel id="additional-select-label">RFQ Number</InputLabel>
                  <Select
                    name="rfqNumber"
                    value={formik.values.rfqNumber}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleSelectChange(e);
                    }}
                    onBlur={formik.handleBlur}
                  >
                    {rfqNumber.map((lead, index) => (
                      <MenuItem key={index} value={lead.value}>
                        {lead.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.rfqNumber && formik.errors.rfqNumber && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.rfqNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                  fullWidth
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                  name="companyName"
                  value={selectedRFQ}
                  disabled
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.companyName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <DatePicker
                  oneTap
                  style={{ width: 200 }}
                  placeholder="Assigned Date"
                  name="assignedDate"
                  aria-autocomplete="false"
                  autoComplete="false"
                  onChange={(e) => handleStartDateChange(e)}
                  value={parseDate(formik.values.assignedDate)}
                />
                {/* {formik.touched.assignedDate && formik.errors.assignedDate && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.assignedDate}
                  </FormHelperText>
                )} */}
              </Grid>
              <Grid xs={4} p={2}>
                <DatePicker
                  oneTap
                  style={{ width: 200 }}
                  placeholder="Target Date"
                  name="targetDate"
                  onChange={(e) => handleEndDateChange(e)}
                  value={parseDate(formik.values.targetDate)}
                />
              </Grid>

              {/* <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.status && formik.errors.status)}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'newlead'}>OnGoing</MenuItem>
                    <MenuItem value={'contactEstablish'}>Customer Review</MenuItem>
                    <MenuItem value={'technicleMeeting'}>Internal Review</MenuItem>
                    <MenuItem value={'requirementConfirm'}>Complete</MenuItem>
                    <MenuItem value={'hold'}>Hold</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.status}
                  </FormHelperText>
                )}
              </Grid> */}
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.description && formik.errors.description)}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="description"
                  variant="outlined"
                />
                {formik.touched.description && formik.errors.description && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.description}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.manager && formik.errors.manager)}>
                  <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="manager"
                    name="manager"
                    value={formik.values.manager}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {managerList?.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={4} p={2}>
                {showSelect ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">MileStone</InputLabel>
                    <Select
                      error={Boolean(formik.touched.milestone && formik.errors.milestone)}
                      value={mileselectedOption}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      name="milestone"
                      onChange={handleSelectOnChange}
                      label="Select"
                      placeholder="Select"
                    >
                      {customOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>

                    {formik.touched.milestone && formik.errors.milestone && (
                      <FormHelperText error id="standard-weight-helper-text-Password-login">
                        {formik.errors.milestone}
                      </FormHelperText>
                    )}
                  </FormControl>
                ) : (
                  <>
                    <div style={{ display: 'flex' }}>
                      <TextField
                        type="text"
                        fullWidth
                        value={customOption}
                        onChange={handleSelectInputChange}
                        placeholder="Enter custom option"
                      />
                      <Button onClick={handleSaveCustomOption}>Save</Button>
                    </div>
                  </>
                )}
              </Grid>
              <Grid item>
                {showDescription && (
                  <TextField
                    type="text"
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter description"
                    style={{ marginTop: '10px' }}
                  />
                )}
              </Grid>
              <Grid item xs={4} p={2}>
                <FormLabel id="demo-row-radio-buttons-group-label">P0.NO</FormLabel>
                <RadioGroup aria-label="yesno" name="yesno" value={selectedOption} onChange={handleOptionChange} row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
              {/* {selectedOption === 'yes' && (
                <Grid item xs={4} p={2}>
                  <TextField
                    fullWidth
                    id="status-display"
                    label="PO Number"
                    variant="outlined"
                    value={textFieldText}
                    disabled={selectedOption === 'no'}
                    onChange={(e) => setTextFieldText(e.target.value)}
                  />
                </Grid>
              )} */}
            </Grid>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable sx={{ boxShadow: 'rgba(0, 0, 0, 0.18) 1.95px 1.95px 2.7px' }} table={editableForproject} />
            </Box>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable sx={{ boxShadow: 'rgba(0, 0, 0, 0.18) 1.95px 1.95px 2.7px' }} table={financeHistorytable} />
            </Box>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable table={editableForHistory} />
            </Box>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable table={editableForTask} />
            </Box>
            <Button variant="contained" style={{ float: 'right', margin: '2rem' }} type="submit">
              Update
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
                <p>{viewId?.projectNumber}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Company Name</label>
                <p>{viewId?.companyName}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Assigned Date</label>
                <p>{viewId?.assignedDate?.slice(0, 10)}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Target Date</label>
                <p>{viewId?.targetDate?.slice(0, 10)}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Status</label>
                <p>{viewId?.status}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Manager</label>
                <p>{viewId?.manager}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">MileStone</label>
                <p>{viewId?.milestone}</p>
              </Grid>
            </Grid>
            <Grid container p={3}>
              <Grid xs={12} p={2}>
                <div className="teamallocation-container">
                  <MainCard
                    title="Team Allocation"
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
                  >
                    {viewId?.projectAllocation.map((data) => (
                      <Card sx={{ margin: '1rem', padding: '1rem' }} className="card-hovered">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            {/* <Avatar sx={{ bgcolor: '#ede7f6', color: '#5e35b1' }}>{data?.employeeName[0]}</Avatar> */}
                            <div className="ms-1">
                              <p className="avatar-name">{data?.employeeCode}</p>
                              <div className="d-flex align-items-center">
                                <p className="text-muted-light m-0">{data?.team}</p> &nbsp; /
                                <div>
                                  <PeopleAltTwoTone style={{ fontSize: 'medium' }} />
                                  <span className="ms-01">{data.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="float-end">
                            <p className="text-muted-light m-0 text-end">Assigned Date : &nbsp; {data?.fromDate}</p>
                            <p className="text-muted-light m-0 text-end">Target Date : &nbsp; {data?.toDate}</p>
                            <div className="d-flex justify-content-end">
                              <p
                                className={`${data?.status === 'in-progress' ? 'badge-warning max-width' : ''}${
                                  data?.status === 'completed' ? 'badge-success max-width' : ''
                                }${data?.status === 'not-started' ? 'badge-danger max-width' : ''}`}
                              >
                                {data?.statusRequest} {data?.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </MainCard>
                </div>
              </Grid>
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
                  ></MainCard>
                </div>
              </Grid>
              <Grid xs={8} p={2}>
                <div className="task-container">
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
                            sx={
                              {
                                // Avatar styles
                              }
                            }
                            aria-haspopup="true"
                            color="inherit"
                          >
                            <TaskAlt stroke={2} size="1.3rem" />
                          </Avatar>
                        </ButtonBase>
                      </Box>
                    }
                  >
                    {tasks &&
                      Array.isArray(tasks) &&
                      tasks.map((data, index) => (
                        <Card key={index} sx={{ margin: '1rem', padding: '1rem' }} className="card-hover">
                          <Typography variant="h6" component="span">
                            {data?.title}
                          </Typography>
                          <Typography variant="body1">{data?.description}</Typography>
                        </Card>
                      ))}
                  </MainCard>
                </div>
              </Grid>
              <Grid>
                <TableContainer component={Paper}>
                  <MainCard title="Finance History">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell align="right">Ref No/Bill</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Tax</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Financeviewrows.map((row) => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                              {row.Date}
                            </TableCell>
                            <TableCell align="right">{row.Ref}</TableCell>
                            <TableCell align="right">{row.Amount}</TableCell>
                            <TableCell align="right">{row.Tax}</TableCell>
                            <TableCell align="right">{row.Status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </MainCard>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
        </>
      )}
      <Dialog fullWidth open={open} TransitionComponent={Transition} keepMounted>
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
export default Projects;
