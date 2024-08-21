import { ChangeEvent, useState } from 'react';

type TaskAddProps = {
  onAddTask: (text: string) => void;
};

const TaskAdd = ({ onAddTask }: TaskAddProps) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onAdd = () => {
    if (!inputValue.trim()) return setInputValue('');
    onAddTask(inputValue);
    setInputValue('');
  };

  return (
    <>
      <input type='text' placeholder='Add task' value={inputValue} onChange={onChange} />
      <button onClick={onAdd}>Add</button>
    </>
  );
};

export default TaskAdd;
