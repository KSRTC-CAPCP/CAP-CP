
import TaskView from './task-panel';
import { TASKS } from './mockData';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    width: '100%',
    maxWidth: '100px',
    borderColor: '#bbb', 
  };






  return (

    <MainCard >
      <div className='d-flex justify-content-between align-items-center'>
        <h5>Task Panel</h5>
        <div className='d-flex justify-content-between align-items-center'>
          <AccessTimeIcon />
          <span className='text-muted' style={{ paddingLeft: '5px', paddingRight: '10px' }}>7 days remaining</span>

          <Button
            style={buttonStyles}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>Create Task</Button>
        </div>
      </div>
      <div style={inputContainerStyle}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          style={inputStyle}
          
        />
        
      </div>
      <TaskView tasks={TASKS} />
    </MainCard>


  );
};

export default TaskPanel;
