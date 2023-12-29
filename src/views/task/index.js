/*eslint-disable */
import TaskView from './task-panel';
import { TASKS } from './mockData';
import MainCard from 'ui-component/cards/MainCard';
import { AvatarGroup, Button, ButtonBase, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import React, { useState, useRef } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Avatar from '@mui/material/Avatar';
import { Modal } from 'rsuite';
import { Box } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import SunEditor from 'suneditor-react';
import { useTheme } from '@mui/material/styles';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GroupIcon from '@mui/icons-material/Group';
import FlagIcon from '@mui/icons-material/Flag';
import { KeyboardBackspaceRounded, PlusOne, ViewAgendaTwoTone } from '@mui/icons-material';
import { IconPlus } from '@tabler/icons';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


function createData(ReferenceID, Title, Description, Status, priority, RemainingDays, CreatedBy) {
  return { ReferenceID, Title, Description, Status, priority, RemainingDays, CreatedBy };
}

const rows = [
  createData("CAE0001", "CAP-CP", "Do your work", "Complete", "lower", "2days", "HR"),
  createData("CAE0002", "CAP-CP", "Do your work", "In Progress", "higher", "2days","HR"),
  createData("CAE0003", "CAP-CP", "Do your work", "Waiting", "high", "2days", "self"),
  createData("CAE0004", "CAP-CP", "Do your work", "In Progress", "medium", "2days", "self"),
  createData("CAE0005", "CAP-CP", "Do your work", "Complete", "low", "2days",  "self"),
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(); // Ref to file input

  const UPLOAD_ENDPOINT = 'http://localhost/react-php-file-upload/backend/upload.php';

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
            <AccessTimeIcon sx={{ fontSize: '1.1rem' }} />
            <span className="text-muted" style={{ paddingLeft: '5px', paddingRight: '10px' }}>
              7 days remaining
            </span>

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
                      color: theme.palette.secondary.light,
                    },
                  }}
                  aria-haspopup="true"
                  onClick={handleClose}
                  color="inherit"
                >
                  <IconPlus />
                </Avatar>
              </ButtonBase>
            </Box>
            {view.mode === 'Add' ? <Box sx={{ ml: 2 }}>
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
                      color: theme.palette.secondary.light,
                    },
                  }}
                  aria-haspopup="true"
                  onClick={handleBoard}
                  color="inherit"
                >
                  <ViewAgendaTwoTone style={{ rotate: '90deg' }} />
                </Avatar>
              </ButtonBase>
            </Box> : <Box sx={{ ml: 2 }}>
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
                      color: theme.palette.secondary.light,
                    },
                  }}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  color="inherit"
                >
                  <ViewAgendaTwoTone />
                </Avatar>
              </ButtonBase>
            </Box>}

          </div>
        }

      >
        {view.mode === 'Add' && (
          <div>
           
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {/* return { ReferenceID, Title, Description, Status, priority, RemainingDays, CreatedBy  }; */}
                <TableHead>
                  <TableRow>
                    <TableCell>Reference ID</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">priority</TableCell>
                    <TableCell align="right">RemainingDays</TableCell>
                    <TableCell align="right">CreatedBy</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ReferenceID}
                      </TableCell>
                      <TableCell align="right">{row.Title}</TableCell>
                      <TableCell align="right">{row.Description}</TableCell>
                      <TableCell align="right">{row.Status}</TableCell>
                      <TableCell align="right">{row.priority}</TableCell>
                      <TableCell align="right">{row.RemainingDays}</TableCell>
                      <TableCell align="right">{row.CreatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            
          </div>
        )}
        {view.mode === 'Initial' && (
          <div>
            <TaskView tasks={TASKS} />
            <Modal
              open={open}
              style={{ borderRadius: '5px' }}
              backdrop="static"
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <div className="d-flex justify-content-between align-item-center">
                  <Typography className="bold-text"> Create New Task </Typography>
                  <ClearIcon onClick={handleClose} />
                </div>
                <hr />
                <TextField
                  variant="outlined"
                  fullWidth
                  disabled
                  InputProps={{
                    startAdornment: <CardMembershipIcon style={{ fontSize: 'larger' }} />
                  }}
                  value="Blanck issues in KSRTC-CAPCP/Main-Repo ..."
                />
                <Typography className="bold-text">Add Title </Typography>
                <TextField variant="outlined" fullWidth placeholder="Title" />
                <Typography className="bold-text">Add Description </Typography>
                <div>
                  <SunEditor setOptions={allOptions} setAllPlugins={true} />
                </div>
                <br />
                <form onSubmit={handleSubmit}>
                  <label htmlFor="file-upload" className="custom-file-upload" style={{ marginRight: '10px' }}>
                    <AttachFileIcon style={{ marginBottom: '-4px' }} /> Choose file(s)
                  </label>

                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleOnChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef} // Attach the ref to the input
                    multiple
                  />

                  {selectedFiles.length === 1 && <span>{selectedFiles[0].name}</span>}
                  {selectedFiles.length > 1 && <span>{selectedFiles.length} files </span>}
                </form>
                <br />
                <div className="d-flex">
                  <TextField
                    InputProps={{
                      startAdornment: <GroupIcon style={{ fontSize: 'larger' }} />
                    }}
                    placeholder="Assignee"
                  />
                  <Box width="34%" mx="auto" className="App">
                    <TextField fullWidth select label="Label">
                      <MenuItem key="part-one" value="part-one">
                        <FlagIcon style={{ fontSize: '19px', color: '#fd5c63' }} /> - High
                      </MenuItem>
                      <MenuItem key="part-two" value="part-two">
                        <FlagIcon style={{ fontSize: '19px', color: '#FF0800' }} /> - Higher
                      </MenuItem>
                      <MenuItem key="part-two" value="part-two">
                        <FlagIcon style={{ fontSize: '19px', color: '#FEBE10' }} /> - Medium
                      </MenuItem>
                      <MenuItem key="part-two" value="part-two">
                        <FlagIcon style={{ fontSize: '19px', color: '#17B169' }} /> - Low
                      </MenuItem>
                      <MenuItem key="part-two" value="part-two">
                        <FlagIcon style={{ fontSize: '19px', color: '#00563B' }} /> - Lower
                      </MenuItem>
                    </TextField>
                  </Box>
                </div>
              </Box>
            </Modal>
          </div>
        )}
      </MainCard>
    </>
  );
};

export default TaskPanel;
