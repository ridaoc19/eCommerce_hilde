import { useReducer } from 'react';
import { initialState, reducer } from './reducer';

function StateError() {
  const [errorContextState, errorContextDispatch] = useReducer(reducer, initialState);

  return { errorContextState, errorContextDispatch };
}

export default StateError;