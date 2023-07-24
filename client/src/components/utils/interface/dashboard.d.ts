// ==============================|| Dashboard ||============================== //

import { ActionType } from "../../hooks/useContext/dashboard/reducer";

export namespace IDashboard {
  
  export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: string };
  
  type AppState = { component: string };
  type AppAction = SelectAction;
}
