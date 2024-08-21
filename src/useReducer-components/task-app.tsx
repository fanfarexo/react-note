import { ChangeEvent, useReducer, useState } from 'react';
import TaskList from './task-list';

export type TaskType = {
  id: number;
  text: string;
  done: boolean;
};
export type InitialTasksType = Array<TaskType>;

type TaskActionsType =
  | { type: 'add_task'; text: string }
  | { type: 'delete_task'; id: number }
  | { type: 'toggle_done'; id: number }
  | { type: 'edit_task'; id: number; text: string };

const initialTasks: InitialTasksType = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];

function taskReducer(state: InitialTasksType, action: TaskActionsType): InitialTasksType {
  switch (action.type) {
    case 'add_task':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          done: false,
        },
      ];
    case 'delete_task':
      return state.filter((task) => task.id !== action.id);
    case 'toggle_done':
      return state.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task));
    case 'edit_task':
      return state.map((task) => (task.id === action.id ? { ...task, text: action.text } : task));
    default: {
      throw Error('✅ Unknown action: ' + action);
    }
  }
}

function TaskApp() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (inputText: string) => {
    if (!inputValue.trim()) return setInputValue('');
    dispatch({ type: 'add_task', text: inputText });
    setInputValue('');
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: 'delete_task', id: taskId });
  };

  const handleToggleDone = (taskId: number) => {
    dispatch({ type: 'toggle_done', id: taskId });
  };

  const handleEditTask = (taskId: number, editText: string) => {
    dispatch({ type: 'edit_task', id: taskId, text: editText });
  };

  return (
    <>
      <h1>Prague itinerary</h1>
      <input type='text' placeholder='Add task' value={inputValue} onChange={onChange} />
      <button onClick={() => handleAddTask(inputValue)}>Add</button>
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleDone}
        onEditTask={handleEditTask}
      />
    </>
  );
}

export default TaskApp;
