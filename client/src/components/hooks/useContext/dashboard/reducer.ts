import { IDashboard } from "../../../utils/interface/dashboard";

export enum ActionType {
  SELECT_COMPONENT = "SELECT_COMPONENT",
}

const initialState: IDashboard.AppState = {
  component: "",
};

const reducer = (state: IDashboard.AppState, action: IDashboard.AppAction): IDashboard.AppState => {
  switch (action.type) {
    case ActionType.SELECT_COMPONENT:
      return { ...state, component: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };

