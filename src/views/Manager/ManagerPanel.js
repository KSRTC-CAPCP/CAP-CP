
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
import theme from 'themes';


const columnHelper = createMRTColumnHelper();
const data = [
    {
        name: 'Darla',
        employeecode: 'EMP001',
        jobtitle: 'Testing',
        status: '',
    },
    {
        name: 'Zara',
        employeecode: 'EMP001',
        jobtitle: 'Testing',
        status: '',
    },
    {
        name: 'Bharathi',
        employeecode: 'EMP001',
        jobtitle: 'Testing',
        status: '',
    }
];

// const [openModal, setOpenModal] = useState(false);
// const [openModal, setOpenModal] = useState(false);

    // const handleOpenModal = () => {
    //     setOpenModal(true);
    // };

    // const handleCloseModal = () => {
    //     setOpenModal(false);
    // };

const columns = [

    columnHelper.accessor('name', {
        header: 'Name',
        Cell: ({ row }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {row && row.original && (
                    <Avatar alt="Profile" style={{ marginRight: '8px' }}>
                        {row.original.name.charAt(0)}
                    </Avatar>
                )}
                {row && row.original && row.original.name}
            </div>
        ),
    }),
    columnHelper.accessor('employeecode', {
        header: 'Employee Code'
    }),
    columnHelper.accessor('jobtitle', {
        header: 'Job Title'
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        Cell: ({ row }) => (
            <div>
                <Button
                     sx={{
                            backgroundColor: '#ede7f6',
                            color: '#5e35b1',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: '#5e35b1',
                                color: '#ede7f6',
                            },
                        }}
                        onClick={handleOpenModal}
                >
                    View
                </Button>
                <Dialog open={openModal} onClose={handleCloseModal}>
                        <DialogTitle>View Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This is the content of the modal. Replace this with your view content.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>Close</Button>
                        </DialogActions>
                    </Dialog>
            </div>

        ),
    }),

];

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true
});


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ManagerPanel = () => {


    



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


    const table = useMaterialReactTable({
        columns,
        data,
        // enableRowActions: true,
        // positionActionsColumn: 'last',
        // renderRowActions: ({ row }) => (
        //     <div style={{ display: 'flex' }}>
        //         <IconButton onClick={handleDelete}>
        //             <DeleteRounded style={{ color: '#2196f3' }} />
        //         </IconButton>
        //         {/* <IconButton onClick={handleView}>
        //           <VisibilityRounded style={{ color: '#2196f3' }} />
        //       </IconButton> */}
        //         <IconButton onClick={handleEdit}>
        //             <ModeEditRounded style={{ color: '#2196f3' }} />
        //         </IconButton>
        //     </div>
        // ),
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
                    {/* <Button variant="contained" style={{ marginRight: '1rem' }} color="primary" onClick={handleImportClick} startIcon={<IconUpload />}>
                        Import
                    </Button> */}
                    <Button onClick={handleExportData} variant="contained" color="primary" startIcon={<IconDownload />}>
                        Export
                    </Button>
                </div>
            </>
        )

    });

    return (
        <div className="max">

            {view.mode === 'Initial' && (
                <MainCard
                    title="Attendance Approval"
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
                        </Box>
                    }
                >
                    <MaterialReactTable table={table} />
                </MainCard>
            )}
        </div>
    );
};
export default ManagerPanel;


