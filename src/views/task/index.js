/*eslint-disable */
import { Lock } from '@mui/icons-material';
import { Card, CardHeader, Grid, InputAdornment, Tab, Tabs, TextField, Typography } from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Modal } from 'rsuite';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Box } from '@mui/system';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PeopleIcon from '@mui/icons-material/People';
import SellIcon from '@mui/icons-material/Sell';
import TableChartIcon from '@mui/icons-material/TableChart';
import FlagIcon from '@mui/icons-material/Flag';
import AdjustIcon from '@mui/icons-material/Adjust';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const TaskPanel = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filterValue, setFilterValue] = React.useState('');

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [editorHtml, setEditorHtml] = useState('');

  const handleEditorChange = (content) => {
    setEditorHtml(content);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  // const previewStyle = {
  //   border: '1px solid #ccc',
  //   minHeight: '200px',
  //   padding: '10px',
  //   marginTop: '20px',
  // };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file);
        setSelectedFile(file); // Save the selected file in state
      }
    });
  };

  const [items, setItems] = useState([{ id: 'mainRepo', title: 'Main-Repo', description: 'Project for the Employee', color: '#008000' }]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <MainCard>
      <h4>
        <Lock /> @bharathi-mohan&apos;s untitled project
      </h4>
      <hr />
      <Grid className="d-flex justify-content-between">
        <TextField
          value={filterValue}
          onChange={handleFilterChange}
          placeholder="Filter by Keyword or by field"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterListIcon />
              </InputAdornment>
            )
          }}
          sx={{ width: '80%' }}
        />

        <Button style={{ color: ' #ffffff', backgroundColor: 'green' }} onClick={handleOpen}>
          Create New
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          backdrop="static"
        >
          <Box sx={{ width: 200 }}>
            <div className="d-flex align-items-center">
              <h5 id="child-modal-title" style={{ marginRight: '10px' }}>
                Create New issue
              </h5>
              <CloseIcon onClick={handleClose} />
            </div>
            <hr />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id="edit-box"
                placeholder="Blank issue in KSRTC-CAPCP/Main-Repo"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CardMembershipIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                      <EditIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Typography variant="h5" id="child-modal-title" sx={{ display: 'block', marginBottom: '10px' }}>
              Add a Title
            </Typography>
            <TextField
              id="input-box"
              fullWidth
              placeholder="Title"
              required
              value={inputValue}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mt: '2', width: '250%' }} // Adjust the width as needed
            />

            <Typography variant="h5" id="child-modal-title" sx={{ display: 'block', marginBottom: '10px' }}>
              Add a description
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Preview" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <ReactQuill
                  theme="snow"
                  value={editorHtml}
                  onChange={handleEditorChange}
                  placeholder="Type your description"
                  modules={modules}
                  style={{ height: '200px', width: '277%', padding: '30px' }}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div style={{ maxWidth: '50%' }}>
                  <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
                </div>
              </CustomTabPanel>
            </Box>
            <br />
            <br />
            <br />
            <hr />
            <Box display="flex" alignItems="center" onClick={handleFileClick} style={{ cursor: 'pointer' }}>
              <AttachFileIcon />
              {!selectedFile ? (
                <p style={{ marginRight: '8px' }}>Upload File</p>
              ) : (
                <p style={{ marginRight: '8px' }}>Selected file: {selectedFile.name}</p>
              )}
            </Box>
            <br />

            <Grid container spacing={2}>
              {/* Left side */}
              <Grid item xs={6}>
                <TextField
                  placeholder="Assignee"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PeopleIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                />
              </Grid>

              {/* Right side */}
              <Grid item xs={6}>
                <TextField
                  placeholder="label"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SellIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                />
              </Grid>

              {/* Left side */}
              <Grid item xs={6}>
                <TextField
                  placeholder="@bharathi-mohan's untitled project"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TableChartIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                />
              </Grid>

              {/* Right side */}
              <Grid item xs={6}>
                <TextField
                  placeholder="Milestone"
                  style={{}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlagIcon />
                      </InputAdornment>
                    )
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>

            <hr />
            <Grid container direction="row" justifyContent="flex-end" className="d-flex justify-content-between">
              <Grid item>
                <Button style={{ backgroundColor: 'green', color: '#ffffff', marginTop: '16px' }} onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button style={{ backgroundColor: 'green', color: '#ffffff', marginTop: '16px' }}>Create</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>

      <Grid container>
        <Grid xs={4} p={2}>
          <Card sx={{ margin: 'auto', marginTop: 2, display: 'flex', alignItems: 'center' }}>
            <FiberManualRecordOutlinedIcon style={{ color: '#008000', marginRight: '-1px', marginTop: '-16px', marginBottom: '456px' }} />

            <CardHeader title="Todo List" subheader="This item hasn't been started" sx={{ fontSize: '14px' }} />
            <MoreHorizOutlinedIcon style={{ alignItems: 'left', marginLeft: '100px', marginBottom: '456px' }} />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <Grid container {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <Card
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{ margin: 'auto', marginTop: -15, height: '100px' }}
                          >
                            <AdjustIcon style={{ color: item.color }} />
                            <Typography variant="h5" id="child-modal-title">
                              {item.title}
                            </Typography>
                            <p>{item.description}</p>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </Card>
        </Grid>
        <Grid xs={4} p={2}>
          <Card sx={{ margin: 'auto', marginTop: 2, display: 'flex', alignItems: 'center' }}>
            <FiberManualRecordOutlinedIcon style={{ color: '#ff8b00', marginRight: '-1px', marginTop: '-16px', marginBottom: '456px' }} />

            <CardHeader title="In Progress" subheader="It's actively being worked on" sx={{ fontSize: '14px' }} />
            <MoreHorizOutlinedIcon style={{ alignItems: 'left', marginLeft: '200px', marginBottom: '456px' }} />
          </Card>
        </Grid>
        <Grid xs={4} p={2}>
          <Card sx={{ margin: 'auto', marginTop: 2, display: 'flex', alignItems: 'center' }}>
            <FiberManualRecordOutlinedIcon style={{ color: '#362391', marginRight: '-1px', marginTop: '-16px', marginBottom: '456px' }} />

            <CardHeader title="Done" subheader="This has been completed" sx={{ fontSize: '14px' }} />
            <MoreHorizOutlinedIcon style={{ alignItems: 'left', marginLeft: '200px', marginBottom: '456px' }} />
          </Card>
        </Grid>
        <Grid xs={4} p={2}>
          <Card sx={{ margin: 'auto', marginTop: 2, display: 'flex', alignItems: 'center' }}>
            <FiberManualRecordOutlinedIcon style={{ color: '#eb2632', marginRight: '-1px', marginTop: '-16px', marginBottom: '456px' }} />

            <CardHeader title="Testing" subheader="Only you can move test" sx={{ fontSize: '14px' }} />
            <MoreHorizOutlinedIcon style={{ alignItems: 'left', marginLeft: '200px', marginBottom: '456px' }} />
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default TaskPanel;
