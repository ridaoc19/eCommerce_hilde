import { IDashboard } from "../../../../interfaces/context.interface";

export enum ActionTypeDashboard {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
}
const initialState: IDashboard.AppState = {
  component: "",
  account: {
    information: false,
    password: false
  }
};

const reducer = (state: IDashboard.AppState, action: IDashboard.AppAction): IDashboard.AppState => {
  switch (action.type) {
    case ActionTypeDashboard.SELECT_COMPONENT:
      return { ...state, component: action.payload };
    case ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION:
      return { ...state, account: { ...state.account, information: !state.account.information } }
    case ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD:
      return { ...state, account: { ...state.account, password: !state.account.password } }
    default:
      return state;
  }
};

export { initialState, reducer };

