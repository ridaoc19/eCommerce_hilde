
// ==============================|| useContext ||============================== //

import { ReactNode } from "react";
import { IDash } from "../features/dash/dash.interface";

export interface IContextData {
  dashboard: {
    state: IDash.AppState;
    dispatch: React.Dispatch<IDash.AppAction>;
  };
}

export interface StoreContextProps {
  children: ReactNode;
}


