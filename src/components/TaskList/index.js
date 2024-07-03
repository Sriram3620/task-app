import React, { useState, useEffect } from 'react';
import Task from '../Task';
import './index.css';

function TaskList({ tasks, setTasks }) {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, [setTasks]);

  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filteredTasks = filter === 'all' ? tasks :
    filter === 'completed' ? tasks.filter(task => task.completed) :
    tasks.filter(task => !task.completed);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="col-12 col-md-7 m-2 taskk-bg-con">
      <div className="filter-buttons filter-con">
        <button onClick={() => handleFilterChange('all')} className="filter-btn">All</button>
        <button onClick={() => handleFilterChange('completed')} className="filter-btn">Completed</button>
        <button onClick={() => handleFilterChange('pending')} className="filter-btn">Pending</button>
      </div>
      <div className='Task-list-con'>
        {filteredTasks.map(task => (
          <Task key={task.id} task={task} deleteTask={deleteTask} onToggleCompletion={toggleTaskCompletion} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
