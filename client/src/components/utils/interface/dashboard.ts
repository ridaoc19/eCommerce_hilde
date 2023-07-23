// ==============================|| Dashboard ||============================== //

export namespace IDashboard {
  export enum ActionType {
    SELECT_COMPONENT = "SELECT_COMPONENT",
  }
  export type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: any };
  
  export type AppState = { component: string };
  export type AppAction = any;
}
