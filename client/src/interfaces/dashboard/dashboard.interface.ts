// ==============================|| Dashboard ||============================== //

import { ActionTypeDashboard } from "../../components/hooks/useContext/dashboard/reducer";



export namespace IDashboard {

  export type SelectAction = { type: ActionTypeDashboard; payload: string };
  // export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: string };

  export type AppState = { component: string, account: { information: boolean, password: boolean } };
  export type AppAction = SelectAction;
}









export namespace IInventory {
    export type Routes = "registre" | "login" | "token" | "change" | "reset" | "account";
  
    export interface InventoryProps {
      _id?: string;
      name: string;
      lastName: string;
      email: string;
      phone: string;
      password?: string;
      routes?: Routes;
      components?: string;
      // confirmPassword: string;
    }
  
    export interface ResponseInventory extends Exclude<InventoryProps, "routes" | "type"> {
      _id: string;
      verified: string;
      token: string | null;
      roles: string;
    }
  
    export interface PostState {
      data: ResponseInventory | null;
      loading: boolean;
      error: null | {} | string;
    }
  
    export interface PropsForm {
      handleOnChange: () => void;
      change: any;
      errorBack: PostState["error"];
      status: string;
    }
  }