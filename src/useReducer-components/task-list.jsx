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

  let taskContent = isEditing ? (
    <>
      <input
        type='text'
        value={task.text}
        onChange={(e) => {
          onEdit(task.id, e.target.value);
        }}
      />
      <button
        onClick={() => {
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
