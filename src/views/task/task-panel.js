import React, { useState, useEffect } from "react";
import './style.css'
const TaskView = ({ tasks }) => {
  const [stateTasks, setStateTasks] = useState([]);

  useEffect(() => {
    setStateTasks(tasks);
  }, [tasks]);

  const onDragStart = (evt) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    let data = evt.dataTransfer.getData("text/plain");
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
      <div
        className="card-task"
        key={task.name}
        id={task.id}
        draggable
        onDragStart={(e) => onDragStart(e)}
        onDragEnd={(e) => onDragEnd(e)}
      >
        <div className="img-task">
          <img src={task.image} alt="box" />
        </div>
        <div className="card_right">
          <div className="status-task">{task.status}</div>
          <div className="days">{task.time}</div>
          <div className="time">{task.days}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container-task">
      {/* New Orders */}
      <div
        className="order small-box"
        onDragLeave={(e) => onDragLeave(e)}
        onDragEnter={(e) => onDragEnter(e)}
        onDragEnd={(e) => onDragEnd(e)}
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, false, "New Order")}
      >
        <section className="drag_container">
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4 >Backlogs</h4>
                {renderTasks(
                  stateTasks.filter((data) => data.status === "New Order")
                )}
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
        onDrop={(e) => onDrop(e, false, "In Progress")}
      >
        <section className="drag_container">
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4>In Progress</h4>
                {renderTasks(
                  stateTasks.filter((data) => data.status === "In Progress")
                )}
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
        onDrop={(e) => onDrop(e, true, "Delivered")}
      >
        <section className="drag_container">
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4>Review</h4>
                {renderTasks(
                  stateTasks.filter((data) => data.status === "Delivered")
                )}
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
        onDrop={(e) => onDrop(e, true, "Completed")}
      >
        <section className="drag_container">
          <div className="container-task">
            <div className="drag_column">
              <div className="drag_row">
                <h4>Done</h4>
                {renderTasks(
                  stateTasks.filter((data) => data.status === "Completed")
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaskView;
