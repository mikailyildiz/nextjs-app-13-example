"use client"

import { useReducer } from 'react';

function reducer(state:any, action:any) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      }
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      }
    }
  }
}


const initialState = { name: 'Taylor', age: 42 };

export default function ReducerExample() {

  const [state, dispatch] = useReducer(reducer, initialState);


  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e:any) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    }); 
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}