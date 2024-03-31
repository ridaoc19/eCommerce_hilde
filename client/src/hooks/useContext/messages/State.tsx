import { useReducer } from 'react';
import { initialStateMessages, reducer } from './reducer';

function StateMessages() {
  const [messagesContextState, messagesContextDispatch] = useReducer(reducer, initialStateMessages);

  return { messagesContextState, messagesContextDispatch };
}

export default StateMessages;