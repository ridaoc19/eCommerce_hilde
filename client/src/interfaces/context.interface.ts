
// ==============================|| useContext ||============================== //

import { ReactNode } from "react";
import { IDashboard } from "./dashboard/dashboard.interface";

export interface IContextData {
  dashboard: {
    state: IDashboard.AppState;
    dispatch: React.Dispatch<IDashboard.AppAction>;
  };
}

export interface StoreContextProps {
  children: ReactNode;
}