
// ==============================|| useContext ||============================== //

import { ReactNode } from "react";
import { ActionTypeDashboard } from "../../hooks/useContext/dash/reducer";
import { ISidebar } from "../components/layout/layout.interface";


export namespace IContext {
  export interface IContextData {
    dashboard: {
      state: IDashReducer.AppState;
      dispatch: React.Dispatch<IDashReducer.AppAction>;
    };
  }

  export interface StoreContextProps {
    children: ReactNode;
  }
}

export namespace IDashReducer {
  export type SelectAction = { type: ActionTypeDashboard; payload: string };
  // export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: string };
  export type AppState = { 
    component: string, 
    account: { 
      information: boolean, 
      password: boolean 
    }; 
    inventory:{
      department: boolean,
      category: boolean,
      subcategory: boolean
    };
    itemSidebar: ISidebar.ItemRole[] 
  };
  export type AppAction = SelectAction;
  export type Reducer = (state: AppState, action: AppAction) => AppState
}
