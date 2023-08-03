import { useReducer } from 'react';
import { initialState, reducer } from './reducer';

function StateDashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
}

export default StateDashboard;