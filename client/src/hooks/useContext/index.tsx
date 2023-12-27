import { ReactNode, createContext } from "react";
import { IDashReducer } from "../../hooks/useContext/dash/reducer";
import StateDashboard from "./dash/State";
import StateNavigation from "./navigation/State";

export interface IContextData {
  dashboard: {
    state: IDashReducer.AppState;
    dispatch: React.Dispatch<IDashReducer.AppAction>;
  };
  navigation: {
    tools: {
      solicitud: () => void
    }
  }
}

export interface StoreContextProps {
  children: ReactNode;
}

export const CreateContext = createContext<IContextData | null>(null);

export const StoreContext = ({ children }: StoreContextProps) => {
  const dashboard = StateDashboard();
  const navigation = StateNavigation()

  return (
    <CreateContext.Provider
      value={{ dashboard, navigation }}>
      {children}
    </CreateContext.Provider>
  );
}
