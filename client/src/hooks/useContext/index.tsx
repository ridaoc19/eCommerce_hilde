import { ReactNode, createContext } from "react";
import StateAdvertising from "./advertising/State";
import { IAdvertisingReducer, initialStateAdvertising } from "./advertising/reducer";
import StateContextDashboard, { initialStateDashboard } from "./dash/State";
import StateMessages from "./messages/State";
import StateNavigation from "./navigation/State";
import { INavigatorReducer, initialStateNavigation } from "./navigation/reducer";
import { IMessagesReducer, initialStateMessages } from "./messages/reducer";

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
  messages: {
    messagesContextState: IMessagesReducer.AppState,
    messagesContextDispatch: React.Dispatch<IMessagesReducer.AppAction>
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
  messages: {
    messagesContextDispatch: () => { },
    messagesContextState: initialStateMessages
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
  const messages = StateMessages()
  return (
    <CreateContext.Provider
      value={{ dashboard, navigation, advertising, messages }}>
      {children}
    </CreateContext.Provider>
  );
}
