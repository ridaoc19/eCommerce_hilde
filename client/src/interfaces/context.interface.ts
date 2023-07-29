
// ==============================|| useContext ||============================== //

import { ReactNode } from "react";
import { ActionTypeDashboard } from "../components/hooks/useContext/dashboard/reducer";

export interface IContextData {
  dashboard: {
    state: IDashboard.AppState;
    dispatch: React.Dispatch<IDashboard.AppAction>;
  };
}

export interface StoreContextProps {
  children: ReactNode;
}


export namespace IDashboard {

  export type SelectAction = { type: ActionTypeDashboard; payload: string };
  // export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: string };

  export type AppState = { component: string, account: { information: boolean, password: boolean } };
  export type AppAction = SelectAction;
}