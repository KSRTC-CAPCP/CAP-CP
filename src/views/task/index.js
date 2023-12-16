import React from 'react';
import TaskView from './task-panel';
import { TASKS } from './mockData';
const TaskPanel = () => {
  return (
    <div>
      <TaskView tasks={TASKS} />
    </div>
  );
};

export default TaskPanel;
