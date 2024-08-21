import { ChangeEvent, useReducer, useState } from 'react';
import TaskList from './task-list';
import { produce } from 'immer';

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

const ACTIONS = {
  ADD_TASK: 'add_task',
  DELETE_TASK: 'delete_task',
  TOGGLE_DONE: 'toggle_done',
  EDIT_TASK: 'edit_task',
} as const;

const initialTasks: InitialTasksType = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];

function taskReducer(state: InitialTasksType, action: TaskActionsType): InitialTasksType {
  return produce(state, (draft) => {
    switch (action.type) {
      case ACTIONS.ADD_TASK: {
        draft.push({
          id: Date.now(),
          text: action.text,
          done: false,
        });
        break;
      }
      case ACTIONS.DELETE_TASK: {
        const deleteIndex = draft.findIndex((task) => task.id === action.id);
        if (deleteIndex !== -1) {
          draft.splice(deleteIndex, 1);
        }
        break;
      }
      case ACTIONS.TOGGLE_DONE: {
        const toggleTask = draft.find((task) => task.id === action.id);
        if (toggleTask) {
          toggleTask.done = !toggleTask.done;
        }
        break;
      }
      case ACTIONS.EDIT_TASK: {
        const editTask = draft.find((task) => task.id === action.id);
        if (editTask) {
          editTask.text = action.text;
        }
        break;
      }
      default:
        break;
    }
  });
}

function TaskApp() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (inputText: string) => {
    if (!inputValue.trim()) return setInputValue('');
    dispatch({ type: ACTIONS.ADD_TASK, text: inputText });
    setInputValue('');
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: ACTIONS.DELETE_TASK, id: taskId });
  };

  const handleToggleDone = (taskId: number) => {
    dispatch({ type: ACTIONS.TOGGLE_DONE, id: taskId });
  };

  const handleEditTask = (taskId: number, editText: string) => {
    dispatch({ type: ACTIONS.EDIT_TASK, id: taskId, text: editText });
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
