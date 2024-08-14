import { useState } from 'react';

const FormObj = () => {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(40);

  const onChange = (e) => {
    setName(e.target.value);
  };
  const decrement = () => {
    setAge((prevAge) => prevAge - 1);
  };
  const increment = () => {
    setAge((prevAge) => prevAge + 1);
  };

  return (
    <>
      <p>
        Hello, {name}. You are {age}
      </p>
      <input type='text' value={name} onChange={onChange} />
      <button onClick={decrement}>Decrement age</button>
      <button onClick={increment}>Increment age</button>
    </>
  );
};

export default FormObj;
