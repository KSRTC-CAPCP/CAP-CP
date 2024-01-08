/*eslint-disable */
import React, { useState, useEffect, forwardRef } from 'react';
import './style.css';
import Avatar from '@mui/material/Avatar';
import { Dialog, DialogContent, DialogTitle, Grid, Slide, Typography } from '@mui/material';
import { Divider } from 'rsuite';
import { CloseTwoTone, FlagTwoTone, LocalPoliceTwoTone } from '@mui/icons-material';
import { fetchData, postData, updateData } from 'utils/apiUtils';
import { TASK_GET_BY_ID, TASK_UPDATE } from 'api/apiEndPoint';
const TaskView = ({ tasks }) => {
  const [stateTasks, setStateTasks] = useState([]);
  const [taskOpen, setTaskOpen] = useState(false);
  const [taskDataById, setTaskDataById] = useState();
  const [originalState, setOriginalState] = useState([]);

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
  const [localData, setLocalData] = useState();

  useEffect(() => {
    const userString = localStorage.getItem('userData');
    const user = userString ? JSON.parse(userString) : null;
    setLocalData(user);
  }, []);

  const getCurrentUser = () => {
    return localData ? `${localData.code}-${localData.name}` : '';
  };

  console.log(getCurrentUser(), 'getCurrentUser');

  const onDrop = async (evt, value, status) => {
    console.log(status, '<--------status');
    evt.preventDefault();
    evt.currentTarget.classList.remove('dragged-over');

    // Store the original state before the drop
    const originalStateCopy = JSON.parse(JSON.stringify(stateTasks));
    setOriginalState(originalStateCopy);

    let data = evt.dataTransfer.getData('text/plain');

    // Get the current user details
    const currentUser = getCurrentUser();

    // Update the status, updatedAt, and updatedBy fields
    let updated = stateTasks.map((task) => {
      if (task._id.toString() === data.toString()) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        task.updatedBy = currentUser; // Use the appropriate property for the user's name
      }
      return task;
    });

    // Find the index of the changed object
    const changedIndex = updated.findIndex((task, index) => {
      return task.status !== originalStateCopy[index].status;
    });
    const endPoint = TASK_UPDATE(updated[changedIndex]?._id);

    console.log('Changed endPoint:', TASK_UPDATE(updated[changedIndex]?._id));
    await updateData(endPoint, updated[changedIndex], localData?.accessToken); // Log the changed object

    // Compare the original state with the updated state
    const changedData = originalStateCopy.filter((originalTask, index) => {
      return originalTask.status !== updated[index].status;
    });

    console.log('Changed Data:', changedData);

    setStateTasks(updated);
  };

  const handleTaskOpen = async (e) => {
    console.log(e, 'localData');
    setTaskOpen(true);
    try {
      const endPoint = TASK_GET_BY_ID(e);
      const taskById = await fetchData(endPoint, localData?.accessToken);
      setTaskDataById(taskById?.data);
    } catch (error) {
      console.log('error:', error);
    }
  };
  console.log('taskDataById------->', taskDataById);
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
  const containsHTMLTags = (content) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };
  const renderDescription = (task) => {
    console.log(task, 'description');
    // Receive the current task as a parameter
    if (containsHTMLTags(task?.description)) {
      return <div className="p-3 ellipse-co mt-1" dangerouslySetInnerHTML={{ __html: task?.description }} />;
    } else {
      return <p className="p-3 ellipse-co mt-1">{task?.description}</p>;
    }
  };
  const renderDescriptionFullView = (task) => {
    console.log(task, 'description');
    // Receive the current task as a parameter
    if (containsHTMLTags(task?.description)) {
      return <div className="p-3 mt-1" dangerouslySetInnerHTML={{ __html: task?.description }} />;
    } else {
      return <p className="p-3 mt-1">{task?.description}</p>;
    }
  };

  const renderTasks = (taskList) => {
    return taskList.map((task) => (
      <div
      className={`card-task ${calculateDateDifference(task.startDate, task.endDate) <= 3 ? 'urgent-task' : ''}`}
      onClick={() => handleTaskOpen(task._id)}
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
            {renderDescription(task)}
            {/* <p className="p-3 ellipse-co mt-1">{task.description}</p> */}
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
                <h4 className="h4-task">In Backlog</h4>
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
                <h4 className="h4-task">Completed</h4>
                {renderTasks(stateTasks.filter((data) => data.status === 'Completed').slice(-10))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* {task.priority === 'Medium' && <FlagTwoTone style={{ color: '#faaf00' }} />}
              {task.priority === 'Low' && <FlagTwoTone style={{ color: '#00e676' }} />}
              {task.priority === 'High' && <FlagTwoTone style={{ color: '#c62828' }} />} */}
      <Dialog open={taskOpen} fullWidth maxWidth="md" onClose={handleTaskClose}>
        <DialogTitle className="d-flex justify-content-between m-0 border-bottom">
          <Typography variant="h3" className="d-flex  align-items-center m-0">
            <LocalPoliceTwoTone
              style={{
                color:
                  (taskDataById?.priority === 'High' && '#c62828') ||
                  (taskDataById?.priority === 'Medium' && '#faaf00') ||
                  (taskDataById?.priority === 'Low' && '#00e676')
              }}
            />{' '}
            &nbsp;Create Task
          </Typography>
          <Typography variant="h4" onClick={handleTaskClose}>
            <CloseTwoTone />
          </Typography>
        </DialogTitle>

        <DialogContent className="m-1">
          <div>
            <Grid container>
              <Grid xs={4} p={2}>
                <label className="text-muted">Reference ID</label>
                <p>{taskDataById?.referenceId}</p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">Title</label>
                <p>{taskDataById?.title}</p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">Start Date</label>
                <p>{taskDataById?.startDate}</p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">End Date</label>
                <p>{taskDataById?.endDate}</p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">Status</label>
                <p>{taskDataById?.status}</p>
              </Grid>

              <Grid xs={4} p={2}>
                <label className="text-muted">Priority</label>
                <p>{taskDataById?.priority}</p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">Responsible</label>
                <p>
                  {taskDataById?.responsible === `${localData?.code}-${localData?.name}`
                    ? `You ${taskDataById?.responsible}`
                    : taskDataById?.responsible}
                </p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">Created By</label>
                <p>{taskDataById?.createdBy}</p>
              </Grid>
              <Grid xs={4} p={2}>
                <label className="text-muted">Created At</label>
                <p>{taskDataById?.createdAt.slice(0, 10)}</p>
              </Grid>
              {taskDataById?.updatedBy && (
                <Grid xs={4} p={2}>
                  <label className="text-muted">Updated By</label>
                  <p>{taskDataById?.updatedBy}</p>
                </Grid>
              )}
              {taskDataById?.updatedAt && (
                <Grid xs={4} p={2}>
                  <label className="text-muted">Updated At</label>
                  <p>{taskDataById?.updatedAt.slice(0, 10)}</p>
                </Grid>
              )}
              <Grid xs={12} p={2}>
                <label className="text-muted">Description</label>
                {renderDescriptionFullView(taskDataById)}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskView;
