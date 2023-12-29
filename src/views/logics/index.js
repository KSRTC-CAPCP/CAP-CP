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
  FormHelperText,
  Alert,
  createFilterOptions,
  Autocomplete
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
  SaveAltTwoTone,
  SaveAsTwoTone,
  SaveTwoTone,
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
import {
  CATEGORY_CREATE,
  CATEGORY_GET,
  LEAD_CREATION,
  LEAD_DELETE,
  LEAD_GET,
  LEAD_GET_ID,
  LEAD_UPDATE,
  PROFILES_GET,
  PROFILES_GETBY_STATUS,
  RFQ_CREATION
} from 'api/apiEndPoint';
import { useEffect } from 'react';
import { Value } from 'sass';

const columnHelper = createMRTColumnHelper();
const validationSchema = Yup.object({
  date: Yup.string().required('Date is required'),
  Source: Yup.string().required('Source is required'),
  // Pilot: Yup.string().required('Pilot is required'),
  // companyName: Yup.string().required('Company Name is required'),
  category: Yup.string().required('Category is required'),
  // contactName: Yup.string().required('Contact Name is required'),
  departmentName: Yup.string().required('Department Name is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().required('Email is required'),
  businessVertical: Yup.string().required('businessVertical is required')
  // Add validation for other fields as needed
});

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
const columns = [
  columnHelper.accessor('serialNumber', {
    header: 'Lead No',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        <p>{row.original.serialNumber}</p>
      </Box>
    )
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        <p>{row.original.date.slice(0, 10)}</p>
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
  columnHelper.accessor('remark', {
    header: 'Remark'
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
  columnHelper.accessor('leaddescription', {
    header: 'Lead Description',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        {row.original.leadDescription.length > 0 && (
          <p>{row.original.leadDescription[row.original.leadDescription.length - 1].description}</p>
        )}
      </Box>
    )
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        {row.original.leadDescription.length > 0 && (
          <p>
            {row.original.leadDescription[row.original.leadDescription.length - 1].statusRequest}&nbsp;
            {row.original.leadDescription[row.original.leadDescription.length - 1].status}
          </p>
        )}
      </Box>
    )
  })
];
const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
const optionsForHistoryStatus = ['newlead', 'Contact Establish', 'Technicle Meeting', 'Hold', 'Reject', 'Move to RFQ']; //
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

const BusinessLeads = () => {
  const [localData, setLocalData] = useState('');
  const [moveRFQ, setMoveRFQ] = useState(false);
  const [stsReq, setStsReq] = useState([]);
  const [profilesData, setProfilesData] = useState([]);
  const [maxDateHistory, setMaxDateHistory] = useState('');
  const [historyTableData, setHistoryTableData] = useState([]);
  const getMaxDate = () => {
    const dateStrings = historyTableData?.map((item) => item?.date);
    const dateObjects = dateStrings.map((dateString) => new Date(dateString)).filter((dateObject) => !isNaN(dateObject.getTime()));
    const maxDate = new Date(Math.max.apply(null, dateObjects));
    return `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1).toString().padStart(2, '0')}-${maxDate
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };
  useEffect(() => {
    setMaxDateHistory(getMaxDate());
  }, [historyTableData]);
  console.log('maxDateHistory in Cell:', maxDateHistory);
  const coumnsForHistory = [
    {
      accessorKey: 'date',
      header: 'Date',
      muiEditTextFieldProps: {
        type: 'date',
        required: true,
        minDate: new Date(maxDateHistory).toString()
        // maxDate :new Date(maxDateHistory).toString()
      },
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.date.slice(0, 10)}</p>
          {/* <input type="date" min="2019-06-02" max="2019-06-08"/> */}
        </Box>
      )
    },
    {
      accessorKey: 'description',
      header: 'Lead Description',
      enableEditing: true
    },
    {
      accessorKey: 'statusRequest',
      header: 'Request Status',
      editVariant: 'select',
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>
            {row.original.statusRequest}&nbsp;{row.original.status}
          </p>
        </Box>
      ),
      editSelectOptions: optionsForHistoryStatus,
      muiEditTextFieldProps: {
        select: true,
        onChange: (e) => handleStsReq(e)
      },
      enableEditing: true
    }
  ];
  const [historyTableColumns, setHistoryTableColumns] = useState(coumnsForHistory);

  console.log(stsReq, 'moveRFQ');

  // const formattedDate = maxDate.toISOString().split('T')[0];
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
      editVariant: 'select',
      editSelectOptions: profilesData.map((item) => item.EmployeeCode + '-' + item.NameOfCandidate),
      muiEditTextFieldProps: {
        select: true
      },
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
          <p>{row.original.assignedDate.slice(0, 10)}</p>
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
          <p>{row.original.targetDate.slice(0, 10)}</p>
        </Box>
      )
    },
  ];
  const [inputValue, setInputValue] = useState('');
  const [leadSummary, setLeadSummary] = useState('');
  const [leadData, setLeadData] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [category, setCategory] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [updatedValue, setUpdatedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [leadNumber, setleadNumber] = useState('');
  const [showSelect, setShowSelect] = useState(true);
  const [customOption, setCustomOption] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const generateTempId = () => `temp_${Math.random().toString(36).substr(2, 9)}`;
  const [taskTableData, setTaskTableData] = useState([]);
  const [isCreatingRow, setIsCreatingRow] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
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
    if (customOption.trim() !== '') {
      if (selectedOption === 'addMore') {
        // If "Add More Option" is selected, set selectedOption to the customOption value
        setSelectedOption(customOption);
      }

      // Save the custom option to the backend
      await postData(CATEGORY_CREATE, { name: customOption });

      // Fetch the updated category data
      const categoryData = await fetchData(CATEGORY_GET);
      setCategory(categoryData);

      // Reset the customOption state
      setCustomOption('');
      setSelectedOption('');
      // Show the select input
      setShowSelect(true);
    }
  };
  const handleRemoveCustomOption = () => {
    setShowSelect(true);
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
      const apiEndPoint = LEAD_DELETE(deleteId);
      await deleteData(apiEndPoint, localData?.accessToken);
      fetchFun();
      setOpen(false);
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const theme = useTheme();
  function getUniqueTitles(dataArray, propertyName) {
    const uniqueTitlesSet = new Set();
  
    const uniqueTitles = dataArray.map((data) => {
      const title = data[propertyName];
  
      // Check if the title is already in the set
      if (!uniqueTitlesSet.has(title)) {
        // If not, add it to the set and return the object
        uniqueTitlesSet.add(title);
        return { title };
      }
  
      // If the title is already in the set, return null or undefined (skip duplicates)
      return null;
    }).filter(Boolean); // Filter out null or undefined values
  
    return uniqueTitles;
  }
  
  const pilotName = getUniqueTitles(leadData, 'Pilot');
  const companyName = getUniqueTitles(leadData, 'companyName');
  const contactName = getUniqueTitles(leadData, 'contactName');
  
  const handleExportData = () => {
    // Process the lead data
    const processedLeadData = leadData.map((lead) => {
      const { _id, __v, leadDescription, tasks, ...rest } = lead;

      // Extract the first object from leadDescription
      const firstLeadDescription = leadDescription.length > 0 ? leadDescription[0] : {};

      // Find the last "Approval" status in leadDescription
      const lastApprovalStatus = leadDescription.filter((item) => item.status === 'Approval').pop();

      // Add separate columns for description, lastApprovalStatusRequest, and lastApprovalStatus
      const processedLead = {
        ...rest,
        leadDescriptionDescription: firstLeadDescription.description || '',
        lastApprovalStatus: lastApprovalStatus ? lastApprovalStatus.statusRequest + lastApprovalStatus?.status : ''
      };

      return processedLead;
    });

    // Use the processed data to generate and download the CSV
    const csv = generateCsv(csvConfig)(processedLeadData);
    download(csvConfig)(csv);
  };

  const populateFormFields = (leadData) => {
    console.log(leadData, 'populateFormFields');
    formik.setValues({
      date: leadData?.date?.slice(0, 10),
      Source: leadData.Source,
      Pilot: leadData.Pilot,
      companyName: leadData.companyName,
      category: leadData.category,
      contactName: leadData.contactName,
      remark: leadData.remark,
      departmentName: leadData.departmentName,
      phoneNumber: leadData.phoneNumber,
      email: leadData.email,
      businessVertical: leadData.businessVertical // ... Other fields
      // ...populate other fields
    });
  };

  const fetchFun = async () => {
    const data = await fetchData(LEAD_GET, localData?.accessToken);
    setLeadData(data.data);
  };

  console.log(moveRFQ, 'moveRFQ');
  const handleUpdate = async (values) => {
    
    try {
      // Assuming values contain the updated data
      console.log(values, 'vvvvvvvvvvv');
      const updatedData = {
        // Update fields as needed
        date: values.date,
        Source: values.Source,
        Pilot: values.Pilot,
        companyName: values.companyName,
        category: values.category,
        remark: values.remark,
        contactName: values.contactName,
        departmentName: values.departmentName,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
        businessVertical: values?.businessVertical,
        leadDescription: historyTableData,
        tasks: taskTableData
        // ...update other fields
      };
      console.log(
        updatedData?.leadDescription.filter((item) => item.statusRequest === 'Move to RFQ' && item.status === 'Approval'),
        '00000'
      ); // Make the API call to update the data
      const approval = updatedData?.leadDescription.filter((item) => item.statusRequest === 'Move to RFQ' && item.status === 'Approval');
      if (approval.length !== 0) {
        const leadDescriptionArray = values.leadDescription
          ? values.leadDescription.split('\n').map((item) => ({
              description: item.trim()
            }))
          : [];
        const newRfq = {
          date: values.date,
          Source: values.Source,
          Pilot: values.Pilot,
          leadNumber: values?.serialNumber,
          companyName: values.companyName,
          category: values.category,
          remark: values.remark,
          contactName: values.contactName,
          departmentName: values.departmentName,
          phoneNumber: values.departmentName,
          email: values.email,
          businessVertical: values.businessVertical,
          leadDescription: leadDescriptionArray
        };

        const moveToRfq = await postData(RFQ_CREATION, newRfq, localData?.accessToken);
        console.log(moveToRfq, 'movetorfq');
      }
      const endpoint = LEAD_UPDATE(updateId);
      await updateData(endpoint, updatedData, localData?.accessToken);
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

  console.log(moveRFQ, 'moverfq');
  const filter = createFilterOptions();
  const [valueForSuggest, setValueForSuggest] = React.useState(null);
  const [valueForCompany, setValueForCompany] = React.useState(null);
  const [valueForContact, setValueForContact] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      date: '',
      Source: '',
      Pilot: '',
      companyName: '',
      category: '',
      contactName: '',
      serialNumber: '',
      departmentName: '',
      remark: '',
      phoneNumber: '',
      email: '',
      businessVertical: '',
      leadDescription: [], // Initialize as an array
      tasks: [],
      status: ''
      // Add initial values for other fields
      // ...
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('worked', values);
      try {
        if (updateId) {
          console.log('handle update', updateId);
          const formattedData = {
            ...values,
            serialNumber: leadNumber,
            Pilot: valueForSuggest?.title || values?.Pilot,
            companyName: valueForCompany?.title || values?.companyName,
            contactName: valueForContact?.title || values?.contactName
          };

          handleUpdate(formattedData);
        } else {
          console.log('handle submit');
          console.log(values, 'sts');
          // Create leadDescription array from leadDescription field
          const leadDescriptionArray = values.leadDescription
            ? values.leadDescription.split('\n').map((item) => ({
                date: values?.date,
                description: item.trim(),
                status: 'pending', // Set your default status here
                statusRequest: values.status // Set your default statusRequest here
              }))
            : [];

          const formattedData = {
            ...values,
            Pilot: valueForSuggest?.title,
            companyName: valueForCompany?.title,
            contactName: valueForContact?.title,
            leadDescription: leadDescriptionArray
          };

          await postData(LEAD_CREATION, formattedData, localData?.accessToken);
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
    data: leadData,
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
  console.log('valueForSuggest', valueForSuggest);
  const handleEdit = async (e) => {
    console.log('worked', e.original._id);
    const endpoint = LEAD_GET_ID(e.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    // setUpdatedValue(getByIdData)
    setUpdateId(e.original._id);
    setCustomOption(getByIdData?.category);
    // console.log(getByIdData?.data, 'getby');
    const value = getByIdData?.data;
    setleadNumber(value?.serialNumber);
    setSelectedOption(value?.category);
    formik.setValues({
      date: value?.date?.slice(0, 10),
      Source: value?.Source,
      Pilot: value?.Pilot,
      companyName: value?.companyName,
      serialNumber: value?.serialNumber,
      remark: value?.remark,
      // category: value?.category,
      contactName: value?.contactName,
      departmentName: value?.departmentName,
      phoneNumber: value?.phoneNumber,
      email: value?.email,
      businessVertical: value?.businessVertical // ... Other fields
    });
    console.log(value, 'value');
    const categoryOption = value?.leadDescription
      ?.map((data) => ({
        stsRequest: data.statusRequest
      }))
      .filter((item) => item.stsRequest === 'Move to RFQ');
    // if (categoryOption[0]?.stsRequest === 'Move to RFQ') {
    //   setStsReq(categoryOption[0]?.stsRequest);
    // } else {
    //   setStsReq(null);
    // }
    console.log(categoryOption[0]?.stsRequest, 'categoryOption');
    // if(value?.leadDescription)
    // setStsReq()
    populateFormFields(value);
    // setUpdatedValue(e.original);
    setView({
      visible: true,
      mode: 'Edit'
    });
  };
  const handleView = async (e) => {
    console.log('worked', localData, e.original._id);
    // setLeadSummary(e.original._id);
    const endpoint = LEAD_GET_ID(e.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    setLeadSummary(getByIdData.data);
    console.log('worked', getByIdData.data);

    setView({
      visible: true,
      mode: 'View'
    });
  };

  const handleStsReq = (e) => {
    //emp sts
    if (e.target.value === 'Move to RFQ') {
      setStsReq(e.target.value);
    } else {
      setStsReq(null);
    }
  };

  console.log(stsReq, 'sts hereeeeeeeee');
  const handleStatusChange = (e) => {
    console.log(e);
  };
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
    setEditingRowId(null);
    setTaskTableData(updatedData);
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
    data: historyTableData, // Provide an empty array if leadDescription is undefined
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
      <Box sx={{ display: 'none', gap: '1rem' }}>
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
    data: taskTableData, // Provide an empty array if leadDescription is undefined
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
      <Box sx={{ display: 'none', gap: '1rem' }}>
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
    setUpdateId('');
    setSelectedOption('');
    setValueForSuggest('');
    setValueForCompany('');
    setValueForContact('');
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
        setLocalData(JSON.parse(localStore));

        if (localStore) {
          const parsedData = JSON.parse(localStore);

          // Fetch leads data
          const data = await fetchData(LEAD_GET, parsedData?.accessToken);
          setLeadData(data.data);
          console.log(data.data, 'fetched');
          // Fetch leads data
          const categoryData = await fetchData(CATEGORY_GET);
          setCategory(categoryData);
          console.log(categoryData, 'fetched using categoryData db');

          const data4Employee = await fetchData(PROFILES_GETBY_STATUS('active'), parsedData?.accessToken);
          console.log(data, 'parsedddd');
          setProfilesData(data4Employee?.data);
          // Fetch updateId data
          if (updateId) {
            const endPointId = LEAD_GET_ID(updateId);
            const fetchUpdateId = await fetchData(endPointId, parsedData?.accessToken);
            setUpdatedValue(fetchUpdateId);
            setTaskTableData(fetchUpdateId?.data?.tasks);

            // Check if the user has the "Admin" role
            console.log(parsedData?.Roles, 'who?');
            if (parsedData?.role === 'Admin') {
              // Include the "Approval Status" column for Admin
              setHistoryTableColumns([
                ...coumnsForHistory,
                {
                  accessorKey: 'status',
                  header: 'Approval Status',
                  editVariant: 'select',
                  editSelectOptions: optionsForHistoryApproval,
                  muiEditTextFieldProps: {
                    select: true,
                    onChange: (e) => handleStatusChange(e)
                  },
                  enableEditing: true
                }
              ]);
            } else {
              // Exclude the "Approval Status" column for non-Admin users
              setHistoryTableColumns([...coumnsForHistory.filter((col) => col.accessorKey !== 'status')]);
            }

            setHistoryTableData(fetchUpdateId?.data?.leadDescription);
            console.log(fetchUpdateId, 'fetched updateId');
          }
        }
      } catch (error) {
        console.error('Error in fetchDataAndUpdate:', error);
      }
    };

    fetchDataAndUpdate(); // Invoke the async function
  }, [updateId]); // Add dependencies if needed
  // useEffect(() => {
  //   const formattedDate = getMaxDate(historyTableData);
  //   console.log('maxDate', formattedDate);
  //   setmaxDateHistory(formattedDate);
  // }, [historyTableData]); // Ensure that historyTableData is the correct dependency

  console.log(maxDateHistory, 'red');
  return (
    <div className="max">
      {view.mode === 'Initial' && (
        <MainCard
          title="Leads"
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
          title="Leads Creation"
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
                <Autocomplete
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
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="fxt-demo"
                  options={pilotName}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Pilot" />}
                />

                {/* <TextField
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
                )} */}
              </Grid>
              <Grid xs={4} p={2}>
                {/* <TextField
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
                )} */}
                <Autocomplete
                  value={valueForCompany}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValueForCompany({
                        title: newValue
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValueForCompany({
                        title: newValue.inputValue
                      });
                    } else {
                      setValueForCompany(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="fxt-demo"
                  options={companyName}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="CompanyName" />}
                />
              </Grid>{' '}
              <Grid xs={4} p={2}>
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
                      <Button onClick={handleSaveCustomOption} className="MuiOutlinedInput-root">
                        <SaveTwoTone />
                      </Button>
                      <Button onClick={handleRemoveCustomOption}>
                        <DeleteTwoTone />
                      </Button>
                    </div>
                  </>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                {/* <TextField
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
                )} */}
                <Autocomplete
                  value={valueForContact}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValueForContact({
                        title: newValue
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValueForContact({
                        title: newValue.inputValue
                      });
                    } else {
                      setValueForContact(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="fxt-demo"
                  options={contactName}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Contact Name" />}
                />
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
                    <MenuItem value={'teardown'}>TDBM - Tear Down</MenuItem>
                    <MenuItem value={'Testing'}>Testing</MenuItem>
                    <MenuItem value={'software'}>Software</MenuItem>
                    <MenuItem value={'import'}>Import</MenuItem>
                    <MenuItem value={'vehicleRental'}>Vehicle Rental</MenuItem>
                    <MenuItem value={'procurement'}>Procurement</MenuItem>
                    <MenuItem value={'scanning&modeling'}>Scanning / Modeling</MenuItem>
                    <MenuItem value={'hr'}>Human Resource</MenuItem>
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
                  error={Boolean(formik.touched.leadDescription && formik.errors.leadDescription)}
                  name="leadDescription"
                  value={formik.values.leadDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Lead Description"
                  variant="outlined"
                />
                {formik.touched.leadDescription && formik.errors.leadDescription && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.leadDescription}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.remark && formik.errors.remark)}
                  name="remark"
                  value={formik.values.remark}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  label="Remark"
                  variant="outlined"
                />
                {formik.touched.remark && formik.errors.remark && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.remark}
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    error={Boolean(formik.touched.status && formik.errors.status)}
                    value={formik.values.status}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="status"
                    onChange={formik.handleChange}
                    label="Select"
                    placeholder="Select"
                  >
                    <MenuItem value={'newlead'}>New Lead</MenuItem>
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
          title="Leads Updations"
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
                {/* <TextField
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
                )} */}
                <Autocomplete
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
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  fullWidth
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={pilotName}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Pilot" fullWidth />}
                />
              </Grid>
              <Grid xs={4} p={2}>
                <Autocomplete
                  value={valueForCompany}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValueForCompany({
                        title: newValue
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValueForCompany({
                        title: newValue.inputValue
                      });
                    } else {
                      setValueForCompany(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="fxt-demo"
                  options={companyName}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="CompanyName" />}
                />
                {/* <TextField
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
                )} */}
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
                      <Button onClick={handleSaveCustomOption} className="MuiOutlinedInput-root">
                        <SaveTwoTone />
                      </Button>
                      <Button onClick={handleRemoveCustomOption}>
                        <DeleteTwoTone />
                      </Button>
                    </div>
                  </>
                )}
              </Grid>
              <Grid xs={4} p={2}>
                {/* <TextField
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
                )} */}
                <Autocomplete
                  value={valueForContact}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValueForContact({
                        title: newValue
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValueForContact({
                        title: newValue.inputValue
                      });
                    } else {
                      setValueForContact(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="fxt-demo"
                  options={contactName}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => <li {...props}>{option.title}</li>}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Contact Name" />}
                />
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
                    <MenuItem value={'teardown'}>TDBM - Tear Down</MenuItem>
                    <MenuItem value={'Testing'}>Testing</MenuItem>
                    <MenuItem value={'software'}>Software</MenuItem>
                    <MenuItem value={'import'}>Import</MenuItem>
                    <MenuItem value={'vehicleRental'}>Vehicle Rental</MenuItem>
                    <MenuItem value={'procurement'}>Procurement</MenuItem>
                    <MenuItem value={'scanning&modeling'}>Scanning / Modeling</MenuItem>
                    <MenuItem value={'hr'}>Human Resource</MenuItem>
                  </Select>
                </FormControl>
                {formik.touched.businessVertical && formik.errors.businessVertical && (
                  <FormHelperText error id="standard-weight-helper-text-Password-login">
                    {formik.errors.businessVertical}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            {/* <Divider /> */}
            <Box p={2} className="edit-table-container">
              <MaterialReactTable table={editableForHistory} key={maxDateHistory} />
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
                              {item.date?.slice(0, 10)}
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
                            <p className="text-muted-light m-0 text-end">Assigned Date : &nbsp; {data?.assignedDate.slice(0, 10)}</p>
                            <p className="text-muted-light m-0 text-end">Target Date : &nbsp; {data?.targetDate.slice(0, 10)}</p>
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
          <Typography variant="h3">Delete Lead</Typography>
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
export default BusinessLeads;
