
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'High', dueDate: '2024-05-10', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'Medium', dueDate: '2024-05-12', completed: false },
    { id: 3, title: 'Task 3', description: 'Description 3', priority: 'Low', dueDate: '2024-05-15', completed: false },
  ]);

  return (
    <div className='container-fluid'>
      <div className='row'>
      <TaskForm  tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;