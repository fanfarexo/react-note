import { ChangeEvent, useReducer } from 'react';

type initialStateType = { name: string; age: number };

const CHANGE_NAME = 'change_name';
const DECREMENT_AGE = 'decrement_age';
const INCREMENT_AGE = 'increment_age';

type actionType =
  | { type: typeof CHANGE_NAME; nextName: string }
  | { type: typeof DECREMENT_AGE }
  | { type: typeof INCREMENT_AGE };

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
      type: CHANGE_NAME,
      nextName: e.target.value,
    });
  };
  const decrement = () => {
    dispatch({ type: DECREMENT_AGE });
  };
  const increment = () => {
    dispatch({ type: INCREMENT_AGE });
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
