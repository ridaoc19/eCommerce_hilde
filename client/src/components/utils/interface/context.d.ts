import { IDashboard } from "./dashboard";

// ==============================|| useContext ||============================== //

export interface IContextData {
  dashboard: {
    state: IDashboard.AppState;
    dispatch: React.Dispatch<IDashboard.UserAction>;
  };
}

export interface StoreContextProps {
  children: ReactNode;
}
