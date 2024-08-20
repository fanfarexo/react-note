import { useState } from 'react';

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  let taskContent = isEditing ? (
    <>
      <input
        type='text'
        placeholder={task.text}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          onEdit(task.id, inputValue);
          setIsEditing(false);
        }}
      >
        Save
      </button>
    </>
  ) : (
    <>
      <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </>
  );

  return (
    <li>
      <label>
        <input type='checkbox' checked={task.done} onChange={() => onToggle(task.id)} />
        {taskContent}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </label>
    </li>
  );
};

export default TaskList;
