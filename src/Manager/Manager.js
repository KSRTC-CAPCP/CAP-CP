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
  Card,
  Tab
} from '@mui/material';
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { IconDownload, IconEdit, IconEye, IconHistoryToggle, IconPlus, IconTrash, IconUpload } from '@tabler/icons';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import * as XLSX from 'xlsx';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  ConnectWithoutContact,
  CurrencyRupee,
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
  TabContext,
  TabList,
  TabPanel,
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
  PROFILES_GET_ID,
  PROFILES_GET_ROLE,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_UPDATE,
  RFQ_GET,
  RFQ_GET_ID,
  TASKS_GET_ALL
} from 'api/apiEndPoint';
import { useEffect } from 'react';
import { deleteData, fetchData, postData, updateData } from 'utils/apiUtils';
import TaskPanel from 'views/task';
import Attendance from 'views/Attendance/Attendance';
import Overallattendance from './Overallattendance';

const columnHelper = createMRTColumnHelper();
const data = [
  {
    projectname: 222,
    projectNumber: '22-04-2022',
    companyname: '23-08-2023',
    assignedDate: 'yes',
    targetDate: '1234',
    milestone: '1234',
    description: 'abc'
  },
  {
    projectname: 222,
    projectNumber: '22-04-2022',
    companyname: '23-08-2023',
    assignedDate: 'yes',
    targetDate: '1234',
    milestone: '1234',
    description: 'abc'
  }
];
const columns = [
  columnHelper.accessor('projectName', {
    header: 'Title'
  }),
  columnHelper.accessor('projectNumber', {
    header: 'Ref Number'
  }),
  columnHelper.accessor('companyName', {
    header: 'Company Name'
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
  columnHelper.accessor('description', {
    header: 'Description'
  }),
  columnHelper.accessor('milestone1', {
    header: 'MileStone'
  })
];
const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
const optionsForHistoryStatus = [' OnGoing', 'Customer Review', 'Internal Review', 'Complete', 'Hold'];
const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];
const optionsForteamproject = ['IT Team', 'Finance Team', 'Teardown Team'];
const optionsForFinance = ['Credit', 'Invoice', 'Spent'];
const optionsForlocation = ['Thiruvallur', 'Ambattur'];

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

const Manager = ({ _history, tasks }) => {
  const navigateToTaskpage = () => {
    window.location.href = '/task-panel';
  };
  const [profilesData, setProfilesData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState();
  const [managerId, setManagerId] = useState('');
  const handleEmployee = (e) => {
    console.log(e.target.value.slice(0, 7), 'its worked');
    const value = e.target.value;
    const filterEmployee = profilesData.filter((employee) => employee?.EmployeeCode === value.slice(0, 7));
    console.log(filterEmployee[0], 'filterEmployee');
    setManagerId(filterEmployee[0]);
  };
  const columnsForproject = [
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
  const columnsForFinance = [
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
  const columnsForHistory = [
    {
      accessorKey: 'date',
      header: 'Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'projectDescription',
      header: 'Lead Description',
      enableEditing: true
    },
    {
      accessorKey: 'requestStatus',
      header: 'Request Status',
      editVariant: 'select',
      editSelectOptions: optionsForHistoryStatus,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    },
    {
      accessorKey: 'approvalStatus',
      header: 'Approval Status',
      editVariant: 'select',
      editSelectOptions: optionsForHistoryApproval,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    }
  ];
  const columnsForTask = [
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
      accessorKey: 'assignedDate',
      header: 'Assigned Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      }
    },
    {
      accessorKey: 'targetDate',
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
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedDate, setSelectedDate] = useState('');
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

  const handleEndDateChange = (event) => {
    const inputDate = new Date(event);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    const [day, month, year] = formattedDate.split('/');
    const formattedStartDate = `${day}-${month}-${year}`;
    setEndDate(formattedStartDate);
    formik.setValues({
      ...formik.values,
      targetDate: formattedStartDate
    });
  };
  const handleStartDateChange = (event) => {
    const inputDate = new Date(event);
    const formattedDate = inputDate.toLocaleDateString('en-GB');
    const [day, month, year] = formattedDate.split('/');
    const formattedStartDate = `${day}-${month}-${year}`;
    setStartDate(formattedStartDate);
    formik.setValues({
      ...formik.values,
      assignedDate: formattedStartDate
    });
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
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [milestone, setMilestone] = useState([]);
  const [showSelects, setShowSelects] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [customOptiones, setCustomOptions] = useState('');
  const [descriptionValues, setDescriptionValues] = useState({}); // State to store descriptions for options

  const [view, setView] = useState({
    visible: false,
    mode: 'Initial' // 'add', 'edit', 'view'
  });

  const handleDescriptionChange = (optionValue, description) => {
    setDescriptionValues({ ...descriptionValues, [optionValue]: description });
  };

  const [historyTableColumns, setHistoryTableColumns] = useState(columnsForHistory);
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
  const [selectedPR, setSelectedPR] = useState('');
  const [teamData, setTeamData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [historyTableData, setHistoryTableData] = useState([]);
  const [taskTableData, setTaskTableData] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const generateTempId = () => `temp_${Math.random().toString(36).substr(2, 9)}`;
  const [isCreatingRow, setIsCreatingRow] = useState(false);

  const formik = useFormik({
    initialValues: {
      assignedDate: '',
      targetDate: '',
      companyName: '',
      description: '',
      manager: '',
      milestone: '',
      poNumber: '',
      projectName: '',
      projectAllocation: [],
      finance: [],
      history: [],
      task: []
      // Add initial values for other fields
      // ...
    },
    // validationSchema,
    onSubmit: async (values) => {
      console.log('worked', values);
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
          const historyValue = historyTableData
            ? historyTableData.map((data) => ({
              date: data.date,
              projectDescription: data.projectDescription,
              requestStatus: data.requestStatus,
              approvalStatus: data.approvalStatus
            }))
            : [];
          const taskValue = taskTableData
            ? taskTableData.map((data) => ({
              title: data.title,
              description: data.description,
              responsible: data.responsible,
              remarks: data.remarks,
              assignedDate: data.assignedDate,
              targetDate: data.targetDate,
              status: data.status
            }))
            : [];
          const financeValue = financeData
            ? financeData.map((data) => ({
              date: data.date,
              refNumber: data.refNumber,
              amount: data.amount,
              tax: data.tax,
              status: data.status
            }))
            : [];
          console.log(values, 'upd');
          const formattedData = {
            ...values,
            assignedDate: startDate,
            targetDate: endDate,
            companyName: selectedRFQ?.companyName,
            projectName: selectedPR,
            milestone: mileselectedOption,
            projectAllocation: teamsValue,
            finance: financeValue,
            history: historyValue,
            task: taskValue
          };
          const endpoint = PROJECT_UPDATE(editId?.original?._id);
          await updateData(endpoint, formattedData, localData?.accessToken);
          setView({
            visible: true,
            mode: 'Initial'
          });
          fetchFun();
        } else {
          console.log('handle submit', values, startDate, endDate);
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
          const historyValue = historyTableData
            ? historyTableData.map((data) => ({
              date: data.date,
              projectDescription: data.description,
              requestStatus: data.requeststatus,
              approvalStatus: data.approvalstatus
            }))
            : [];
          const taskValue = taskTableData
            ? taskTableData.map((data) => ({
              title: data.title,
              description: data.description,
              responsible: data.responsible,
              remarks: data.remarks,
              assignedDate: data.assigneddate,
              targetDate: data.targetdate,
              status: data.status
            }))
            : [];
          const financeValue = financeData
            ? financeData.map((data) => ({
              date: data.date,
              refNumber: data.refNumber,
              amount: data.amount,
              tax: data.tax,
              status: data.status
            }))
            : [];
          const formattedData = {
            ...values,
            assignedDate: startDate,
            targetDate: endDate,
            companyName: selectedRFQ?.companyName,
            projectName: selectedPR,
            projectAllocation: teamsValue,
            finance: financeValue,
            history: historyValue,
            task: taskValue
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
    const data = await fetchData(MANAGERS_PROJECT(employeeDetail?.EmployeeCode), localData?.accessToken);
    console.log(data, 'datadatadata');
    // const data = await fetchData(PROJECT_GET, localData?.accessToken);
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
    setSelectedRFQ(row?.original);
    setSelectedPR(row?.original?.projectName);
    setStartDate(row?.original?.assignedDate);
    setEndDate(row?.original?.targetDate);
    formik.setValues({
      rfqNumber: row?.original?.rfqNumber,
      // companyName: row?.original?.companyName,
      status: row?.original?.status,
      assignedDate: row?.original?.assignedDate,
      targetDate: row?.original?.targetDate,
      description: row?.original?.description,
      manager: row?.original?.manager,
      milestone: row?.original?.milestone
    });
    setTeamData(row?.original?.projectAllocation);
    setHistoryTableData(row?.original?.history);
    setFinanceData(row?.original?.finance);
    setTaskTableData(row?.original?.task);
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
        {/* <IconButton onClick={() => handleDelete(row)}>
          <DeleteRounded style={{ color: '#2196f3' }} />
        </IconButton> */}
        <IconButton onClick={() => handleView(row)}>
          <VisibilityRounded style={{ color: '#2196f3' }} />
        </IconButton>
        <Link to="/task-panel">
          <IconButton>
            <IconPlus style={{ color: '#2196f3' }} />
          </IconButton>
        </Link>
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
  const [isFilter, setIsFilter] = useState('getProject');
  const handleFilter = (e) => {
    setIsFilter(e.target.value);
  };
  //Project
  const handleSaveRowProject = (newData, oldData) => {
    console.log('handleSaveRowProject - newData:', newData);
    console.log('handleSaveRowProject - oldData:', oldData);
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
    console.log('handleSaveRowProject - updatedData:', updatedData);
    setTeamData(updatedData);
    setEditingRowId(null);
  };
  const handleEditRowProjects = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleDeleteRowProjects = (row) => {
    const updatedData = teamData.filter((item) => item._id !== row.id);
    setTeamData(updatedData);
  };
  const handleCancelEditProjects = () => {
    setEditingRowId(null);
  };
  const handleCreateRowProjects = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setTeamData([...teamData, newTask]);
    setIsCreatingRow(false);
  };
  const handleCancelCreateProjects = () => {
    setIsCreatingRow(false);
  };
  //History
  // projectAllocation: teamsValue,
  //           finance: financeData,
  //           history: historyTableData,
  //           task: taskTableData
  const handleSaveRowHistory = (newData, oldData) => {
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
    setHistoryTableData(updatedData);
    setEditingRowId(null);
  };
  const handleEditRowHistorys = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleDeleteRowHistorys = (row) => {
    const updatedData = historyTableData.filter((item) => item._id !== row.id);
    setHistoryTableData(updatedData);
  };
  const handleCancelEditHistorys = () => {
    setEditingRowId(null);
  };
  const handleCreateRowHistorys = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setHistoryTableData([...historyTableData, newTask]);
    setIsCreatingRow(false);
  };
  const handleCancelCreateHistorys = () => {
    setIsCreatingRow(false);
  };
  //Task
  const handleSaveRowTask = (newData, oldData) => {
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
    setTaskTableData(updatedData);
    setEditingRowId(null);
  };
  const handleEditRowTasks = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleDeleteRowTasks = (row) => {
    const updatedData = taskTableData.filter((item) => item._id !== row.id);
    setTaskTableData(updatedData);
  };
  const handleCancelEditTasks = () => {
    setEditingRowId(null);
  };
  const handleCreateRowTasks = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setTaskTableData([...taskTableData, newTask]);
    setIsCreatingRow(false);
  };
  const handleCancelCreateTasks = () => {
    setIsCreatingRow(false);
  };
  //Finance
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
  const handleEditRowFinances = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleDeleteRowFinances = (row) => {
    const updatedData = financeData.filter((item) => item._id !== row.id);
    setFinanceData(updatedData);
  };
  const handleCancelEditFinances = () => {
    setEditingRowId(null);
  };
  const handleCreateRowFinances = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId };
    setFinanceData([...financeData, newTask]);
    setIsCreatingRow(false);
  };
  const handleCancelCreateFinances = () => {
    setIsCreatingRow(false);
  };
  const editableForproject = useMaterialReactTable({
    columns: columnsForproject,
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
      handleSaveRowProject(values, row.original); // Pass the original row data to handleSaveRowProject
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditProjects,
    onCreatingRowSave: handleCreateRowProjects,
    onCreatingRowCancel: handleCancelCreateProjects,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowProjects(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowProjects(row)}>
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
  const editableForHistory = useMaterialReactTable({
    columns: columnsForHistory,
    data: historyTableData,
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
      handleSaveRowHistory(values, row.original); // Pass the original row data to handleSaveRowProject
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
          <p style={{ fontWeight: 'bold', fontSize: 'large' }}>History</p>
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
    columns: columnsForFinance,
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
      handleSaveRowFinance(values, row.original); // Pass the original row data to handleSaveRowFinance
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditFinances,
    onCreatingRowSave: handleCreateRowFinances,
    onCreatingRowCancel: handleCancelCreateFinances,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowFinances(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowFinances(row)}>
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
  const editableForTask = useMaterialReactTable({
    columns: columnsForTask,
    data: taskTableData,
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
      handleSaveRowTask(values, row.original); // Pass the original row data to handleSaveRowTask
      exitEditingMode(); // Call exitEditingMode to exit editing mode
    },
    onEditingRowCancel: handleCancelEditTasks,
    onCreatingRowSave: handleCreateRowTasks,
    onCreatingRowCancel: handleCancelCreateTasks,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              handleEditRowTasks(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowTasks(row)}>
            <DeleteRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    renderTopToolbarCustomActions: ({ table }) => (
      <div className="title-bar">
        <div className="custum-header">
          <p style={{ fontWeight: 'bold', fontSize: 'large' }}>Task Allocation</p>
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
  console.log('history---->', historyTableData);
  console.log('teams---->', teamData);
  console.log('tasks---->', taskTableData);
  console.log('finance---->', financeData);
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
    setSelectedPR('');
    setMileSelectedOption('');
    setSelectedRFQ('');
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
        const selectedRFQ = filteredData[0];
        console.log(selectedRFQ, 'Selected RFQ');
        setSelectedRFQ(selectedRFQ);
        const projectNameSchema = selectedRFQ?.companyName + '-' + selectedRFQ?.contactName + '-' + selectedRFQ?.category;
        setSelectedPR(projectNameSchema);
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
      try {
        const localStore = localStorage.getItem('userData');
        console.log(localStore, 'inside localStore');

        if (localStore) {
          setLocalData(JSON.parse(localStore));
        }
        if (localStore) {
          const parsedData = JSON.parse(localStore);
          console.log(parsedData, 'parsed');
          const EmployeeCode = await fetchData(PROFILES_GET_ID(parsedData?.employeeId), parsedData?.accessToken);
          const data = await fetchData(TASKS_GET_ALL, parsedData?.accessToken);
          console.log(data, 'datadatadata');
          const data4Rfq = await fetchData(RFQ_GET, parsedData?.accessToken);
          const data4Employee = await fetchData(PROFILES_GET_ROLE('Employee'), parsedData?.accessToken);
          const EmployeeRole = await fetchData(PROFILES_GET_ROLE('Manager'), parsedData?.accessToken);
          const categoryData = await fetchData(MILESTONE_GET);
          setMilestoneOptions(categoryData);
          setManagerData(EmployeeRole?.data);
          setEmployeeDetail(EmployeeCode);
          console.log(EmployeeRole, 'EmployeeRole');
          console.log(EmployeeCode, 'EmployeeCode');
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
      {view.mode === 'Initial' && (
        <MainCard>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box
                className="pe-1"
                sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {/* <Tab
                    label={<div style={{ display: 'flex', alignItems: 'center' }}>Project Logs</div>}
                    value="1"
                    style={{ fontSize: '15px' }}
                  /> */}
                  <Tab
                    label={<div style={{ display: 'flex', alignItems: 'center' }}>Attendance Logs</div>}
                    value="1"
                    style={{ fontSize: '15px' }}
                  />
                  <Tab
                    label={<div style={{ display: 'flex', alignItems: 'center' }}>Leave Logs</div>}
                    value="3"
                    style={{ fontSize: '15px' }}
                  />
                </TabList>
                {/* <Button
                  // onClick={() => handleView(row)}
                  sx={{
                    backgroundColor: '#ede7f6',
                    color: '#5e35b1',
                    transition: 'background-color 0.3s',
                    padding: '5px 15px',
                    '&:hover': {
                      backgroundColor: '#5e35b1',
                      color: '#ede7f6'
                    }
                  }}
                >
                  Overall Tasks
                </Button> */}
              </Box>
              {/* <TabPanel value="1">
                <MaterialReactTable table={table} />
              </TabPanel> */}
              <TabPanel value="1">
                {/* <Attendance /> */}
                <Overallattendance />
              </TabPanel>
            </TabContext>
          </Box>
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
              <Grid xs={12}>
                <Grid container>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">Project Number</label>
                    <p>{viewId?.projectNumber}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">Project Name</label>
                    <p>{viewId?.projectName}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">RFQ Number</label>
                    <p>{viewId?.rfqNumber}</p>
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
                    <label className="text-muted">Description</label>
                    <p>{viewId?.description}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">Manager</label>
                    <p>{viewId?.manager}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">MileStone 1</label>
                    <p>{viewId?.milestone1 ? viewId?.milestone1 : '-'}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">MileStone 2</label>
                    <p>{viewId?.milestone2 ? viewId?.milestone2 : '-'}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">MileStone 3</label>
                    <p>{viewId?.milestone3 ? viewId?.milestone3 : '-'}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">MileStone 4</label>
                    <p>{viewId?.milestone4 ? viewId?.milestone4 : '-'}</p>
                  </Grid>
                  <Grid xs={3} p={2}>
                    <label className="text-muted">MileStone 5</label>
                    <p>{viewId?.milestone5 ? viewId?.milestone5 : '-'}</p>
                  </Grid>
                </Grid>
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
                    <Grid container p={2}>
                      {viewId?.projectAllocation?.map((data) => (
                        <Grid xs={3} p={2}>
                          <Card sx={{ margin: '1rem', padding: '1rem' }} className="card-hovered">
                            <div className="">
                              <div className="">
                                <div className="d-flex align-items-center w-100" style={{ justifyContent: 'space-between' }}>
                                  <div>
                                    <p className="avatar-name">{data?.employeeName}</p>
                                    <p className="avatar-name">{data?.employeeCode}</p>
                                  </div>
                                  <div>
                                    <Avatar sx={{ bgcolor: '#ede7f6', color: '#5e35b1', width: '60px', height: '60px' }}>
                                      {data?.employeeName ? data?.employeeName[0] : ''}
                                    </Avatar>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <p className="text-muted-light m-0">{data?.team}</p> / &nbsp;
                                  <div className="d-flex align-items-center">
                                    <LocationOnTwoTone style={{ fontSize: 'medium' }} />
                                    <span className="">{data.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <p className="text-muted-light m-0">Assigned Date : &nbsp; {data?.fromDate}</p>
                                <p className="text-muted-light m-0">Target Date : &nbsp; {data?.toDate}</p>
                                <div className="d-flex justify-content-end">
                                  <p
                                    className={`${data?.status === 'in-progress' ? 'badge-warning max-width' : ''}${data?.status === 'completed' ? 'badge-success max-width' : ''
                                      }${data?.status === 'not-started' ? 'badge-danger max-width' : ''}`}
                                  >
                                    {data?.statusRequest} {data?.status}
                                  </p>
                                </div>
                              </div>
                              {/* <Progress value={'12'} /> */}
                            </div>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
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
                  >
                    <Timeline>
                      {viewId?.history?.map((item) => (
                        <TimelineItem>
                          <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot color="secondary">
                              {/* {item.statusRequest === 'newlead' && <PersonAdd />}
                              {item.statusRequest === 'Contact Establish' && <ConnectWithoutContact />}
                              {item.statusRequest === 'Technicle Meeting' && <Group />}
                              {item.statusRequest === 'Hold' && <NotStarted />}
                              {item.statusRequest === 'Reject' && <ThumbDown />}
                              {item.statusRequest === 'Move to RFQ' && <ThumbUpSharp />} */}
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="h6" component="span" className="text-muted">
                              {item.date?.slice(0, 10)}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="span" className="strong">
                              {item.requestStatus} &nbsp; - &nbsp;
                              {item.approvalStatus === '' ? 'Pending' : item.approvalStatus}
                            </Typography>
                            <li> {item.projectDescription}</li>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </MainCard>
                </div>
              </Grid>
              <Grid xs={8} p={3}>
                <Grid xs={12}>
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
                      {viewId?.task?.map((data) => (
                        <div>
                          <Grid container>
                            <Grid xs={4} className="d-flex border-left ">
                              <Avatar sx={{ bgcolor: '#ede7f6', color: '#5e35b1', marginTop: '15px' }}>
                                {data?.responsible ? data?.responsible[0] : ''}
                              </Avatar>
                              <div className="ms-1">
                                <p className="avatar-name">{data?.responsible}</p>
                                <p className="text-muted-light m-0">Assigned Date : &nbsp; {data?.assignedDate?.slice(0, 10)}</p>
                                <p className="text-muted-light m-0">Target Date : &nbsp; {data?.targetDate?.slice(0, 10)}</p>
                              </div>
                            </Grid>
                            <Grid xs={8}>
                              <div className="ms-1">
                                <p className="text-muted m-0">{data?.title}</p>
                                <p className="m-0">
                                  <span>{data?.description}</span>
                                </p>
                                <p className="text-muted m-0">Remarks</p>
                                <p className="m-0">
                                  <span> {data?.remarks}</span>
                                </p>
                              </div>
                              <hr />
                            </Grid>
                          </Grid>
                        </div>
                      ))}
                    </MainCard>
                  </div>
                </Grid>
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
export default Manager;
