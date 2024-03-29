import { ReactNode, createContext } from "react";
import StateAdvertising from "./advertising/State";
import { IAdvertisingReducer, initialStateAdvertising } from "./advertising/reducer";
import StateError from "./error/State";
import { IErrorReducer, initialStateError } from "./error/reducer";
import StateNavigation from "./navigation/State";
import { INavigatorReducer, initialStateNavigation } from "./navigation/reducer";
import StateContextDashboard, { initialStateDashboard } from "./dash/State";

// Obtén el tipo de retorno de la función StateDashboard
type StateDashboardReturnType = ReturnType<typeof StateContextDashboard>;
export interface IContextData {
  dashboard: StateDashboardReturnType
  // dashboard: {
  //   state: IDashReducer.AppState;
  //   dispatch: React.Dispatch<IDashReducer.AppAction>;
  // };
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
    errorContextDispatch: React.Dispatch<IErrorReducer.AppAction>
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
    dispatchDashboard: () => { },
    stateDashboard: initialStateDashboard,
    clearUser: () => { }
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
  const dashboard = StateContextDashboard();
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
