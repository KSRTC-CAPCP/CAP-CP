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
  Card,
  Badge,
  FormHelperText
} from '@mui/material';
import React, { forwardRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import { IconDownload, IconEdit, IconEye, IconHistoryToggle, IconPlus, IconTrash, IconUpload } from '@tabler/icons';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import {
  ConnectWithoutContact,
  CreateTwoTone,
  Delete,
  DeleteRounded,
  DeleteTwoTone,
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
  VisibilityRounded,
  VisibilityTwoTone
} from '@mui/icons-material';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@mui/lab';
import { useMemo } from 'react';
import { deleteData, fetchData, getById, postData, updateData } from 'utils/apiUtils';
import { CATEGORY_CREATE, CATEGORY_GET, RFQ_CREATION, RFQ_DELETE, RFQ_GET, RFQ_GET_ID, RFQ_UPDATE } from 'api/apiEndPoint';
import { LEAD_CREATION, LEAD_DELETE, LEAD_GET, LEAD_GET_ID, LEAD_UPDATE } from 'api/apiEndPoint';
import { useEffect } from 'react';

const columnHelper = createMRTColumnHelper();
const validationSchema = Yup.object({
  date: Yup.string().required('Date is required'),
  Source: Yup.string().required('Source is required'),
  Pilot: Yup.string().required('Pilot is required'),
  companyName: Yup.string().required('Company Name is required'),
  category: Yup.string().required('Category is required'),
  contactName: Yup.string().required('Contact Name is required'),
  departmentName: Yup.string().required('Department Name is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().required('Email is required'),
  businessVertical: Yup.string().required('businessVertical is required')
  // Add validation for other fields as needed
});

const data = [
  {
    rfqNumber: '123333',
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
    rfqNumber: '123333',
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
  columnHelper.accessor('serialNumber', {
    header: 'RFQ No',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        <p>{row.original.serialNumber}</p>
      </Box>
    )
  }),

  columnHelper.accessor('date', {
    header: 'Date',
    Cell: ({ row }) => (
      <Box component="span">
        {row.original && row.original.date && typeof row.original.date === 'string' && row.original.date.length >= 10 ? (
          <p>{row.original.date}</p>
        ) : (
          <p>Invalid Date</p>
        )}
      </Box>
    )
  }),
  columnHelper.accessor('Source', {
    header: 'Source'
  }),
  columnHelper.accessor('Pilot', {
    header: 'Pilot'
  }),
  columnHelper.accessor('companyName', {
    header: 'Company Name'
  }),
  columnHelper.accessor('category', {
    header: 'Category'
  }),
  columnHelper.accessor('contactName', {
    header: 'Contact Name'
  }),
  columnHelper.accessor('departmentName', {
    header: 'Department'
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone Number'
  }),
  columnHelper.accessor('email', {
    header: 'Email'
  }),
  columnHelper.accessor('businessVertical', {
    header: 'Business Verticle'
  }),
  columnHelper.accessor('rfqdescription', {
    header: 'RFQ Description',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        {row.original.rfqDescription.length > 0 && <p>{row.original.rfqDescription[row.original.rfqDescription.length - 1].description}</p>}
      </Box>
    )
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        {row.original.rfqDescription.length > 0 && (
          <p>
            {row.original.rfqDescription[row.original.rfqDescription.length - 1].statusRequest}&nbsp;
            {row.original.rfqDescription[row.original.rfqDescription.length - 1].status}
          </p>
        )}
      </Box>
    )
  })
];
const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
const optionsForHistoryStatus = ['Tech Meet Done', 'TCO Submitted', 'Negotiation', 'Business Award', 'Lost']; //
const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];

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
    assigneddate: '2-04-2001',
    targetdate: '27-04-2001'
  },
  {
    // id: '123',
    date: '12-09-2023',
    description: 'description',
    remarks: 'remarks',
    status: 'status',
    assigneddate: '2-04-2001',
    targetdate: '27-04-2001'
  }
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BusinessRFQ = () => {
  const [localData, setLocalData] = useState('');

  const coumnsForHistory = [
    {
      accessorKey: 'date',
      header: 'Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      },
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.date}</p>
        </Box>
      )
    },
    {
      accessorKey: 'description',
      header: 'RFQ Description',
      enableEditing: true
    },
    {
      accessorKey: 'statusRequest',
      header: 'Request Status',
      editVariant: 'select',
      editSelectOptions: optionsForHistoryStatus,
      muiEditTextFieldProps: {
        select: true
      },
      enableEditing: true
    }
  ];
  const [historyTableColumns, setHistoryTableColumns] = useState(coumnsForHistory);

  const coumnsForTask = [
    // {
    //   accessorKey: 'id',
    //   header: 'Id'
    // },
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
      accessorKey: 'remark',
      header: 'Remarks',
      enableEditing: true
    },
    {
      accessorKey: 'assignedDate',
      header: 'Assigned Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      },
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.assignedDate}</p>
        </Box>
      )
    },
    {
      accessorKey: 'targetDate',
      header: 'Target Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      },
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.targetDate}</p>
        </Box>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      editVariant: 'select',
      editSelectOptions: optionsForTaskStatus,
      muiEditTextFieldProps: {
        select: true
      },
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p className="">{row.original.status}</p>
        </Box>
      ),
      enableEditing: true
    }
  ];
  const [inputValue, setInputValue] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' }
  ]);
  const [statusOpt, setstatusOpt] = useState([
    { value: 'New RFQ', label: 'New RFQ' },
    { value: 'Technical Meet Done', label: 'Technical Meet Done' }
    // { value: 'TCO Submitted', label: 'TCO Submitted' }
    // { value: 'Negotiation', label: 'Negotiation' },
    // { value: 'Business Awarded', label: 'Business Awarded' },
    // { value: 'Lost', label: 'Lost' }
  ]);
  const [rfqSummary, setrfqSummary] = useState('');
  const [rfqData, setrfqData] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updatedValue, setUpdatedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [showSelect, setShowSelect] = useState(true);
  const [customOption, setCustomOption] = useState('');
  const [category, setCategory] = useState([]);

  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const generateTempId = () => `temp_${Math.random().toString(36).substr(2, 9)}`;
  const [taskTableData, setTaskTableData] = useState([]);
  const [historyTableData, setHistoryTableData] = useState([]);
  const [isCreatingRow, setIsCreatingRow] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [selectedLead, setSelectedLead] = useState([]);
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
  const handleSelectOnChange = (event) => {
    const value = event.target.value;
    formik.handleChange(event);
    formik.setFieldTouched('category', true, false); // Manually mark the field as touched
    // If "Add More Option" is selected, hide the select input and show the text input
    if (value === 'addMore') {
      setShowSelect(false);
    } else {
      setSelectedOption(value);
      setShowSelect(true);
    }
  };
  const handleSelectInputChange = (event) => {
    setCustomOption(event.target.value);
  };
  const handleSaveCustomOption = async () => {
    await postData(CATEGORY_CREATE, { name: customOption });
    // if (customOption.trim() !== '') {
    // const newOption = { value: customOption, label: customOption };
    // console.log(newOption, 'newOption');
    // setCategoryOptions([...categoryOptions, newOption]);
    // setSelectedOption(customOption);
    // setCustomOption('');
    const categoryData = await fetchData(CATEGORY_GET);
    setCategory(categoryData);
    console.log(categoryData, 'fetched using categoryData db');
    setShowSelect(true);

    // }
  };

  const [leadData, setLeadData] = useState([]);

  const leadNumber = leadData.map((item) => ({
    label: item.serialNumber + '  ' + item.companyName,
    value: item._id
  }));

  console.log(leadData, 'leads');
  const handleserialNumberChange = (event) => {
    const selectedSerialNumber = event.target.value;
    // Find the corresponding lead based on the selected serial number
    const selectedLead = leadData.find((lead) => lead.serialNumber === selectedSerialNumber);
    // Do something with the selected lead data
  };
  const handleAddOption = () => {
    if (inputValue.trim() !== '') {
      setOptions([...options, inputValue]);
      setInputValue('');
    }
  };
  const handleSelectChange = async (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value, 'dATA');
    const endpoint = LEAD_GET_ID(event.target.value);
    const fetchedLead = await fetchData(endpoint, localData?.accessToken);
    console.log(fetchedLead, 'ffff');
    setSelectedLead(fetchedLead?.data);
    const value = fetchedLead?.data;
    console.log(value.businessVertical, '123123');
    console.log(value.leadDescription[value.leadDescription.length - 1]?.statusRequest, '123123');
    formik.setValues({
      date: value.date,
      Source: value.Source,
      Pilot: value.Pilot,
      companyName: value.companyName,
      category: value.category,
      contactName: value.contactName,
      departmentName: value.departmentName,
      phoneNumber: value.phoneNumber,
      email: value.email,
      businessVertical: value.businessVertical,
      rfqDescription: value.leadDescription[value.leadDescription.length - 1]?.description,
      status: value.leadDescription[value.leadDescription.length - 1]?.statusRequest
    });
  };
  const categoryOption = category?.map((data) => ({
    label: data.name,
    value: data.name
  }));
  const customOptions = [...categoryOption, { value: 'addMore', label: 'Add More Option' }];
  const [view, setView] = useState({
    visible: false,
    mode: 'Initial' // 'add', 'edit', 'view'
  });
  const [open, setOpen] = useState(false);
  const handleDelete = (e) => {
    setOpen(true);
    console.log('open', e.original._id);
    setDeleteId(e.original._id);
  };

  const confirmDelete = async () => {
    try {
      const apiEndPoint = RFQ_DELETE(deleteId);
      await deleteData(apiEndPoint, localData?.accessToken);
      fetchFun();
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

  const populateFormFields = (rfqData) => {
    console.log(rfqData, 'populateFormFields');
    formik.setValues({
      date: rfqData.date,
      Source: rfqData.Source,
      Pilot: rfqData.Pilot,
      companyName: rfqData.companyName,
      category: rfqData.category,
      contactName: rfqData.contactName,
      departmentName: rfqData.departmentName,
      phoneNumber: rfqData.phoneNumber,
      email: rfqData.email,
      businessVertical: rfqData.businessVertical // ... Other fields
      // ...populate other fields
    });
  };

  const handleEdit = async (e) => {
    console.log('worked', e.original._id);
    const endpoint = RFQ_GET_ID(e.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    // setUpdatedValue(getByIdData)
    setUpdateId(e.original._id);
    console.log(getByIdData?.data, 'getby');
    formik.setValues({
      date: getByIdData?.data.date,
      Source: getByIdData?.data.Source,
      Pilot: getByIdData?.data.Pilot,
      companyName: getByIdData?.data.companyName,
      category: getByIdData?.data.category,
      contactName: getByIdData?.data.contactName,
      departmentName: getByIdData?.data.departmentName,
      phoneNumber: getByIdData?.data.phoneNumber,
      email: getByIdData?.data.email,
      businessVertical: getByIdData?.data.businessVertical // ... Other fields
    });
    populateFormFields(getByIdData?.data);
    // setUpdatedValue(e.original);
    setView({
      visible: true,
      mode: 'Edit'
    });
  };
  const handleView = async (e) => {
    console.log('worked', e);
    const endpoint = RFQ_GET_ID(e.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    setrfqSummary(getByIdData.data);
    console.log('worked', getByIdData.data);
    setView({
      visible: true,
      mode: 'View'
    });
  };
  const fetchFun = async () => {
    const data = await fetchData(RFQ_GET, localData?.accessToken);
    setrfqData(data.data);
  };
  const handleUpdate = async (values) => {
    try {
      // Assuming values contain the updated data
      const updatesValues = {
        // Update fields as needed
        date: values.date,
        Source: values.Source,
        Pilot: values.Pilot,
        companyName: values.companyName,
        category: values.category,
        contactName: values.contactName,
        departmentName: values.departmentName,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
        businessVertical: values?.businessVertical,
        rfqDescription: historyTableData,
        tasks: taskTableData
        // ...update other fields
      };
      console.log(updatesValues, '00000');
      console.log(updatesValues, '00000');
      // Make the API call to update the data
      const endpoint = RFQ_UPDATE(updateId);
      await updateData(endpoint, updatesValues, localData?.accessToken);

      // Reset the form and fetch updated data
      fetchFun();
      formik.resetForm();

      // Optionally, set the view mode to 'Initial' or perform other actions
      setView({
        visible: true,
        mode: 'Initial'
      });
    } catch (error) {
      console.error('API error:', error);
    }
  };
  const formik = useFormik({
    initialValues: {
      date: '',
      Source: '',
      Pilot: '',
      companyName: '',
      category: '',
      contactName: '',
      departmentName: '',
      phoneNumber: '',
      email: '',
      businessVertical: '',
      rfqDescription: [], // Initialize as an array
      tasks: [],
      approximateValue: '',
      status: ''
      // Add initial values for other fields
      // ...
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('worked');
      try {
        if (updateId) {
          console.log('handle update');
          handleUpdate(values);
        } else {
          console.log('handle submit');

          const rfqDescriptionArray = values.rfqDescription
            ? values.rfqDescription.split('\n').map((item) => ({
                date: values.date,
                description: item.trim(),
                status: 'pending', // Set your default status here
                statusRequest: 'contact establish' // Set your default statusRequest here
              }))
            : [];

          const formattedData = {
            ...values,
            rfqDescription: rfqDescriptionArray
          };

          await postData(RFQ_CREATION, formattedData, localData?.accessToken);
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
  const table = useMaterialReactTable({
    columns,
    data: rfqData,
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
  const handleSaveRowHistory = (newData, oldData) => {
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
  const handleEditRowHistory = (row) => {
    console.log(row, 'looooogg');
    const editingId = row._id || row._tempId; // Use _id if available, otherwise use _tempId
    setEditingRowId(editingId);
  };
  const handleCancelCreateHistory = () => {
    setIsCreatingRow(false);
  };
  const handleDeleteRowHistory = (row) => {
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
      handleSaveRowHistory(values, row.original); // Pass the original row data to handleSaveRowHistory
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
              handleEditRowHistory(row), table.setEditingRow(row);
            }}
          >
            <ModeEditRounded style={{ color: '#2196f3' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRowHistory(row)}>
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

  const [showAdditionalInput, setShowAdditionalInput] = useState(false);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setShowAdditionalInput(selectedValue === 'rfqfromlead');
  };

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

  // Update the useEffect hook
  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        const localStore = localStorage.getItem('userData');
        if (localStore) {
          setLocalData(JSON.parse(localStore));
        }
        if (localStore) {
          const parsedData = JSON.parse(localStore);
          const data = await fetchData(RFQ_GET, parsedData?.accessToken);
          setrfqData(data.data);
          console.log(data.data, 'fetched using db');
          const response = await fetchData(LEAD_GET, parsedData?.accessToken);
          setLeadData(response?.data);

          // Fetch leads data
          const categoryData = await fetchData(CATEGORY_GET);
          setCategory(categoryData);
          console.log(categoryData, 'fetched using categoryData db');
          // Fetch updateId data
          if (updateId) {
            const endPointId = RFQ_GET_ID(updateId);
            const fetchUpdateId = await fetchData(endPointId, parsedData?.accessToken);
            setUpdatedValue(fetchUpdateId);
            setTaskTableData(fetchUpdateId?.data?.tasks);
            // Check if the user has the "Admin" role
            console.log(parsedData?.Roles, 'who?');
            if (parsedData?.role === 'admin') {
              // Include the "Approval Status" column for Admin
              setHistoryTableColumns([
                ...coumnsForHistory,
                {
                  accessorKey: 'status',
                  header: 'Approval Status',
                  editVariant: 'select',
                  editSelectOptions: optionsForHistoryApproval,
                  muiEditTextFieldProps: {
                    select: true
                  },
                  enableEditing: true
                }
              ]);
            } else {
              // Exclude the "Approval Status" column for non-Admin users
              setHistoryTableColumns([...coumnsForHistory.filter((col) => col.accessorKey !== 'status')]);
            }
            setHistoryTableData(fetchUpdateId?.data?.rfqDescription);
            console.log(fetchUpdateId, 'fetched updateId');
          }
        }
      } catch (error) {
        console.error('Error in fetchDataAndUpdate:', error);
      }
    };

    fetchDataAndUpdate(); // Invoke the async function
  }, [updateId]); // Add dependencies if needed

  useEffect(() => {
    console.log(localData, 'localData');
    // const response = await fetchData(LEAD_GET, localData?.accessToken);
  }, []);
  console.log(
    taskTableData.map((item) => item.status),
    'red'
  );
  const statusFilter = historyTableData.map((item) => item.statusRequest);
  const filteredStatusArray = statusFilter.filter((statusRequest) => statusRequest === 'TCO Submitted Approved');
  console.log(filteredStatusArray[0] === 'TCO Submitted', 'filteredStatusArray');
  return (
    <div className="max">
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={4} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">RFQ</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="rfq"
                    name="Source"
                    value={formik.values.Source}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'rfqfromlead'}>RFQ From Lead</MenuItem>
                    <MenuItem value={'createnewrfq'}>Create New RFQ</MenuItem>
                  </Select>
                  {formik.touched.Source && formik.errors.Source && (
                    <FormHelperText error id="standard-weight-helper-text-Password-login">
                      {formik.errors.Source}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {showAdditionalInput && (
                <Grid item xs={4} p={2}>
                  <FormControl fullWidth>
                    <InputLabel id="additional-select-label">Number</InputLabel>
                    <Select onChange={handleSelectChange}>
                      {leadNumber.map((lead, index) => (
                        <MenuItem key={index} value={lead.value}>
                          {lead.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.date && formik.errors.date)}
                  fullWidth
                  type="date"
                  variant="outlined"
                  name="date"
                  className="w-100"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.date && formik.errors.date && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.date}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.Source && formik.errors.Source)}>
                  <InputLabel id="demo-simple-select-label">Source</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    name="Source"
                    value={formik.values.Source}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'website'}>Website</MenuItem>
                    <MenuItem value={'Expo'}>Expo</MenuItem>
                    <MenuItem value={'Reference'}>Reference</MenuItem>
                    <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                    <MenuItem value={'others'}>Others</MenuItem>
                  </Select>
                  {formik.touched.Source && formik.errors.Source && (
                    <FormHelperText error id="standard-weight-helper-text-Password-login">
                      {formik.errors.Source}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.Pilot && formik.errors.Pilot)}
                  name="Pilot"
                  value={formik.values.Pilot}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Pilot"
                  variant="outlined"
                />
                {formik.touched.Pilot && formik.errors.Pilot && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Pilot}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.companyName}
                  </FormHelperText>
                )}
              </Grid>{' '}
              <Grid xs={4} p={2}>
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                    <MenuItem value={'website'}>Website</MenuItem>
                    <MenuItem value={'Expo'}>Expo</MenuItem>
                    <MenuItem value={'Reference'}>Reference</MenuItem>
                    <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                    <MenuItem value={'others'}>Others</MenuItem>
                  </Select>
                </FormControl> */}
                {showSelect ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      error={Boolean(formik.touched.category && formik.errors.category)}
                      value={selectedOption}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      name="category"
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
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText error id="standard-weight-helper-text-Password-login">
                        {formik.errors.category}
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
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.contactName && formik.errors.contactName)}
                  name="contactName"
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Contact Name"
                  variant="outlined"
                />
                {formik.touched.contactName && formik.errors.contactName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.contactName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.departmentName && formik.errors.departmentName)}
                  name="departmentName"
                  value={formik.values.departmentName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Department"
                  variant="outlined"
                />
                {formik.touched.departmentName && formik.errors.departmentName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.departmentName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.phoneNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Business Verticle</InputLabel>
                  <Select
                    error={Boolean(formik.touched.businessVertical && formik.errors.businessVertical)}
                    value={formik.values.businessVertical}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="businessVertical"
                    onChange={formik.handleChange}
                    label="Select"
                    placeholder="Select"
                  >
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
                {formik.touched.businessVertical && formik.errors.businessVertical && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.businessVertical}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.rfqDescription && formik.errors.rfqDescription)}
                  name="rfqDescription"
                  value={formik.values.rfqDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="RFQ Description"
                  variant="outlined"
                />
                {formik.touched.rfqDescription && formik.errors.rfqDescription && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.rfqDescription}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.status && formik.errors.status)}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {statusOpt.map((item) => (
                      <MenuItem value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.status}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Button variant="contained" style={{ float: 'right', margin: '2rem' }} type="submit">
              Save
            </Button>
          </form>
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
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.date && formik.errors.date)}
                  fullWidth
                  type="date"
                  variant="outlined"
                  name="date"
                  className="w-100"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.date && formik.errors.date && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.date}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth error={Boolean(formik.touched.Source && formik.errors.Source)}>
                  <InputLabel id="demo-simple-select-label">Source</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    name="Source"
                    value={formik.values.Source}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={'website'}>Website</MenuItem>
                    <MenuItem value={'Expo'}>Expo</MenuItem>
                    <MenuItem value={'Reference'}>Reference</MenuItem>
                    <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                    <MenuItem value={'others'}>Others</MenuItem>
                  </Select>
                  {formik.touched.Source && formik.errors.Source && (
                    <FormHelperText error id="standard-weight-helper-text-Password-login">
                      {formik.errors.Source}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.Pilot && formik.errors.Pilot)}
                  name="Pilot"
                  value={formik.values.Pilot}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Pilot"
                  variant="outlined"
                />
                {formik.touched.Pilot && formik.errors.Pilot && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.Pilot}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.companyName && formik.errors.companyName)}
                  name="companyName"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                />
                {formik.touched.companyName && formik.errors.companyName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.companyName}
                  </FormHelperText>
                )}
              </Grid>{' '}
              <Grid xs={4} p={2}>
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                    <MenuItem value={'website'}>Website</MenuItem>
                    <MenuItem value={'Expo'}>Expo</MenuItem>
                    <MenuItem value={'Reference'}>Reference</MenuItem>
                    <MenuItem value={'coldcalls'}>Cold Calls</MenuItem>
                    <MenuItem value={'others'}>Others</MenuItem>
                  </Select>
                </FormControl> */}
                {showSelect ? (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      error={Boolean(formik.touched.category && formik.errors.category)}
                      value={selectedOption}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      name="category"
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
                    {formik.touched.category && formik.errors.category && (
                      <FormHelperText error id="standard-weight-helper-text-Password-login">
                        {formik.errors.category}
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
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.contactName && formik.errors.contactName)}
                  name="contactName"
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Contact Name"
                  variant="outlined"
                />
                {formik.touched.contactName && formik.errors.contactName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.contactName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.departmentName && formik.errors.departmentName)}
                  name="departmentName"
                  value={formik.values.departmentName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Department"
                  variant="outlined"
                />
                {formik.touched.departmentName && formik.errors.departmentName && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.departmentName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.phoneNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Business Verticle</InputLabel>
                  <Select
                    error={Boolean(formik.touched.businessVertical && formik.errors.businessVertical)}
                    value={formik.values.businessVertical}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="businessVertical"
                    onChange={formik.handleChange}
                    label="Select"
                    placeholder="Select"
                  >
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
                {formik.touched.businessVertical && formik.errors.businessVertical && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.businessVertical}
                  </FormHelperText>
                )}
              </Grid>
              {filteredStatusArray[0] === 'TCO Submitted' ? (
                <Grid xs={4} p={2}>
                  tco
                </Grid>
              ) : null}
            </Grid>
            {/* <Divider /> */}
            <Box p={2} className="edit-table-container">
              <MaterialReactTable table={editableForHistory} />
            </Box>
            <Box p={2} className="edit-table-container">
              <MaterialReactTable table={editableForTask} />
            </Box>
            <Button variant="contained" type="submit" style={{ float: 'right', margin: '2rem' }}>
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
              <Grid xs={3} p={2}>
                <label className="text-muted">Date</label>
                <p>{rfqSummary?.date}</p>
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
                      {rfqSummary?.rfqDescription.map((item) => (
                        <TimelineItem>
                          <TimelineOppositeContent style={{ display: 'none' }}></TimelineOppositeContent>
                          <TimelineSeparator>
                            <Tooltip title="New RFQ" placement="top" arrow>
                              <TimelineDot color="secondary">
                                {item.statusRequest === 'New RFQ' && <PersonAdd />}
                                {item.statusRequest === 'Contact Establish' && <ConnectWithoutContact />}
                                {item.statusRequest === 'Technicle Meeting' && <Group />}
                                {item.statusRequest === 'Hold' && <NotStarted />}
                                {item.statusRequest === 'Reject' && <ThumbDown />}
                                {item.statusRequest === 'Conform' && <ThumbUpSharp />}
                              </TimelineDot>
                            </Tooltip>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography variant="h6" component="span" className="text-muted">
                              {item.date}
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
                            <p className="text-muted-light m-0 text-end">Assigned Date : &nbsp; {data?.assignedDate}</p>
                            <p className="text-muted-light m-0 text-end">Target Date : &nbsp; {data?.targetDate}</p>
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
            <div className="bg-red rounded ">
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
export default BusinessRFQ;
 