import React from 'react';
import { IDashboard } from '../interfaceContext';

// types.ts
export type AppState = {
  component: string;
};

export enum ActionType {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  // DECREMENT = "DECREMENT",
}

type IncrementAction = {
  type: ActionType.SELECT_COMPONENT;
  payload: any;
};

// type DecrementAction = {
//   type: ActionType.DECREMENT;
// };

export type AppAction = IncrementAction;


const initialState: IDashboard.AppState = {
  component: "user",
};

const reducer = (state: IDashboard.AppState, action: IDashboard.AppAction): IDashboard.AppState => {
  switch (action.type) {
    case ActionType.SELECT_COMPONENT:
      return { ...state, component: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
