import { ActionTypeDashboard } from "../../../hooks/useContext/dashboard/reducer";

export namespace IDash {

  export type SelectAction = { type: ActionTypeDashboard; payload: string };
  // export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: string };

  export type AppState = { component: string, account: { information: boolean, password: boolean } };
  export type AppAction = SelectAction;
}