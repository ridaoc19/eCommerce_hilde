import { RequestMapNavigation, RouteNavigation } from "../../../services/navigationRequest";
import { ErrorNavigation } from '../../../services/navigationApi'

export namespace INavigatorReducer {
  export type AppState = {
    hierarchicalData: {
      data: RequestMapNavigation[RouteNavigation.NavigationMenu]['data'] | []
      isLoading: boolean
      isFetching: boolean
      errors: ErrorNavigation['errors'] | []
    },
  };

  export type AppAction<T> = {
    type: keyof T;
    payload: T[keyof T]
  };

  export type Reducer = (state: AppState, action: AppAction<AppState>) => AppState
}

const initialState: INavigatorReducer.AppState = {
  hierarchicalData: {
    isLoading: false,
    isFetching: false,
    data: [],
    errors: []
  }
};

const reducer: INavigatorReducer.Reducer = (state, action) => {

  switch (action.type) {
    case "hierarchicalData":
      return { ...state, hierarchicalData: action.payload }
    default:
      return state;
  }
};

export { initialState, reducer };

