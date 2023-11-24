import { IDashReducer } from "../../../interfaces/hooks/context.interface";

export enum ActionTypeDashboard {
  IS_LOADING_UPDATE = 'IS_LOADING_UPDATE',
  BREADCRUMB_UPDATE = 'BREADCRUMB_UPDATE',
  PERMITS_ROLES = 'PERMITS_ROLES',
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
  SELECT_INVENTORY = "SELECT_INVENTORY",
  LOGOUT = "LOGOUT"
}

const initialState: IDashReducer.AppState = {
  breadcrumb: '',
  component: '',
  account: {
    information: false,
    password: false
  },
  inventory: {
    department_id: null,
    category_id: null,
    subcategory_id: null,
    products_id: null,
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
    case ActionTypeDashboard.IS_LOADING_UPDATE:
      return { ...state, isLoadingProduct: JSON.parse(action.payload.value) }
    case ActionTypeDashboard.BREADCRUMB_UPDATE:
      return { ...state, breadcrumb: action.payload.value }
    case ActionTypeDashboard.SELECT_COMPONENT:
      return { ...state, component: action.payload.value };
    case ActionTypeDashboard.ACCOUNT_TOGGLE_INFORMATION:
      return { ...state, account: { ...state.account, information: !state.account.information } }
    case ActionTypeDashboard.ACCOUNT_TOGGLE_PASSWORD:
      return { ...state, account: { ...state.account, password: !state.account.password } }
    case ActionTypeDashboard.SELECT_INVENTORY:
      const { name, value } = action.payload;
      switch (name) {
        case 'department_id':
          return { ...state, inventory: { department_id: value, category_id: "", subcategory_id: "", products_id: "" } }
        case 'category_id':
          return { ...state, inventory: { ...state.inventory, category_id: value, subcategory_id: "", products_id: "" } }
        case 'subcategory_id':
          return { ...state, inventory: { ...state.inventory, subcategory_id: value, products_id: "" } }
        case 'products_id':
          return { ...state, inventory: { ...state.inventory, products_id: value } }
        case 'departmentEmpty_id':
          return { ...state, inventory: initialState.inventory }
        case 'categoryEmpty_id':
          return { ...state, inventory: { ...state.inventory, category_id: "", subcategory_id: "", products_id: "" } }
        case 'subcategoryEmpty_id':
          return { ...state, inventory: { ...state.inventory, subcategory_id: "", products_id: "" } }
        case 'productsEmpty_id':
          return { ...state, inventory: { ...state.inventory, products_id: "" } }
        default:
          return state;
      }
    case ActionTypeDashboard.PERMITS_ROLES:
      return { ...state, permits: { ...state.permits, [action.payload.value]: true } }
    case ActionTypeDashboard.LOGOUT:
      return initialState
    default:
      return state;
  }
};

export { initialState, reducer };

