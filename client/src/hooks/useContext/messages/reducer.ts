import { ReactNode } from "react";

export namespace IMessagesReducer {
  export enum keyDashboard {
    MESSAGE_UPDATE = 'MESSAGE_UPDATE',
    MESSAGE_DELETE = 'MESSAGE_DELETE',
  }

  export type AppState = {
    messages: Array<{
      field: string | 'general';
      status_code: number,
      message: string | ReactNode
    }>;
  };

  export type AppAction = {
    type: keyDashboard;
    payload: AppState['messages']
  };

  export type Reducer = (state: AppState, action: AppAction) => AppState
}

const initialStateMessages: IMessagesReducer.AppState = {
  messages: []
};

const reducer: IMessagesReducer.Reducer = (state, action) => {

  switch (action.type) {
    case IMessagesReducer.keyDashboard.MESSAGE_UPDATE:
      // const messagesPayload = action.payload.filter(e => e.field === 'general')
      const messages = action.payload.length === 0 ? [] : [...state.messages, ...action.payload]
      return { ...state, messages }

    case IMessagesReducer.keyDashboard.MESSAGE_DELETE:
      return { ...state, messages: action.payload }

    default:
      return state;
  }
};

export { initialStateMessages, reducer };

