import { IDashboard } from "../../../utils/interface/dashboard";

export enum ActionType {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  TOGGLE_ACCOUNT = "TOGGLE_ACCOUNT",
}
const initialState: IDashboard.AppState = {
  component: "",
  account: ""
};

const reducer = (state: IDashboard.AppState, action: IDashboard.AppAction): IDashboard.AppState => {
  switch (action.type) {
    case ActionType.SELECT_COMPONENT:
      return { ...state, component: action.payload };
    case ActionType.TOGGLE_ACCOUNT:
      return { ...state, account: action.payload }
    default:
      return state;
  }
};

export { initialState, reducer };

