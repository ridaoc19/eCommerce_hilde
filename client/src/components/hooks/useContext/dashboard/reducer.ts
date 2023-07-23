import { IDashboard } from "../../../utils/interface/dashboard";

const initialState: IDashboard.AppState = {
  component: "user",
};

const reducer = (state: IDashboard.AppState, action: IDashboard.AppAction): IDashboard.AppState => {
  switch (action.type) {
    case IDashboard.ActionType.SELECT_COMPONENT:
      return { ...state, component: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };

