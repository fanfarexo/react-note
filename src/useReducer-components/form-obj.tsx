import { ChangeEvent, useReducer } from 'react';

type initialStateType = { name: string; age: number };

type actionType =
  | { type: 'change_name'; nextName: string }
  | { type: 'decrement_age' }
  | { type: 'increment_age' };

const initialState = { name: 'Taylor', age: 40 };

const reducer = (state: initialStateType, action: actionType): initialStateType => {
  switch (action.type) {
    case 'change_name': {
      return {
        ...state,
        name: action.nextName,
      };
    }
    case 'decrement_age': {
      return {
        ...state,
        age: state.age - 1,
      };
    }
    case 'increment_age': {
      return {
        ...state,
        age: state.age + 1,
      };
    }
  }
};

const FormObj = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
