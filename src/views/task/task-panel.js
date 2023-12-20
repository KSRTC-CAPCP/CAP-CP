import React, { useState, useEffect } from 'react';
import './style.css';
const TaskView = ({ tasks }) => {
  const [stateTasks, setStateTasks] = useState([]);

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
      if (task.id.toString() === data.toString()) {
        task.status = status;
      }
      return task;
    });
    setStateTasks(updated);
  };

  const renderTasks = (taskList) => {
    return taskList.map((task) => (
      <div className="card-task" key={task.name} id={task.id} draggable onDragStart={(e) => onDragStart(e)} onDragEnd={(e) => onDragEnd(e)}>
        {/* <div className="img-task">
          <img src={task.image} alt="box" />
        </div> */}
        <div className="card_right">
          <div className="status-task">{task.status}</div>
          <div style={{ fontWeight: 'bolder', marginRight: '200px', marginTop: '-36px' }}>{task.title}</div>

          <div style={{ marginRight: '120px' }}>{task.description}</div>

          {/* <div className="days" style={{ marginTop: '50px' }}>{task.time}</div>
          <div className="time" >{task.days}</div> */}

          <div className="img-task">
            <img src={task.image} alt="box" />
          </div>
          <div style={{ marginRight: '200px' }}>{task.icon}</div>
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
                {renderTasks(stateTasks.filter((data) => data.status === 'In Backlog'))}
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
    </div>
  );
};

export default TaskView;
