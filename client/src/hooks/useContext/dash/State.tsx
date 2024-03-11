import { useReducer } from 'react';
import { initialStateDashboard, reducer } from './reducer';

function StateDashboard() {
  const [state, dispatch] = useReducer(reducer, initialStateDashboard);

  return { state, dispatch };
}

export default StateDashboard;