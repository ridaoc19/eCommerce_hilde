import { useReducer } from 'react';
import { initialStateAdvertising, reducer } from './reducer';

function StateAdvertising() {
  const [advertisingContextState, advertisingContextDispatch] = useReducer(reducer, initialStateAdvertising);

  return { advertisingContextState, advertisingContextDispatch };
}

export default StateAdvertising;