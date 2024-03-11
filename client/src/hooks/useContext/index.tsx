import { ReactNode, createContext } from "react";
import { IDashReducer, initialStateDashboard } from "../../hooks/useContext/dash/reducer";
import StateAdvertising from "./advertising/State";
import { IAdvertisingReducer, initialStateAdvertising } from "./advertising/reducer";
import StateDashboard from "./dash/State";
import StateError from "./error/State";
import { IErrorReducer, initialStateError } from "./error/reducer";
import StateNavigation from "./navigation/State";
import { INavigatorReducer, initialStateNavigation } from "./navigation/reducer";

export interface IContextData {
  dashboard: {
    state: IDashReducer.AppState;
    dispatch: React.Dispatch<IDashReducer.AppAction>;
  };
  navigation: {
    navigationContextState: INavigatorReducer.AppState,
    navigationContextDispatch: React.Dispatch<INavigatorReducer.AppAction<INavigatorReducer.AppState>>
    // tools: {
    //   solicitud: () => void
    // }
  };
  advertising: {
    advertisingContextState: IAdvertisingReducer.AppState,
    advertisingContextDispatch: React.Dispatch<IAdvertisingReducer.AppAction<IAdvertisingReducer.AppState>>
  }
  error: {
    errorContextState: IErrorReducer.AppState,
    errorContextDispatch: React.Dispatch<IErrorReducer.AppAction<IErrorReducer.AppState>>
  }
}

export interface StoreContextProps {
  children: ReactNode;
}

const initialContext: IContextData = {
  advertising: {
    advertisingContextDispatch: () => { },
    advertisingContextState: initialStateAdvertising
  },
  dashboard: {
    dispatch: () => { },
    state: initialStateDashboard
  },
  error: {
    errorContextDispatch: () => { },
    errorContextState: initialStateError
  },
  navigation: {
    navigationContextDispatch: () => { },
    navigationContextState: initialStateNavigation
  }
}

export const CreateContext = createContext<IContextData>(initialContext);

export const StoreContext = ({ children }: StoreContextProps) => {
  const dashboard = StateDashboard();
  const navigation = StateNavigation()
  const advertising = StateAdvertising()
  const error = StateError()

  return (
    <CreateContext.Provider
      value={{ dashboard, navigation, advertising, error }}>
      {children}
    </CreateContext.Provider>
  );
}
