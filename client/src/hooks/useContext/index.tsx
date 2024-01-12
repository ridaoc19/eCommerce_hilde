import { ReactNode, createContext } from "react";
import { IDashReducer } from "../../hooks/useContext/dash/reducer";
import StateDashboard from "./dash/State";
import StateNavigation from "./navigation/State";
import { INavigatorReducer } from "./navigation/reducer";
import { IAdvertisingReducer } from "./advertising/reducer";
import StateAdvertising from "./advertising/State";

export interface IContextData {
  dashboard: {
    state: IDashReducer.AppState;
    dispatch: React.Dispatch<IDashReducer.AppAction>;
  };
  navigation: {
    navigationContextState: INavigatorReducer.AppState,
    navigationContextDispatch: React.Dispatch<INavigatorReducer.AppAction<INavigatorReducer.AppState>>
    tools: {
      solicitud: () => void
    }
  };
  advertising: {
    advertisingContextState: IAdvertisingReducer.AppState,
    advertisingContextDispatch: React.Dispatch<IAdvertisingReducer.AppAction<IAdvertisingReducer.AppState>>
  }
}

export interface StoreContextProps {
  children: ReactNode;
}

export const CreateContext = createContext<IContextData | null>(null);

export const StoreContext = ({ children }: StoreContextProps) => {
  const dashboard = StateDashboard();
  const navigation = StateNavigation()
  const advertising = StateAdvertising()

  return (
    <CreateContext.Provider
      value={{ dashboard, navigation, advertising }}>
      {children}
    </CreateContext.Provider>
  );
}
