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
  FormHelperText,
  Card,
  CardContent,
  CardActions
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
  LocationOnTwoTone,
  PersonAdd,
  TaskAlt,
  ThumbDown,
  ThumbDownAltSharp,
  ThumbUpSharp,
  VisibilityRounded,
  Money,
  CurrencyRupee,
  DeleteTwoTone,
  CreateTwoTone,
  VisibilityTwoTone,
  CurrencyExchange
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
  LEAD_GET_BY_CODE,
  MILESTONE_CREATE,
  MILESTONE_GET,
  PROFILES_CREATE,
  PROFILES_GET,
  PROFILES_GETBY_STATUS,
  PROFILES_GET_ROLE,
  PROJECT_CREATE,
  PROJECT_DELETE,
  PROJECT_GET,
  PROJECT_UPDATE,
  RFQ_GET,
  RFQ_GET_BY_CODE,
  RFQ_GET_ID,
  RFQ_GET_STATUS
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
  columnHelper.accessor('projectName', {
    header: 'Project Name'
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
  columnHelper.accessor('milestone1', {
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
    const filterEmployee = profilesData.filter((employee) => employee?.EmployeeCode === value);
    console.log(filterEmployee[0], 'filterEmployee');
    setManagerId(filterEmployee[0]);
  };
  console.log(managerId, 'managerId');
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
      accessorKey: 'employeeName',
      header: 'Employee Name',
      editVariant: 'text',
      // editSelectOptions: optionsForteamproject,
      muiEditTextFieldProps: ({ cell, row, table }) => (
        console.log('mui', cell, row, table),
        {
          value: managerId?.NameOfCandidate
        }
      ),
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
      editVariant: 'text',
      // editSelectOptions: optionsForteamproject,
      muiEditTextFieldProps: {
        value: managerId?.Team
      },
      enableEditing: true
      // Cell: ({ renderedCellValue, row }) => (
      //   <Box component="span">
      //     <p>{row.original.Team}</p>
      //   </Box>
      // )
    },

    {
      accessorKey: 'location',
      header: 'Location',
      editVariant: 'text',
      // editSelectOptions: optionsForlocation,
      enableEditing: true,
      muiEditTextFieldProps: {
        value: managerId?.Location
      }
    }
  ];
  const columnsForFinance = [
    {
      accessorKey: 'date',
      header: 'Date',
      enableEditing: false
      // muiEditTextFieldProps: {
      //   type: 'date',
      //   required: true
      // }
    },
    {
      accessorKey: 'refNumber',
      header: 'Ref No/Bill',
      muiEditTextFieldProps: {
        type: 'text',
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
    },
    {
      accessorKey: 'createdBy',
      header: 'Created By',
      enableEditing: false
    }
  ];
  const columnsForHistory = [
    {
      accessorKey: 'date',
      header: 'Date',
      enableEditing: false
      // muiEditTextFieldProps: {
      //   type: 'date',
      //   required: true
      // }
    },
    {
      accessorKey: 'projectDescription',
      header: 'Description',
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
    },
    {
      accessorKey: 'createdBy',
      header: 'Created By',
      enableEditing: false
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
      editVariant: 'select',
      editSelectOptions: profilesData.map((item) => item.EmployeeCode + '-' + item.NameOfCandidate),
      muiEditTextFieldProps: {
        select: true
      },
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
    }
  ];

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
  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  }
  const formik = useFormik({
    initialValues: {
      rfqNumber: '',
      assignedDate: '',
      targetDate: '',
      companyName: '',
      description: '',
      manager: '',
      milestone1: '',
      milestone2: '',
      milestone3: '',
      milestone4: '',
      milestone5: '',
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
                employeeCode: item.employeeCode,
                employeeId: item.employeeId,
                employeeName: item.employeeName,
                toDate: item.toDate,
                location: item?.location,
                percentage: Number(item.percentage),
                team: item?.team
              }))
            : [];
          const historyValue = historyTableData
            ? historyTableData.map((data) => ({
                date: data.date,
                projectDescription: data.projectDescription,
                requestStatus: data.requestStatus,
                approvalStatus: data.approvalStatus,
                createdBy: data.createdBy
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
                status: data.status,
                createdBy: data.createdBy
              }))
            : [];
          console.log(values, 'upd');
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
                employeeCode: item.employeeCode,
                employeeId: managerId?._id,
                toDate: item.toDate,
                location: managerId?.location,
                percentage: Number(item.percentage),
                team: managerId?.team
              }))
            : [];
          const historyValue = historyTableData
            ? historyTableData.map((data) => ({
                date: data.date,
                projectDescription: data.description,
                requestStatus: data.requeststatus,
                approvalStatus: data.approvalstatus,
                createdBy: data.createdBy
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
                status: data.status,
                createdBy: data.createdBy
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
      milestone1: row?.original?.milestone1,
      milestone2: row?.original?.milestone2,
      milestone3: row?.original?.milestone3,
      milestone4: row?.original?.milestone4,
      milestone5: row?.original?.milestone5
    });
    setTeamData(row?.original?.projectAllocation);
    setHistoryTableData(row?.original?.history);
    setFinanceData(row?.original?.finance);
    setTaskTableData(row?.original?.task);
    // setSelectedOption(row?.original?.requirePO === true ? 'yes' : 'no');
  };
  const [rfqView, setRfqView] = useState(false);
  const [rfqSummary, setRfqSummary] = useState([]);
  const [leadSummary, setLeadSummary] = useState([]);
  console.log(rfqData, 'rfqData');
  console.log(projectData, 'projectData');
  const handleView = async (row) => {
    console.log('worked', row);
    setView({
      visible: true,
      mode: 'View'
    });
    setViewId(row?.original);
    if (row?.original?.rfqNumber) {
      const encodedSerialNumber = encodeURIComponent(row?.original?.rfqNumber);
      const getByCodeEndpoint = RFQ_GET_BY_CODE(encodedSerialNumber);
      const getByIdCode = await fetchData(getByCodeEndpoint, localData?.accessToken);
      if (getByIdCode?.data?.leadNumber !== 'New RFQ') {
        setRfqView(true);
        const encodedSerialNumberLead = encodeURIComponent(getByIdCode?.data?.leadNumber);
        const getByLeadEndpoint = LEAD_GET_BY_CODE(encodedSerialNumberLead);
        const getByIdCodeLead = await fetchData(getByLeadEndpoint, localData?.accessToken);
        setLeadSummary(getByIdCodeLead?.data);
      } else {
        setLeadSummary([]);
        setRfqView(false);
      }
      setRfqSummary(getByIdCode?.data);
      console.log('getByIdCode', getByIdCode);
    }
  };
  console.log(leadSummary, 'projectAllocation');
  const table = useMaterialReactTable({
    columns,
    data: projectData,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex' }}>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteTwoTone style={{ color: '#2196f3' }} />
        </IconButton>
        <IconButton onClick={() => handleView(row)}>
          <VisibilityTwoTone style={{ color: '#2196f3' }} />
        </IconButton>
        <IconButton onClick={() => handleEdit(row)}>
          <CreateTwoTone style={{ color: '#2196f3' }} />
        </IconButton>
      </div>
    ),
    enableColumnPinning: true,
    initialState: {
      columnPinning: { right: ['mrt-row-actions'] }
    },
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
    console.log(teamData, managerId, 'handleSave');

    const tempId = generateTempId(); // Generate a temporary ID
    const filtered = {
      employeeCode: newData?.values?.employeeCode,
      employeeName: managerId?.NameOfCandidate,
      fromDate: newData?.values?.fromDate,
      toDate: newData?.values?.toDate,
      percentage: newData?.values?.percentage,
      team: managerId?.Team,
      employeeId: managerId?._id,
      location: managerId?.Location
    };
    const newTask = { ...filtered, _id: tempId };
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
    const newTask = { ...newData.values, _id: tempId, date: getCurrentDate(), createdBy: `${localData?.code}-${localData.name}` };
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
    const newTask = { ...newData.values, _id: tempId, date: getCurrentDate(), createdBy: `${localData?.code}-${localData.name}` };
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
      <Box sx={{ display: 'none', gap: '1rem' }}>
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
      <Box sx={{ display: 'none', gap: '1rem' }}>
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
      <Box sx={{ display: 'none', gap: '1rem' }}>
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
      <Box sx={{ display: 'none', gap: '1rem' }}>
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
    setTeamData([]);
    setHistoryTableData([]);
    setTaskTableData([]);
    setFinanceData([]);
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

  function findRFQDataByNumber(rfqNumber) {
    return rfqData.find((rfq) => rfq.serialNumber === rfqNumber);
  }

  // Iterate through projectData and find corresponding RFQ data
  const projectWithRFQData = projectData.map((project) => {
    const rfqNumber = project.rfqNumber.split(' ')[0]; // Extract RFQ number
    const correspondingRFQData = findRFQDataByNumber(rfqNumber);
    return { ...project, rfqData: correspondingRFQData };
  });
  console.log(projectWithRFQData, 'projectWithRFQData');

  const rfqNumber = rfqData.map((item) => ({
    label: item.serialNumber + '  ' + item.companyName,
    value: item.serialNumber
  }));
  // console.log(projectWithRFQData);
  const managerList = managerData.map((item) => ({
    label: item.EmployeeCode + ' - ' + item.NameOfCandidate,
    value: item.EmployeeCode + '-' + item.NameOfCandidate
  }));

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);
    console.log(selectedValue, 'DATA');

    try {
      const fetchedRFQAll = await fetchData(RFQ_GET_STATUS, localData?.accessToken);
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
          const data4Rfq = await fetchData(RFQ_GET_STATUS, parsedData?.accessToken);
          const data4Employee = await fetchData(PROFILES_GETBY_STATUS('active'), parsedData?.accessToken);
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
                    {rfqNumber.map((lead, index) => {
                      const isRFQInProject = projectWithRFQData.some(
                        (project) => project.rfqData && project.rfqData.serialNumber === lead.value
                      );
                      return (
                        <MenuItem key={index} value={lead.value} disabled={isRFQInProject}>
                          {lead.label}
                        </MenuItem>
                      );
                    })}
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
                  label={selectedRFQ?.companyName ? '' : 'Company Name'}
                  variant="outlined"
                  name="companyName"
                  value={selectedRFQ?.companyName}
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
                <TextField
                  error={Boolean(formik.touched.projectName && formik.errors.projectName)}
                  fullWidth
                  id="outlined-basic"
                  label={'Project Name'}
                  variant="outlined"
                  name="projectName"
                  value={selectedPR}
                  disabled
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.projectName && formik.errors.projectName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.projectName}
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
                  onClean={() => setStartDate('')}
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
                <TextField
                  error={Boolean(formik.touched.milestone1 && formik.errors.milestone1)}
                  name="milestone1"
                  value={formik.values.milestone1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 1"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone2 && formik.errors.milestone2)}
                  name="milestone2"
                  value={formik.values.milestone2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 2"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone3 && formik.errors.milestone3)}
                  name="milestone3"
                  value={formik.values.milestone3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 3"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone4 && formik.errors.milestone4)}
                  name="milestone4"
                  value={formik.values.milestone4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 4"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone5 && formik.errors.milestone5)}
                  name="milestone5"
                  value={formik.values.milestone5}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 5"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid xs={4} p={2}>
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
              </Grid> */}
              {/* <Grid item>
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
              </Grid> */}
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
                    disabled
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
                  variant="outlined"
                  name="companyName"
                  label="Company Name"
                  value={selectedRFQ?.companyName}
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
                <TextField
                  error={Boolean(formik.touched.projectName && formik.errors.projectName)}
                  fullWidth
                  id="outlined-basic"
                  label="Project Name"
                  variant="outlined"
                  name="projectName"
                  value={selectedPR}
                  disabled
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.projectName && formik.errors.projectName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.projectName}
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
                  // onClean={() => formik.setValues({ assignedDate: '' })}
                  onChange={(e) => {
                    handleStartDateChange(e);
                    formik.handleChange;
                  }}
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
                  onChange={(e) => {
                    handleEndDateChange(e);
                    formik.handleChange;
                  }}
                  value={parseDate(formik.values.targetDate)}
                />
              </Grid>
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
                <TextField
                  error={Boolean(formik.touched.milestone1 && formik.errors.milestone1)}
                  name="milestone1"
                  value={formik.values.milestone1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 1"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone2 && formik.errors.milestone2)}
                  name="milestone2"
                  value={formik.values.milestone2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 2"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone3 && formik.errors.milestone3)}
                  name="milestone3"
                  value={formik.values.milestone3}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 3"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone4 && formik.errors.milestone4)}
                  name="milestone4"
                  value={formik.values.milestone4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 4"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.milestone5 && formik.errors.milestone5)}
                  name="milestone5"
                  value={formik.values.milestone5}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Milestone 5"
                  variant="outlined"
                />
              </Grid>
              {/* <Grid xs={4} p={2}>
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
              </Grid> */}
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
          {rfqView && (
            <MainCard
              className="mb-1"
              title="Lead Note"
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
                  <label className="text-muted">Lead Number</label>
                  <p>{leadSummary?.serialNumber}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Date</label>
                  <p>{leadSummary?.date?.slice(0, 10)}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Source</label>
                  <p>{leadSummary?.Source}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Pilot</label>
                  <p>{leadSummary?.Pilot}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Company Name</label>
                  <p>{leadSummary?.companyName}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Category</label>
                  <p>{leadSummary?.category}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Contact Name</label>
                  <p>{leadSummary?.contactName}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Department</label>
                  <p>{leadSummary?.departmentName}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Phone Number</label>
                  <p>{leadSummary?.phoneNumber}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Email</label>
                  <p>{leadSummary?.email}</p>
                </Grid>
                <Grid xs={3} p={2}>
                  <label className="text-muted">Business Verticle</label>
                  <p>{leadSummary?.businessVertical}</p>
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
                      <Timeline position="">
                        {leadSummary?.leadDescription.map((item) => (
                          <TimelineItem>
                            <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                            <TimelineSeparator>
                              <Tooltip title="New Lead" placement="top" arrow>
                                <TimelineDot color="secondary">
                                  {item.statusRequest === 'newlead' && <PersonAdd />}
                                  {item.statusRequest === 'Contact Establish' && <ConnectWithoutContact />}
                                  {item.statusRequest === 'Technicle Meeting' && <Group />}
                                  {item.statusRequest === 'Hold' && <NotStarted />}
                                  {item.statusRequest === 'Reject' && <ThumbDown />}
                                  {item.statusRequest === 'Move to RFQ' && <ThumbUpSharp />}
                                </TimelineDot>
                              </Tooltip>
                              <TimelineConnector />
                            </TimelineSeparator>

                            <TimelineContent>
                              <Typography variant="h6" component="span" className="text-muted">
                                {item.date?.slice(0, 10)} / {item.createdBy}
                              </Typography>
                              <br />
                              <Typography variant="h6" component="span" className="strong">
                                {item.statusRequest === 'newlead' ? 'New Lead' : item.statusRequest} &nbsp; - &nbsp;
                                {item.status === '' ? 'Pending' : item.status}
                              </Typography>
                              <li> {item.description}</li>
                            </TimelineContent>
                          </TimelineItem>
                        ))}
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
                    >
                      {leadSummary?.tasks?.map((data) => (
                        <Card sx={{ margin: '1rem', padding: '1rem' }} className="card-hover">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <Avatar sx={{ bgcolor: '#ede7f6', color: '#5e35b1' }}>{data?.responsible[0]}</Avatar>
                              <div className="ms-1">
                                <p className="avatar-name">{data?.responsible}</p>
                                <p className="text-muted-light m-0">{data?.taskId}</p> &nbsp;
                                {/* / */}
                                {/* <PeopleAltTwoTone style={{ fontSize: 'medium' }} />
                                <span className="ms-01">{}</span> */}
                              </div>
                            </div>
                            <div className="float-end">
                              <p className="text-muted-light m-0 text-end">Assigned Date : &nbsp; {data?.assignedDate?.slice(0, 10)}</p>
                              <p className="text-muted-light m-0 text-end">Target Date : &nbsp; {data?.targetDate?.slice(0, 10)}</p>
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
                          <div className="mt-2 ms-1">
                            <p className="text-muted m-0">{data?.title}</p>
                            <p className="">
                              <span>{data?.description}</span>
                            </p>
                            <p className="text-muted m-0">Remarks</p>
                            <p className="">
                              <span> {data?.remark}</span>
                            </p>
                          </div>
                        </Card>
                      ))}
                    </MainCard>
                  </div>
                </Grid>
              </Grid>
            </MainCard>
          )}
          <MainCard
            className="mb-2"
            title="RFQ Note"
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
                <label className="text-muted">RFQ Number</label>
                <p>{rfqSummary?.serialNumber}</p>
              </Grid>
              {rfqSummary.leadNumber !== null && (
                <Grid xs={3} p={2}>
                  <label className="text-muted">Lead Number</label>
                  <p>{rfqSummary?.leadNumber}</p>
                </Grid>
              )}
              <Grid xs={3} p={2}>
                <label className="text-muted">Date</label>
                <p>{rfqSummary?.date?.slice(0, 10)}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Source</label>
                <p>{rfqSummary?.Source}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Pilot</label>
                <p>{rfqSummary?.Pilot}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Company Name</label>
                <p>{rfqSummary?.companyName}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Category</label>
                <p>{rfqSummary?.category}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Contact Name</label>
                <p>{rfqSummary?.contactName}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Department</label>
                <p>{rfqSummary?.departmentName}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Phone Number</label>
                <p>{rfqSummary?.phoneNumber}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Email</label>
                <p>{rfqSummary?.email}</p>
              </Grid>
              <Grid xs={3} p={2}>
                <label className="text-muted">Business Verticle</label>
                <p>{rfqSummary?.businessVertical}</p>
              </Grid>
              {rfqSummary?.tcoNumber && (
                <Grid xs={3} p={2}>
                  <label className="text-muted">TCO Number</label>
                  <p>{rfqSummary?.tcoNumber}</p>
                </Grid>
              )}
              {rfqSummary?.currency && (
                <Grid xs={3} p={2}>
                  <label className="text-muted">Type Of Currency</label>
                  <p>{rfqSummary?.currency}</p>
                </Grid>
              )}
              {rfqSummary?.approximateValue && (
                <Grid xs={3} p={2}>
                  <label className="text-muted">Approximate Value</label>
                  <p>{rfqSummary?.approximateValue}</p>
                </Grid>
              )}
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
                      {rfqSummary?.rfqDescription?.map((item) => (
                        <TimelineItem>
                          <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                          <TimelineSeparator>
                            <Tooltip title="New Lead" placement="top" arrow>
                              <TimelineDot color="secondary">
                                {/* 'New RFQ', 'Tech Meet Done', 'TCO Submitted', 'Negotiation', 'Business Award', 'Lost' */}
                                {item.statusRequest === 'New RFQ' && <PersonAdd />}
                                {item.statusRequest === 'Technical Meet Done' && <ConnectWithoutContact />}
                                {item.statusRequest === 'TCO Submitted' && <Group />}
                                {item.statusRequest === 'Negotiation' && <CurrencyExchange />}
                                {item.statusRequest === 'Lost' && <ThumbDown />}
                                {item.statusRequest === 'Business Award' && <ThumbUpSharp />}
                              </TimelineDot>
                            </Tooltip>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="h6" component="span" className="text-muted">
                              {item.date?.slice(0, 10)} / {item.createdBy}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="span" className="strong">
                              {item.statusRequest === 'newlead' ? 'New Lead' : item.statusRequest} &nbsp; - &nbsp;
                              {item.status === '' ? 'Pending' : item.status}
                            </Typography>
                            <li> {item.description}</li>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </MainCard>
                </div>
              </Grid>
              <Grid xs={8} p={2}>
                <div className="Task-container">
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
                  >
                    {rfqSummary?.tasks?.map((data) => (
                      <Card sx={{ margin: '1rem', padding: '1rem' }} className="card-hover">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <Avatar sx={{ bgcolor: '#ede7f6', color: '#5e35b1' }}>{data?.responsible[0]}</Avatar>
                            <div className="ms-1">
                              <p className="avatar-name">{data?.responsible}</p>
                              <p className="text-muted-light m-0">{data?.taskId}</p> &nbsp;
                              {/* / */}
                              {/* <PeopleAltTwoTone style={{ fontSize: 'medium' }} />
                                <span className="ms-01">{}</span> */}
                            </div>
                          </div>
                          <div className="float-end">
                            <p className="text-muted-light m-0 text-end">Assigned Date : &nbsp; {data?.assignedDate?.slice(0, 10)}</p>
                            <p className="text-muted-light m-0 text-end">Target Date : &nbsp; {data?.targetDate?.slice(0, 10)}</p>
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
                        <div className="mt-2 ms-1">
                          <p className="text-muted m-0">{data?.title}</p>
                          <p className="">
                            <span>{data?.description}</span>
                          </p>
                          <p className="text-muted m-0">Remarks</p>
                          <p className="">
                            <span> {data?.remark}</span>
                          </p>
                        </div>
                      </Card>
                    ))}
                  </MainCard>
                </div>
              </Grid>
            </Grid>
          </MainCard>
          <MainCard
            title="Project Note"
            className="mt-1"
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
                                    className={`${data?.status === 'in-progress' ? 'badge-warning max-width' : ''}${
                                      data?.status === 'completed' ? 'badge-success max-width' : ''
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
              <Grid xs={8} p={2}>
                <div className="history-container">
                  <MainCard
                    title="Finance History"
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
                            <CurrencyRupee stroke={2} size="1.3rem" />
                          </Avatar>
                        </ButtonBase>
                      </Box>
                    }
                  >
                    <Table aria-label="simple table">
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
                        {viewId?.finance?.map((row) => (
                          <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell align="right">{row.refNumber}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.tax}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </MainCard>
                </div>
              </Grid>
            </Grid>
            <Grid container p={3}>
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
