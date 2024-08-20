const TaskList = ({ tasks, onDelete, onToggle }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <li>
      <span
        onClick={() => onToggle(task.id)}
        style={{ textDecoration: task.done ? 'line-through' : 'none' }}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskList;
