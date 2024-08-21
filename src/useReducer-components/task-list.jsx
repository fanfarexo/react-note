import { useState } from 'react';

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onDelete={onDeleteTask}
            onToggle={onToggleTask}
            onEdit={onEditTask}
          />
        </li>
      ))}
    </ul>
  );
}

function TaskItem({ task, onDelete, onToggle, onEdit }) {
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
    <>
      <label>
        <input type='checkbox' checked={task.done} onChange={() => onToggle(task.id)} />
        {taskContent}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </label>
    </>
  );
}

export default TaskList;
