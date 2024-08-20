import { useState } from 'react';
import TaskList from './task-list';

const TaskApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
  ]);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onAdd = (text) => {
    if (!inputValue.trim()) return setInputValue('');
    const newTasks = [
      ...tasks,
      {
        id: new Date().getTime(),
        text,
        done: false,
      },
    ];
    setTasks(newTasks);
    setInputValue('');
  };

  const onDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const onToggle = (id) => {
    const newTasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
    setTasks(newTasks);
  };

  return (
    <>
      <h1>Prague itinerary</h1>
      <input type='text' placeholder='Add task' value={inputValue} onChange={onChange} />
      <button onClick={() => onAdd(inputValue)}>Add</button>
      <TaskList tasks={tasks} onDelete={onDelete} onToggle={onToggle} />
    </>
  );
};

export default TaskApp;
