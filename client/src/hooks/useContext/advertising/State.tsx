import { useReducer } from 'react';
import { initialState, reducer } from './reducer';

function StateAdvertising() {
  const [advertisingContextState, advertisingContextDispatch] = useReducer(reducer, initialState);

  return { advertisingContextState, advertisingContextDispatch };
}

export default StateAdvertising;