
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
  export type AppState = {
    component: string,
    account: {
      information: boolean,
      password: boolean
    };
    inventory: {
      department: string | null,
      category: string | null,
      subcategory: string | null
    };
    itemSidebar: ISidebar.ItemRole[]
  };

  type Name = "department" |"category" |"subcategory"
  export type SelectAction = {
    type: ActionTypeDashboard;
    payload: { name: null | Name, value: string }
  };
  export type AppAction = SelectAction;

  export type Reducer = (state: AppState, action: AppAction) => AppState
}
