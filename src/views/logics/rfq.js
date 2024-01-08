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
  Autocomplete,
  createFilterOptions
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
  CurrencyExchange,
  VisibilityRounded,
  VisibilityTwoTone,
  SaveTwoTone,
  CurrencyRupee,
  EuroTwoTone,
  AttachMoney
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
  LEAD_GET_BY_CODE,
  PROFILES_GET,
  RFQ_CREATION,
  RFQ_DELETE,
  RFQ_GET,
  RFQ_GET_BY_LOST,
  RFQ_GET_BY_PENDINGS,
  RFQ_GET_ID,
  RFQ_UPDATE,
  TCO_NUMBER
} from 'api/apiEndPoint';
import { LEAD_CREATION, LEAD_DELETE, LEAD_GET, LEAD_GET_ID, LEAD_UPDATE } from 'api/apiEndPoint';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
  columnHelper.accessor('leadNumber', {
    header: 'Lead Number',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">{row.original.leadNumber !== 'New RFQ' ? <p>{row.original.leadNumber}</p> : <p>New RFQ</p>}</Box>
    )
  }),

  columnHelper.accessor('date', {
    header: 'Date',
    Cell: ({ row }) => (
      <Box component="span">
        {row.original && row.original.date && typeof row.original.date === 'string' && row.original.date.length >= 10 ? (
          <p>{row.original.date?.slice(0, 10)}</p>
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
  columnHelper.accessor('tcoNumber', {
    header: 'TCO Number'
  }),
  columnHelper.accessor('rfqDescription', {
    header: 'RFQ Description',
    filterFn: (row, id, filterValue) => {
      const descriptions = row.original.rfqDescription.map((desc) => desc.description.toLowerCase());
      return descriptions.some((desc) => desc.includes(filterValue.toLowerCase()));
    },
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">{row.original.rfqDescription.length > 0 && <p>{row.original.rfqDescription[0]?.description}</p>}</Box>
    )
  }),
  columnHelper.accessor('statusRequest', {
    header: 'Status Request',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        {row.original.rfqDescription.length > 0 && (
          <p>{row.original.rfqDescription[row.original.rfqDescription.length - 1]?.statusRequest}&nbsp;</p>
        )}
      </Box>
    ),
    filterFn: (row, id, filterValue) => {
      const lastStatus =
        row.original.rfqDescription.length > 0
          ? row.original.rfqDescription[row.original.rfqDescription.length - 1]?.statusRequest.toLowerCase()
          : '';
      return lastStatus.startsWith(filterValue);
    }
  }),
  columnHelper.accessor('status', {
    header: 'Approval Status',
    Cell: ({ renderedCellValue, row }) => (
      <Box component="span">
        {row.original.rfqDescription.length > 0 && <p>{row.original.rfqDescription[row.original.rfqDescription.length - 1]?.status}</p>}
      </Box>
    ),
    filterFn: (row, id, filterValue) => {
      const lastStatus =
        row.original.rfqDescription.length > 0
          ? row.original.rfqDescription[row.original.rfqDescription.length - 1]?.status.toLowerCase()
          : '';
      return lastStatus.startsWith(filterValue);
    }
  })
];
const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
const optionsForHistoryStatus = [
  'New RFQ',
  'Technical Meet Done',
  'TCO Submitted',
  'NDA Submitted',
  'Negotiation',
  'Business Award',
  'Lost'
]; //
const optionsForTaskStatus = ['In Backlog'];

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
  const [tcoNumberView, setTcoNumberView] = useState(false);
  const [tcoRFQNumber, setTCORFQNumber] = useState('');
  const handleChangeStatus = (e) => {
    console.log(e.target.value, 'eeee');
  };
  const coumnsForHistory = [
    {
      accessorKey: 'date',
      header: 'Date',
      enableEditing: true,
      muiEditTextFieldProps: {
        type: 'date',
        required: true
      },
      Cell: ({ renderedCellValue, row }) => (
        <Box component="span">
          <p>{row.original.date?.slice(0, 10)}</p>
        </Box>
      )
    },
    {
      accessorKey: 'description',
      header: 'History Content',
      enableEditing: true
    },
    {
      accessorKey: 'statusRequest',
      header: 'Request Status',
      editVariant: 'select',
      editSelectOptions: optionsForHistoryStatus,
      muiEditTextFieldProps: {
        select: true,
        onChange: (e) => handleChangeStatus(e)
      },
      enableEditing: true
    },
    {
      accessorKey: 'createdBy',
      header: 'Created By',
      enableEditing: false
    }
  ];
  const [historyTableColumns, setHistoryTableColumns] = useState(coumnsForHistory);
  const [profilesData, setProfilesData] = useState([]);
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
          <p>{row.original.assignedDate?.slice(0, 10)}</p>
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
          <p>{row.original.targetDate?.slice(0, 10)}</p>
        </Box>
      )
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
  const [leadSummary, setLeadSummary] = useState('');
  const [leadView, setLeadView] = useState(false);
  const [rfqData, setrfqData] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [isFilter, setIsFilter] = useState('Overall RFQ');
  const handleFilter = (e) => {
    setIsFilter(e.target.value);
  };
  const [updateId, setUpdateId] = useState('');
  const [updatedValue, setUpdatedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [showSelect, setShowSelect] = useState(true);
  const [customOption, setCustomOption] = useState('');
  const [category, setCategory] = useState([]);
  const [lNumber, setlNumber] = useState('');
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

  const [leadData, setLeadData] = useState([]);

  const leadNumber = leadData.map((item) => ({
    label: item.serialNumber + '  ' + item.companyName,
    value: item._id
  }));

  console.log(leadData, 'leads');
  const handleSelectChange = async (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value, 'dATA');
    const endpoint = LEAD_GET_ID(event.target.value);
    const fetchedLead = await fetchData(endpoint, localData?.accessToken);
    console.log(fetchedLead, 'ffff');
    setSelectedLead(fetchedLead?.data);
    const value = fetchedLead?.data;
    console.log(value.leadDescription[value.leadDescription.length - 1]?.statusRequest, '<----------123123');
    setSelectedOption(value.category);
    formik.setValues({
      date: value?.date?.slice(0, 10),
      Source: value.Source,
      leadNumber: value.serialNumber,
      Pilot: value.Pilot,
      companyName: value.companyName,
      category: value.category,
      contactName: value.contactName,
      departmentName: value.departmentName,
      phoneNumber: value.phoneNumber,
      email: value.email,
      tcoNumber: value.tcoNumber,
      approximateValue: value.approximateValue,
      businessVertical: value.businessVertical,
      rfqDescription: value.leadDescription[value.leadDescription.length - 1]?.description,
      status: null
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
    // Process the lead data
    const processedLeadData = rfqData.map((lead) => {
      const { _id, __v, rfqDescription, tasks, ...rest } = lead;

      // Extract the first object from rfqDescription
      const firstRfqDescription = rfqDescription.length > 0 ? rfqDescription[0] : {};

      // Find the last "Approval" status in rfqDescription
      const lastApprovalStatus = rfqDescription.filter((item) => item.status === 'Approval').pop();

      // Add separate columns for description, lastApprovalStatusRequest, and lastApprovalStatus
      const processedLead = {
        ...rest,
        RFQDescription: firstRfqDescription.description || '',
        lastApprovalStatus: lastApprovalStatus ? lastApprovalStatus.statusRequest + lastApprovalStatus?.status : ''
      };

      return processedLead;
    });

    // Use the processed data to generate and download the CSV
    const csv = generateCsv(csvConfig)(processedLeadData);
    download(csvConfig)(csv);
  };

  const populateFormFields = (rfqData) => {
    console.log(rfqData, 'populateFormFields');
    formik.setValues({
      date: rfqData?.date?.slice(0, 10),
      Source: rfqData.Source,
      Pilot: rfqData.Pilot,
      companyName: rfqData.companyName,
      category: rfqData.category,
      currency: rfqData?.currency,
      leadNumber: rfqData?.leadNumber,
      contactName: rfqData.contactName,
      departmentName: rfqData.departmentName,
      phoneNumber: rfqData.phoneNumber,
      email: rfqData.email,
      tcoNumber: rfqData.tcoNumber,
      approximateValue: rfqData.approximateValue,
      businessVertical: rfqData.businessVertical // ... Other fields
      // ...populate other fields
    });
  };
  const [description, setDescription] = useState('');

  const handleView = async (e) => {
    console.log('worked', e);
    const endpoint = RFQ_GET_ID(e.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    setrfqSummary(getByIdData.data);
    console.log('worked', getByIdData.data);
    if (getByIdData.data?.leadNumber !== 'New RFQ') {
      setLeadView(true);
      const encodedSerialNumber = encodeURIComponent(getByIdData?.data?.leadNumber);
      const getByCodeEndpoint = LEAD_GET_BY_CODE(encodedSerialNumber);
      const getByIdCode = await fetchData(getByCodeEndpoint, localData?.accessToken);
      setLeadSummary(getByIdCode?.data);
      console.log('getByIdCode', getByIdCode);
    } else {
      setLeadView(false);
    }

    setView({
      visible: true,
      mode: 'View'
    });
  };
  const fetchFun = async () => {
    const data = await fetchData(RFQ_GET, localData?.accessToken);
    setrfqData(data.data);
  };

  function getUniqueTitles(dataArray, propertyName) {
    const uniqueTitlesSet = new Set();

    const uniqueTitles = dataArray
      .map((data) => {
        const title = data[propertyName];

        // Check if the title is already in the set
        if (!uniqueTitlesSet.has(title)) {
          // If not, add it to the set and return the object
          uniqueTitlesSet.add(title);
          return { title };
        }

        // If the title is already in the set, return null or undefined (skip duplicates)
        return null;
      })
      .filter(Boolean); // Filter out null or undefined values

    return uniqueTitles;
  }

  const pilotName = getUniqueTitles(rfqData, 'Pilot');
  const companyName = getUniqueTitles(rfqData, 'companyName');
  const contactName = getUniqueTitles(rfqData, 'contactName');

  const filter = createFilterOptions();
  const [valueForSuggest, setValueForSuggest] = React.useState(null);
  const [valueForCompany, setValueForCompany] = React.useState(null);
  const [valueForContact, setValueForContact] = React.useState(null);
  const handleUpdate = async (values) => {
    console.log('values------>', values);
    try {
      // Assuming values contain the updated data
      const updatesValues = {
        // Update fields as needed
        date: values.date,
        Source: values.Source,
        Pilot: valueForSuggest.title,
        companyName: valueForCompany.title,
        category: values.category,
        contactName: valueForContact.title,
        leadNumber: lNumber,
        departmentName: values.departmentName,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
        tcoNumber: values?.tcoNumber,
        approximateValue: values?.approximateValue,
        businessVertical: values?.businessVertical,
        rfqDescription: historyTableData,
        tasks: taskTableData
        // ...update other fields
      };

      // Make the API call to update the data
      const endpoint = RFQ_UPDATE(updateId);
      await updateData(endpoint, updatesValues, localData?.accessToken);

      // Reset the form and fetch updated data
      fetchFun();
      formik.resetForm();
      setlNumber('');
      // Optionally, set the view mode to 'Initial' or perform other actions
      setView({
        visible: true,
        mode: 'Initial'
      });
    } catch (error) {
      console.error('API error:', error);
    }
  };
  console.log(updateId, 'updateId');
  const formik = useFormik({
    initialValues: {
      date: '',
      Source: '',
      Pilot: '',
      companyName: '',
      leadNumber: '',
      category: '',
      contactName: '',
      departmentName: '',
      currency: 'INR',
      phoneNumber: '',
      isMoved: false,
      email: '',
      businessVertical: '',
      rfqDescription: [], // Initialize as an array
      tasks: [],
      tcoNumber: '',
      approximateValue: '',
      status: ''
      // Add initial values for other fields
      // ...
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('worked', values);
      try {
        if (updateId) {
          const rfqDescriptionArray = values.rfqDescription
            ? values.rfqDescription.split('\n').map((item) => ({
                date: values.date?.slice(0, 10),
                description: item.trim(),
                status: 'pending', // Set your default status here
                statusRequest: values.status // Set your default statusRequest here
              }))
            : [];
          const history = historyTableData.map((item) => ({
            date: item.date,
            description: item.description,
            statusRequest: item.statusRequest,
            status: item.status,
            createdBy: item.createdBy
          }));
          const approval = historyTableData.filter((item) => item.statusRequest === 'Business Award' && item.status === 'Approval');
          console.log(approval, 'approval');
          const task = taskTableData.map((item) => ({
            title: item.title,
            description: item.description,
            responsible: item.responsible,
            remark: item.remark,
            createdBy: item.createdBy,
            assignedDate: item.assignedDate,
            targetDate: item.targetDate,
            status: item.status
          }));
          console.log(values, 'handle update');
          const formattedData = {
            ...values,
            currency: values.currency,
            isMoved: approval.length === 1, // Set isMoved to true when approval.length is not 0,
            tcoNumber: tcoNumber || values?.tcoNumber,
            Pilot: valueForSuggest?.title || values?.Pilot,
            companyName: valueForCompany?.title || values?.companyName,
            contactName: valueForContact?.title || values?.contactName,
            rfqDescription: history,
            tasks: task
          };
          // if(approval.length ===1){
          //   toast.info(`${values.serialNumber} - RFQ Moved To Project`)
          // }
          console.log(values, 'values formed');
          console.log(formattedData, 'formed');
          console.log(rfqDescriptionArray, 'rfqDescriptionArray formed');
          const endpoint = RFQ_UPDATE(updateId);
          await updateData(endpoint, formattedData, localData?.accessToken);

          // Reset the form and fetch updated data
          fetchFun();
          formik.resetForm();
          setlNumber('');
          // Optionally, set the view mode to 'Initial' or perform other actions
          setView({
            visible: true,
            mode: 'Initial'
          });
          // handleUpdate(formattedData);
        } else {
          console.log('handle submit', values);
          const rfqDescriptionArray = values.rfqDescription
            ? values.rfqDescription.split('\n').map((item) => ({
                date: values.date?.slice(0, 10),
                description: item.trim(),
                status: 'pending', // Set your default status here
                createdBy: `${localData?.code}-${localData?.name}`,
                statusRequest: values.status // Set your default statusRequest here
              }))
            : [];
          const formattedData = {
            ...values,
            leadNumber: 'New RFQ',
            Pilot: valueForSuggest?.title,
            companyName: valueForCompany?.title,
            contactName: valueForContact?.title,
            rfqDescription: rfqDescriptionArray
          };
          console.log(formattedData, 'formattedData');
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
  const handleEdit = async (e) => {
    console.log('worked', e.original);
    setTCORFQNumber(e?.original?.serialNumber);
    const endpoint = RFQ_GET_ID(e.original._id);
    const getByIdData = await fetchData(endpoint, localData?.accessToken);
    // setUpdatedValue(getByIdData)
    setUpdateId(e.original._id);
    setSelectedOption(e.original?.category);
    setDescription(e?.original?.rfqDescription[0]?.description);
    setValueForCompany(getByIdData?.data.companyName);
    setValueForContact(getByIdData?.data.contactName);
    setValueForSuggest(getByIdData?.data.Pilot);
    console.log(getByIdData?.data, 'getby');
    setlNumber(getByIdData?.data.leadNumber);
    if (e.original?.tcoNumber) {
      setTcoNumberView(true);
      setTCONumber(e?.original?.tcoNumber);
    } else {
      setTcoNumberView(false);
      setTCONumber('');
    }
    console.log(getByIdData, 'getByIdData');
    formik.setValues({
      date: getByIdData?.data.date,
      Source: getByIdData?.data.Source,
      Pilot: getByIdData?.data.Pilot,
      leadNumber: getByIdData?.data.leadNumber,
      companyName: getByIdData?.data.companyName,
      contactName: getByIdData?.data.contactName,
      departmentName: getByIdData?.data.departmentName,
      phoneNumber: getByIdData?.data.phoneNumber,
      currency: getByIdData?.data?.currency,
      email: getByIdData?.data.email,
      tcoNumber: e.original?.tcoNumber || getByIdData?.data?.tcoNumber,
      approximateValue: getByIdData?.data?.approximateValue,
      businessVertical: getByIdData?.data.businessVertical // ... Other fields
    });
    populateFormFields(getByIdData?.data);
    // setUpdatedValue(e.original);
    setView({
      visible: true,
      mode: 'Edit'
    });
  };
  console.log(formik.values, ' getByIdData?.data');
  const table = useMaterialReactTable({
    columns,
    data: rfqData,
    enableRowActions: true,
    positionActionsColumn: 'last',
    enableColumnFilterModes: true,
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
  console.log(formik.values, 'tcoNumberView');
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
  function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
  const [tcoNumber, setTCONumber] = useState('');

  const getCurrentFinancialYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the year
    // Determine the financial year
    const financialYearStartMonth = 4; // April
    const financialYear =
      currentDate.getMonth() >= financialYearStartMonth ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;

    return financialYear;
  };
  const generateNextTCOCode = (lastTCOCode) => {
    if (!lastTCOCode || !lastTCOCode.startsWith('TCO')) {
      // If no previous TCO or doesn't follow the expected format, start from TCO0001
      const currentYear = getCurrentFinancialYear();
      return `TCO0001/${currentYear}`;
    }
    // Extract the sequence number from the last TCO code
    const lastSequenceNumber = parseInt(lastTCOCode.match(/(\d+)/)[0], 10);
    const currentYear = getCurrentFinancialYear();
    // Increment the sequence number and create the new TCO code
    const newSequenceNumber = lastSequenceNumber + 1;
    return `TCO${newSequenceNumber.toString().padStart(4, '0')}/${currentYear}`;
  };
  const handleTCOSubmission = async () => {
    try {
      // Auto-generate TCO code
      const currentYear = getCurrentFinancialYear();
      const tcoData = await fetchData(TCO_NUMBER);

      // Sort TCO data by TCO number in ascending order
      tcoData.sort((a, b) => {
        if (a.tcoNumber < b.tcoNumber) return -1;
        if (a.tcoNumber > b.tcoNumber) return 1;
        return 0;
      });
      console.log(tcoData, 'tcoData');
      const lastTCO = tcoData[tcoData.length - 1];
      const lastTCOCode = lastTCO ? lastTCO.tcoNumber : '';
      const newTCOCode = generateNextTCOCode(lastTCOCode);
      setTCONumber(newTCOCode);
      // API call to save TCO record
      await postData(TCO_NUMBER, {
        tcoNumber: newTCOCode,
        projectName: tcoRFQNumber
        // Include other fields as needed
      });

      // Other logic or feedback messages
    } catch (error) {
      console.error('Error submitting TCO:', error);
      // Handle error or show error message
    }
  };

  // Function to generate the next TCO code

  const handleCreateRowHistory = (newData) => {
    const tempId = generateTempId(); // Generate a temporary ID
    const newTask = { ...newData.values, _id: tempId, createdBy: `${localData?.code}-${localData.name}` };
    // const newTask = { ...newData.values, _id: tempId, date: getCurrentDate(), createdBy: `${localData?.code}-${localData.name}` };
    setHistoryTableData([...historyTableData, newTask]);
    setIsCreatingRow(false);
    if (newData?.values?.statusRequest === 'TCO Submitted' && newData?.values?.status === 'Approval') {
      handleTCOSubmission();
      setTcoNumberView(true);
      // toast.info('Enter the Approximate value of the Project');
    } else {
      setTcoNumberView(false);
    }
    console.log(newData.values, '...newData.values');
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
  console.log(formik.values, 'changed');
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [rfqFrom, setRfqFrom] = useState('');
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setRfqFrom(selectedValue);
    setShowAdditionalInput(selectedValue === 'rfqfromlead');
    if (selectedValue === 'createnewrfq') {
      formik.resetForm();
      setSelectedOption('');
    }
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
    setUpdateId('');
    setShowSelect(true);
    setValueForCompany('');

    setValueForContact('');
    setValueForSuggest('');
    setSelectedOption('');
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
          try {
            let profilesApiEndpoint;
            switch (isFilter) {
              case 'Overall RFQ':
                profilesApiEndpoint = RFQ_GET;
                break;
              case 'Lost RFQ':
                profilesApiEndpoint = RFQ_GET_BY_LOST;
                break;
              case 'Waiting For Approvals':
                profilesApiEndpoint = RFQ_GET_BY_PENDINGS;
                break;
              default:
                // Handle default case
                break;
            }
            const data = await fetchData(profilesApiEndpoint, parsedData?.accessToken);
            setrfqData(data.data);
            console.log(data.data, 'fetched using db');
            const response = await fetchData(LEAD_GET, parsedData?.accessToken);
            setLeadData(response?.data);

            // Fetch leads data
            const categoryData = await fetchData(CATEGORY_GET);
            setCategory(categoryData);
            console.log(categoryData, 'fetched using categoryData db');

            const data4Employee = await fetchData(PROFILES_GET, parsedData?.accessToken);
            console.log(data, 'parsedddd');
            setProfilesData(data4Employee?.data);
            // Fetch updateId data
            if (updateId) {
              const endPointId = RFQ_GET_ID(updateId);
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
          } catch (error) {
            console.error('Error in fetchDataAndUpdate:', error);
          }
        }
      } catch (error) {
        console.error('Error in fetchDataAndUpdate:', error);
      }
    };

    fetchDataAndUpdate(); // Invoke the async function
  }, [updateId, isFilter]); // Add dependencies if needed

  useEffect(() => {
    console.log(localData, 'localData');
    // const response = await fetchData(LEAD_GET, localData?.accessToken);
  }, []);
  console.log(formik.values, 'red');
  const statusFilter = historyTableData.map((item) => item.statusRequest);
  return (
    <div className="max">
      {view.mode === 'Initial' && (
        <MainCard
          title={isFilter}
          secondary={
            <div className="d-flex">
              <Box
                sx={{
                  ml: 2,
                  // mr: 3,
                  [theme.breakpoints.down('md')]: {
                    mr: 2
                  }
                }}
              >
                <ButtonBase>
                  <div class="select-dropdown">
                    <select onChange={handleFilter}>
                      <option value="Overall RFQ">Overall RFQ</option>
                      <option value="Lost RFQ">Lost RFQ</option>
                      <option value="Waiting For Approvals">Waiting For Approvals</option>
                    </select>
                  </div>
                </ButtonBase>
              </Box>
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
            </div>
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
              <Grid xs={4} p={2}>
                <TextField
                  error={Boolean(formik.touched.date && formik.errors.date)}
                  fullWidth
                  type="date"
                  variant="outlined"
                  name="date"
                  className="w-100"
                  // date={formik.values.date}
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
                    <MenuItem value={'Website'}>Website</MenuItem>
                    <MenuItem value={'Expo'}>Expo</MenuItem>
                    <MenuItem value={'Reference'}>Reference</MenuItem>
                    <MenuItem value={'Cold Calls'}>Cold Calls</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
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
                    const { inputValue } = params;

                    // Check if the input value is an exact match for any existing option
                    const isExisting = options.some((option) => inputValue === option.title);

                    if (inputValue !== '' && !isExisting) {
                      // If the input value is not an exact match, create a new option
                      return [
                        ...options,
                        {
                          inputValue,
                          title: `Add "${inputValue}"`
                        }
                      ];
                    }

                    // If the input value is an exact match, just return the existing options
                    return options;
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
                      <Button onClick={handleSaveCustomOption}>
                        <SaveTwoTone />
                      </Button>
                      <Button onClick={() => setShowSelect(true)}>
                        <DeleteTwoTone />
                      </Button>
                    </div>
                  </>
                )}
              </Grid>
              <Grid xs={4} p={2}>
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
                    <MenuItem value={'TDBM'}>TDBM - Tear Down</MenuItem>
                    <MenuItem value={'Testing'}>Testing</MenuItem>
                    <MenuItem value={'Software'}>Software</MenuItem>
                    <MenuItem value={'Import'}>Import</MenuItem>
                    <MenuItem value={'Export'}>Export</MenuItem>
                    <MenuItem value={'Simulation'}>Simulation</MenuItem>
                    <MenuItem value={'Vehicle Rental'}>Vehicle Rental</MenuItem>
                    <MenuItem value={'Procurement'}>Procurement</MenuItem>
                    <MenuItem value={'Scanning & Modeling'}>Scanning / Modeling</MenuItem>
                    <MenuItem value={'HR'}>Human Resource</MenuItem>
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
                  disabled
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
                    disabled
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
                  name="leadNumber"
                  value={formik.values.leadNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  id="outlined-basic"
                  disabled
                  label="Lead Number"
                  variant="outlined"
                />
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
                    const { inputValue } = params;

                    // Check if the input value is an exact match for any existing option
                    const isExisting = options.some((option) => inputValue === option.title);

                    if (inputValue !== '' && !isExisting) {
                      // If the input value is not an exact match, create a new option
                      return [
                        ...options,
                        {
                          inputValue,
                          title: `Add "${inputValue}"`
                        }
                      ];
                    }

                    // If the input value is an exact match, just return the existing options
                    return options;
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
                  renderInput={(params) => <TextField {...params} label="Pilot" disabled />}
                />
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
                      <Button onClick={handleSaveCustomOption}>
                        <SaveTwoTone />
                      </Button>
                      <Button onClick={() => setShowSelect(true)}>
                        <DeleteTwoTone />
                      </Button>{' '}
                    </div>
                  </>
                )}
              </Grid>
              <Grid xs={4} p={2}>
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
                    <MenuItem value={'TDBM'}>TDBM - Tear Down</MenuItem>
                    <MenuItem value={'Testing'}>Testing</MenuItem>
                    <MenuItem value={'Software'}>Software</MenuItem>
                    <MenuItem value={'Import'}>Import</MenuItem>
                    <MenuItem value={'Export'}>Export</MenuItem>
                    <MenuItem value={'Simulation'}>Simulation</MenuItem>
                    <MenuItem value={'Vehicle Rental'}>Vehicle Rental</MenuItem>
                    <MenuItem value={'Procurement'}>Procurement</MenuItem>
                    <MenuItem value={'Scanning & Modeling'}>Scanning / Modeling</MenuItem>
                    <MenuItem value={'HR'}>Human Resource</MenuItem>
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
                  // name="departmentName"
                  value={description}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  fullWidth
                  disabled
                  id="outlined-basic"
                  label="Initial Description"
                  variant="outlined"
                />
              </Grid>
              {tcoNumberView && (
                <Grid xs={4} p={2}>
                  <TextField
                    type="text"
                    name="tcoNumber"
                    value={tcoNumber}
                    onChange={formik.handleChange}
                    fullWidth
                    id="outlined-basic"
                    label="TCO Number"
                    variant="outlined"
                  />
                </Grid>
              )}
              {tcoNumberView && (
                <Grid xs={4} p={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type Of Currency</InputLabel>
                    <Select
                      error={Boolean(formik.touched.currency && formik.errors.currency)}
                      value={formik.values.currency}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      name="currency"
                      onChange={formik.handleChange}
                      label="Select"
                      placeholder="Select"
                    >
                      <MenuItem value="INR" className="d-flex align-items-center">
                        <CurrencyRupee className="fs-1" /> - INR
                      </MenuItem>
                      <MenuItem value="USD" className="d-flex align-items-center">
                        <AttachMoney className="fs-1" /> - USD
                      </MenuItem>
                      <MenuItem value="EUR" className="d-flex align-items-center">
                        <EuroTwoTone className="fs-1" /> - EUR
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {tcoNumberView && (
                <Grid xs={4} p={2}>
                  <TextField
                    type="text"
                    name="approximateValue"
                    value={formik.values.approximateValue}
                    onChange={formik.handleChange}
                    fullWidth
                    id="outlined-basic"
                    label="Approximate Value"
                    variant="outlined"
                  />
                </Grid>
              )}
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
          {leadView && (
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
                      {rfqSummary?.rfqDescription.map((item) => (
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
