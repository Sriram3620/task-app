import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './index.css';

function Task({ task, onToggleCompletion, deleteTask }) {
  const { id, title: initialTitle, description: initialDescription, priority: initialPriority, dueDate: initialDueDate, completed: initialCompleted } = task;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [completed, setCompleted] = useState(initialCompleted);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setCompleted(initialCompleted);
  }, [initialCompleted]);

  const taskFadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
  });

  const handleComplete = () => {
    const newCompletedStatus = !completed;
    setCompleted(newCompletedStatus);
    onToggleCompletion(id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setDueDate(initialDueDate);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTask(id);
  };

  return (
    <animated.div className={`task ${completed ? 'completed' : ''}`} style={taskFadeIn}>
      <h3 className='task-head'>{title}</h3>

      {editing ? (
        <form onSubmit={handleSave}>
          <input className='mb-2 task-input-box'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <textarea className='mb-2 task-input-box'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <input className='mb-2 task-input-box'
            type="text"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <br />
          <input className='mb-4 task-input-box'
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <p className='task-des'>{description}</p>
          <p className=''>Priority: {priority}</p>
          <p>Due Date: {dueDate}</p>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleComplete}
          />
          <button className='edit-btn' onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </animated.div>
  );
}

export default Task;
