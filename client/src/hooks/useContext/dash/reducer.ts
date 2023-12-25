import { IDashReducer } from "../../../interfaces/hooks/context.interface";

export enum ActionTypeDashboard {
  PERMITS_ROLES = 'PERMITS_ROLES',
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
  LOGOUT = "LOGOUT"
}

const initialState: IDashReducer.AppState = {
  component: '',
  account: {
    information: false,
    password: false
  },
  permits: {
    super: false,
    admin: false,
    edit: false,
    visitant: false,
  }
};

const reducer: IDashReducer.Reducer = (state, action) => {

  switch (action.type) {
    case ActionTypeDashboard.SELECT_COMPONENT:
      return { ...state, component: action.payload.value };
    case ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION:
      return { ...state, account: { ...state.account, information: !state.account.information } }
    case ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD:
      return { ...state, account: { ...state.account, password: !state.account.password } }
    case ActionTypeDashboard.PERMITS_ROLES:
      return { ...state, permits: { ...state.permits, [action.payload.value]: true } }
    case ActionTypeDashboard.LOGOUT:
      return initialState
    default:
      return state;
  }
};

export { initialState, reducer };

