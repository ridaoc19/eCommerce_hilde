// ==============================|| Dashboard ||============================== //

import { ActionType } from "../../hooks/useContext/dashboard/reducer";

export namespace IDashboard {
  
  export type SelectAction = { type: ActionType; payload: string };
  // export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: string };
  
  type AppState = { component: string, account: {information: boolean, password: boolean} };
  type AppAction = SelectAction;
}
