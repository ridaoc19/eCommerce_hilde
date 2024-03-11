import { useReducer } from 'react';
import { initialStateError, reducer } from './reducer';

function StateError() {
  const [errorContextState, errorContextDispatch] = useReducer(reducer, initialStateError);

  return { errorContextState, errorContextDispatch };
}

export default StateError;