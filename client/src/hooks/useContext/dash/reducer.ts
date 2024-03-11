import { PermitsRoles } from "../../../interfaces/user.interface";

export namespace IDashReducer {
  export type AppState = {
    component: string,
    account: {
      information: boolean,
      password: boolean
    };
    permits: {
      [key in PermitsRoles['id']]: boolean;
    }
  };

  export type NameInventory = "department_id" | "category_id" | "subcategory_id" | "products_id" | "departmentEmpty_id" | "categoryEmpty_id" | "subcategoryEmpty_id" | "productsEmpty_id"
  export type SelectAction = {
    type: ActionTypeDashboard;
    payload: { name: null | NameInventory, value: string }
  };
  export type AppAction = SelectAction;

  export type Reducer = (state: AppState, action: AppAction) => AppState
}

export enum ActionTypeDashboard {
  PERMITS_ROLES = 'PERMITS_ROLES',
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
  LOGOUT = "LOGOUT"
}

const initialStateDashboard: IDashReducer.AppState = {
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
      return initialStateDashboard
    default:
      return state;
  }
};

export { initialStateDashboard, reducer };

