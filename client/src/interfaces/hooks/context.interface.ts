
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
    isLoadingProduct: boolean,
    breadcrumb: string,
    component: string,
    account: {
      information: boolean,
      password: boolean
    };
    inventory: {
      department_id: string | null,
      category_id: string | null,
      subcategory_id: string | null,
      products_id: string | null,
    };
    permits: {
      [key in PermitsRoles['id']]: boolean;
    }
  };

  export type NameInventory = "department_id" | "category_id" | "subcategory_id" | "products_id" | "departmentEmpty_id" | "categoryEmpty_id" | "subcategoryEmpty_id" | "productsEmpty_id"
  export type SelectAction = {
    type: ActionTypeDashboard;
    payload: { name: null | NameInventory, value: string }
  };
  export type AppAction = SelectAction;

  export type Reducer = (state: AppState, action: AppAction) => AppState
}
