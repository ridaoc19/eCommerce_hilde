
// ==============================|| useContext ||============================== //

import { ReactNode } from "react";
import { ActionTypeDashboard } from "../../hooks/useContext/dash/reducer";
import { PermitsRoles } from "../user.interface";


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
      subcategory: string | null,
      products: string | null,
    };
    permits: {
      [key in PermitsRoles['id']]: boolean;
    }
  };

  type Name = "department" | "category" | "subcategory" | "products" | "departmentEmpty" | "categoryEmpty" | "subcategoryEmpty" | "productsEmpty"
  export type SelectAction = {
    type: ActionTypeDashboard;
    payload: { name: null | Name, value: string }
  };
  export type AppAction = SelectAction;

  export type Reducer = (state: AppState, action: AppAction) => AppState
}
