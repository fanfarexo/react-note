import { useState } from 'react';
import { InitialTasksType, TaskType } from './task-app';

type TaskListProps = {
  tasks: InitialTasksType;
  onDeleteTask: (id: number) => void;
  onToggleTask: (id: number) => void;
  onEditTask: (id: number, text: string) => void;
};

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }: TaskListProps) {
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

type TaskItemProps = {
  task: TaskType;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};

function TaskItem({ task, onDelete, onToggle, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const taskContent = isEditing ? (
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
