
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

const columnHelper = createMRTColumnHelper();
const data = [
    {
        projectname: 'CAPCP',
        assignedDate: '27-04-2001',
        targetDate: '27-07-2001',
        percentageofeffect: '50%',
    },
    {
        projectname: 'CAPCP',
        assignedDate: '27-04-2001',
        targetDate: '27-07-2001',
        percentageofeffect: '50%',
    }
];
const columns = [
    columnHelper.accessor('projectname', {
        header: 'Project Name'
    }),
    columnHelper.accessor('assignedDate', {
        header: 'Assigned Date'
    }),
    columnHelper.accessor('targetDate', {
        header: 'Target Date'
    }),
    columnHelper.accessor('percentageofeffect', {
        header: 'Percentage Of Effect'
    }),
];
// const optionsForHistoryApproval = ['Pending', 'Approval', 'Reject'];
// const optionsForHistoryStatus = ['Contact Establish'];
// const optionsForTaskStatus = ['Not Started', 'On Going', 'Completed'];
// const coumnsForHistory = [
//   // {
//   //     accessorKey: 'NameOfCandidate',
//   //     header: 'Name Of Candidate'
//   // },
//   // {
//   //     accessorKey: 'DateOfBirth',
//   //     header: 'Date Of Borth',
//   //     muiEditTextFieldProps: {
//   //         type: 'date',
//   //         required: true
//   //     }
//   // },
//   {
//       accessorKey: ' Access',
//       header: ' Access',
//       enableEditing: true
//   },
//   {
//       accessorKey: 'requeststatus',
//       header: 'Request Status',
//       editVariant: 'select',
//       editSelectOptions: optionsForHistoryStatus,
//       muiEditTextFieldProps: {
//           select: true
//       },
//       enableEditing: true
//   },
//   {
//       accessorKey: 'approvalstatus',
//       header: 'Approval Status',
//       editVariant: 'select',
//       editSelectOptions: optionsForHistoryApproval,
//       muiEditTextFieldProps: {
//           select: true
//       },
//       enableEditing: true
//   },
//   {
//       accessorKey: 'Team',
//       header: 'Team',
//       enableEditing: true
//   },
//   // {
//   //     accessorKey: 'ContactNumber',
//   //     header: 'Contact Number',
//   //     enableEditing: true
//   // },
// ];
// const coumnsForTask = [
//   // {
//   //     accessorKey: 'NameOfCandidate',
//   //     header: 'Name Of Candidate'
//   // },
//   // {
//   //     accessorKey: 'DateOfBirth',
//   //     header: 'Date Of Birth'
//   // },
//   {
//       accessorKey: 'Designation',
//       header: 'Designation',
//       enableEditing: true
//   },
//   {
//       accessorKey: 'Team',
//       header: 'Team',
//       enableEditing: true
//   },
//   // {
//   //     accessorKey: 'ContactNumber',
//   //     header: 'Contact Number',
//   //     enableEditing: true
//   // },
//   // {
//   //     accessorKey: 'assigneddate',
//   //     header: 'Assigned Date',
//   //     muiEditTextFieldProps: {
//   //         type: 'date',
//   //         required: true
//   //     }
//   // },
//   // {
//   //     accessorKey: 'targetdate',
//   //     header: 'Target Date',
//   //     muiEditTextFieldProps: {
//   //         type: 'date',
//   //         required: true
//   //     }
//   // },

// ];
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


const ManagerPanel = () => {


    const [dob, setDOB] = useState('');

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
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
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
    const handleDelete = () => {
        setOpen(true);
        console.log('open', open);
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
        data,
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActions: ({ row }) => (
            <div style={{ display: 'flex' }}>
                <IconButton onClick={handleDelete}>
                    <DeleteRounded style={{ color: '#2196f3' }} />
                </IconButton>
                {/* <IconButton onClick={handleView}>
                    <VisibilityRounded style={{ color: '#2196f3' }} />
                </IconButton> */}
                <IconButton onClick={handleEdit}>
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
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept=".xls,.xlsx"
                    />
                    <Button variant="contained" style={{ marginRight: '1rem' }} color="primary" onClick={handleImportClick} startIcon={<IconUpload />}>
                        Import
                    </Button>
                    <Button onClick={handleExportData} variant="contained" color="primary" startIcon={<IconDownload />}>
                        Export
                    </Button>
                </div>
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

    return (
        <div className="max">
            {view.mode === 'Add' && (
                <MainCard
                    title="Manager Creation"
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
                            <TextField fullWidth id="outlined-basic" label="Project Name" variant="outlined" />
                        </Grid>
                        <Grid xs={4} p={2}>

                            <DatePicker
                                label="Assigned Date"
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth id="outlined-basic" />}
                            />
                        </Grid>
                        <Grid xs={4} p={2}>

                            <DatePicker
                                label="Target Date"
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth id="outlined-basic" />}
                            />
                        </Grid>

                        <Grid xs={4} p={2}>
                            <TextField fullWidth id="outlined-basic" label="Percentage Of Effect" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
                        Save
                    </Button>
                </MainCard>
            )}
            {view.mode === 'Initial' && (
                <MainCard
                    title="Manager"
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
                    title="Manager Updations"
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
                        {/* <Grid xs={4} p={2}>
                            <TextField fullWidth id="outlined-basic" label="Name Of Candidate" variant="outlined" />
                        </Grid>
                        <Grid xs={4} p={2}>
                            <TextField fullWidth type="date" variant="outlined" name="dob" className="w-100" />
                        </Grid> */}

                        <Grid xs={4} p={2}>
                            <TextField fullWidth id="outlined-basic" label="Project Name" variant="outlined" />
                        </Grid>
                        <Grid xs={4} p={2}>

                            <DatePicker
                                label="Assigned Date"
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth id="outlined-basic" />}
                            />
                        </Grid>
                        <Grid xs={4} p={2}>

                            <DatePicker
                                label="Target Date"
                                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth id="outlined-basic" />}
                            />
                        </Grid>
                        <Grid xs={4} p={2}>
                            <TextField fullWidth id="outlined-basic" label="Percentage Of Effect" variant="outlined" />
                        </Grid>
                        {/* <Grid xs={4} p={2}>
                            <TextField fullWidth id="outlined-basic" label="Contact Number" variant="outlined" />
                        </Grid> */}
                    </Grid>
                    {/* <Divider /> */}
                    {/* <Box p={2} className="edit-table-container">
                        <MaterialReactTable table={editableForHistory} />
                    </Box> */}
                    {/* <Box p={2} className="edit-table-container">
                        <MaterialReactTable table={editableForTask} />
                    </Box> */}
                    <Button variant="contained" style={{ float: 'right', margin: '2rem' }}>
                        Save
                    </Button>
                </MainCard>
            )}
            {/* {view.mode === 'View' && (
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
            )} */}
            <Dialog
                fullWidth
                open={open}
                TransitionComponent={Transition}
                keepMounted
            // onClose={handleClose}
            // aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <Typography variant="h3">Delete Manager</Typography>
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
                    <Button variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default ManagerPanel;


