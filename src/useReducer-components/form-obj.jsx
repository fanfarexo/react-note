import { useReducer } from 'react';

const initialState = { name: 'Taylor', age: 40 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'change_name': {
      return {
        name: action.nextName,
        age: state.age,
      };
    }
    case 'decrement_age': {
      return {
        name: state.name,
        age: state.age - 1,
      };
    }
    case 'increment_age': {
      return {
        name: state.name,
        age: state.age + 1,
      };
    }
  }
  throw Error('Unknown action: ', action.type);
};

const FormObj = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) => {
    dispatch({
      type: 'change_name',
      nextName: e.target.value,
    });
  };
  const decrement = () => {
    dispatch({ type: 'decrement_age' });
  };
  const increment = () => {
    dispatch({ type: 'increment_age' });
  };

  return (
    <>
      <p>
        Hello, {state.name}. You are {state.age}
      </p>
      <input type='text' value={state.name} onChange={onChange} />
      <button onClick={decrement}>Decrement age</button>
      <button onClick={increment}>Increment age</button>
    </>
  );
};

export default FormObj;
