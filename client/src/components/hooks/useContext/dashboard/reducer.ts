import { IDashboard } from "../../../utils/interface/dashboard";

export enum ActionType {
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
    case ActionType.SELECT_COMPONENT:
      return { ...state, component: action.payload };
    case ActionType.ACCOUNT_TOGGLE_INFORMATION:
      return { ...state, account: { ...state.account, information: !state.account.information } }
    case ActionType.ACCOUNT_TOGGLE_PASSWORD:
      return { ...state, account: { ...state.account, password: !state.account.password } }
    default:
      return state;
  }
};

export { initialState, reducer };

