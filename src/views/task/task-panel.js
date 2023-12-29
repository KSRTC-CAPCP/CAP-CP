/*eslint-disable */
import React, { useState, useEffect, forwardRef } from 'react';
import './style.css';
import Avatar from '@mui/material/Avatar';
import { Dialog, DialogContent, DialogTitle, Slide, Typography } from '@mui/material';
import { Divider } from 'rsuite';
import { FlagTwoTone } from '@mui/icons-material';
const TaskView = ({ tasks }) => {
  const [stateTasks, setStateTasks] = useState([]);
  const [taskOpen, setTaskOpen] = useState(false);
  useEffect(() => {
    setStateTasks(tasks);
  }, [tasks]);

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add('dragged');
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove('dragged');
  };

  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add('dragged-over');
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget) return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove('dragged-over');
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');
    let data = evt.dataTransfer.getData('text/plain');
    let updated = stateTasks.map((task) => {
      if (task._id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setStateTasks(updated);
  };
  const handleTaskOpen = () => {
    setTaskOpen(true);
  };
  const handleTaskClose = () => {
    setTaskOpen(false);
  };
  console.log(taskOpen, 'task');
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const calculateDateDifference = (startDate, endDate) => {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/; // DD-MM-YYYY format

    const [start, end] = dateRegex.test(startDate)
      ? [startDate, endDate].map((date) => {
          const [day, month, year] = date.split('-').map(Number);
          return new Date(year, month - 1, day);
        })
      : [new Date(startDate), new Date(endDate)];

    const differenceInDays = (end - start) / (1000 * 60 * 60 * 24);

    return differenceInDays;
  };
  // const daysDifference = calculateDateDifference(startDate, endDate);

  const renderTasks = (taskList) => {
    return taskList.map((task) => (
      <div
        className="card-task"
        onClick={handleTaskOpen}
        key={task._id}
        id={task._id}
        draggable
        onDragStart={(e) => onDragStart(e)}
        onDragEnd={(e) => onDragEnd(e)}
      >
        <div className="">
          <div>
            <div className="d-flex justify-content-between align-items-center m-0">
              <div>
                <p className="strong line-ellipse">{task.title}</p>
                <span className=" text-muted line-ellipse ps-1 small">{task.referenceId}</span>
              </div>
              <div>
                <p className="mute m-0 bold-text text-end">{calculateDateDifference(task.startDate, task.endDate)} Days</p>
                <p className="m-0 p-3 status-task small">{task.status}</p>
              </div>
            </div>
            <p className="p-3 ellipse-co mt-1">{task.description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-1 m-0">
            <div className="ps-1">
              {task.priority === 'Medium' && <FlagTwoTone style={{ color: '#faaf00' }} />}
              {task.priority === 'Low' && <FlagTwoTone style={{ color: '#00e676' }} />}
              {task.priority === 'High' && <FlagTwoTone style={{ color: '#c62828' }} />}
            </div>
            <div className="d-flex">
              <p>-&nbsp;{task.createdBy}</p>
              <Avatar sx={{ bgcolor: '#90caf9', color: '#1e88e8', width: '30px', height: '30px', fontSize: '15px' }}>
                {/* {task?.title ? task?.title[0] : ''} */}
                {task?.responsible.split('-')[1]?.[0]}
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="wrapper-task">
      {/* New Orders */}
      <div
        className="order small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false, 'In Backlog')}
      >
        <section>
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="h4-task">TO DO</h4>
                {renderTasks(stateTasks?.filter((data) => data.status === 'In Backlog'))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* In Progress */}
      <div
        className="pending small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false, 'In Progress')}
      >
        <section>
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="h4-task">IN PROGRESS</h4>
                {renderTasks(stateTasks.filter((data) => data.status === 'In Progress'))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Waiting for buyer */}
      <div
        className="waiting small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true, 'In Review')}
      >
        <section>
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="h4-task">IN REVIEW</h4>
                {renderTasks(stateTasks.filter((data) => data.status === 'In Review'))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Completed */}
      <div
        className="done small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, true, 'Completed')}
      >
        <section>
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4 className="h4-task">DONE</h4>
                {renderTasks(stateTasks.filter((data) => data.status === 'Completed'))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Dialog open={taskOpen} fullWidth TransitionComponent={Transition}>
        <DialogTitle className="d-flex justify-content-between">
          <Typography variant="h3">Approval</Typography>
          <Typography variant="h3" onClick={handleTaskClose}>
            Close
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>red</DialogContent>
        <Divider />
      </Dialog> */}
    </div>
  );
};

export default TaskView;
