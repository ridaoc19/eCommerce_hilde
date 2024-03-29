import { ReactNode } from "react";

export namespace IErrorReducer {
  export enum keyDashboard {
    MESSAGE_UPDATE = 'MESSAGE_UPDATE',
    MESSAGE_DELETE = 'MESSAGE_DELETE',
  }

  export type AppState = {
    errors: Array<{
      field: string | 'general';
      status_code: number,
      message: string | ReactNode
    }>;
  };

  export type AppAction = {
    type: keyDashboard;
    payload: AppState['errors']
  };

  export type Reducer = (state: AppState, action: AppAction) => AppState
}

const initialStateError: IErrorReducer.AppState = {
  errors: []
};

const reducer: IErrorReducer.Reducer = (state, action) => {

  switch (action.type) {
    case IErrorReducer.keyDashboard.MESSAGE_UPDATE:
      // const errorsPayload = action.payload.filter(e => e.field === 'general')
      const errors = action.payload.length === 0 ? [] : [...state.errors, ...action.payload]
      return { ...state, errors }

    case IErrorReducer.keyDashboard.MESSAGE_DELETE:
      return { ...state, errors: action.payload }

    default:
      return state;
  }
};

export { initialStateError, reducer };

