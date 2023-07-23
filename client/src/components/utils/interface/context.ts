import { IDashboard } from "./dashboard";

// ==============================|| useContext ||============================== //
export interface IContextData {
  dashboard: IDashboard.AppState | IDashboard.AppAction;
}