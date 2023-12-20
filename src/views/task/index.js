/*eslint-disable */
import TaskView from './task-panel';
import { TASKS } from './mockData';
import MainCard from 'ui-component/cards/MainCard';
import { AvatarGroup, Button, InputAdornment, MenuItem, TextField, Typography, } from '@mui/material';
import React, { useState, useRef } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Avatar from '@mui/material/Avatar';
import { Modal } from 'rsuite';
import { Box } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import SunEditor from 'suneditor-react';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GroupIcon from '@mui/icons-material/Group';
import FlagIcon from '@mui/icons-material/Flag';

const TaskPanel = () => {

  const [hovered, setHovered] = useState(false);

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
    margin: '20px 0',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    // width: '200%',
    maxWidth: '400px',
    borderColor: '#bbb',

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
      ['preview',],


    ],
  };
  const [fileCount, setFileCount] = useState(0);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(); // Ref to file input

  const UPLOAD_ENDPOINT =
    "http://localhost/react-php-file-upload/backend/upload.php";

  const handleSubmit = async e => {
    e.preventDefault();
    if (files.length > 0) {
      try {
        const responses = await Promise.all(files.map(file => uploadFile(file)));
        console.log(responses.map(res => res.data)); // Handle the responses from the server
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append("avatar", file);

    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  };

  const handleOnChange = e => {
    const selectedFilesArray = Array.from(e.target.files);
    setSelectedFiles(selectedFilesArray);

    // Clear the input value to allow reselection of the same file
    fileInputRef.current.value = null;
  };




  return (

    <MainCard >
      <div className='d-flex justify-content-between align-item-center'>
        <div >
          <h5 style={{ marginLeft: '35px' }}>Task Panel</h5>
          <div style={inputContainerStyle}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
              style={inputStyle}
              className='backmargin'

            /> <AvatarGroup total={24}>
              <Avatar alt="R" src="/static/images/avatar/1.jpg" />
              <Avatar alt="T" src="/static/images/avatar/2.jpg" />
              <Avatar alt="A" src="/static/images/avatar/4.jpg" />
              <Avatar alt="T" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>

          </div></div>

        <div style={{ marginRight: '15px' }} className='d-flex justify-content-between align-item-center'>
          <AccessTimeIcon sx={{ fontSize: '1.1rem' }} />
          <span className='text-muted' style={{ paddingLeft: '5px', paddingRight: '10px' }}>7 days remaining</span>

          <Button
            style={buttonStyles}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)} onClick={handleOpen} >Create Task</Button>
          <Modal
            open={open}
            style={{ borderRadius: '5px' }}
            backdrop="static"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box >
              <div className='d-flex justify-content-between align-item-center'>
                <Typography className='bold-text' > Create New Task </Typography>
                <ClearIcon onClick={handleClose} />
              </div>
              <hr />
              <TextField
                variant="outlined"
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <CardMembershipIcon style={{ fontSize: 'larger' }} />
                  ),
                }}
                value="Blanck issues in KSRTC-CAPCP/Main-Repo ..."

              />
              <Typography className='bold-text' >Add Title </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder='Title' />
              <Typography className='bold-text' >Add Description </Typography>
              <div>

                <SunEditor
                  setOptions={allOptions}
                  setAllPlugins={true}
                />
              </div>
              <br />
              <form onSubmit={handleSubmit} >
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
              <div className='d-flex'>
                <TextField InputProps={{
                  startAdornment: (
                    <GroupIcon style={{ fontSize: 'larger' }} />
                  ),
                }} placeholder='Assignee' />
                <Box width="34%" mx="auto" className="App" >

                  <TextField fullWidth select label="Label">
                    <MenuItem key="part-one" value="part-one" >
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


      </div>

      <TaskView tasks={TASKS} />
    </MainCard>


  );
};

export default TaskPanel;
