import { IDashReducer } from "../../../interfaces/hooks/context.interface";

export enum ActionTypeDashboard {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
}
const initialState: IDashReducer.AppState = {
  component: "",
  account: {
    information: false,
    password: false
  }
};

const reducer: IDashReducer.Reducer = (state, action) => {
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

