import { IDashReducer } from "../../../interfaces/hooks/context.interface";

export enum ActionTypeDashboard {
  PERMITS_ROLES = 'PERMITS_ROLES',
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
  SELECT_INVENTORY = "SELECT_INVENTORY",
  LOGOUT = "LOGOUT"
}

const initialState: IDashReducer.AppState = {
  component: "",
  account: {
    information: false,
    password: false
  },
  inventory: {
    department: null,
    category: null,
    subcategory: null,
    products: null,
  },
  permits: {
    sidebar_user: false,
    sidebar_inventory: false,
    sidebar_otro: false,
    inventory_department: false,
    inventory_category: false,
    inventory_subcategory: false,
    inventory_product: false
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
    case ActionTypeDashboard.SELECT_INVENTORY:
      const { name, value } = action.payload;
      switch (name) {
        case 'department':
          return { ...state, inventory: { department: value, category: "", subcategory: "", products: "" } }
        case 'category':
          return { ...state, inventory: { ...state.inventory, category: value, subcategory: "", products: "" } }
        case 'subcategory':
          return { ...state, inventory: { ...state.inventory, subcategory: value, products: "" } }
        case 'products':
          return { ...state, inventory: { ...state.inventory, products: value } }
        case 'departmentEmpty':
          return { ...state, inventory: initialState.inventory }
        case 'categoryEmpty':
          return { ...state, inventory: { ...state.inventory, category: "", subcategory: "", products: "" } }
        case 'subcategoryEmpty':
          return { ...state, inventory: { ...state.inventory, subcategory: "", products: "" } }
        case 'productsEmpty':
          return { ...state, inventory: { ...state.inventory, products: "" } }
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

// Función para manejar las actualizaciones en inventory
// const handleInventoryUpdate = (state: IDashReducer.AppState, payload: string | { name: string; value: string }): IDashReducer.AppState => {
//   switch (typeof payload) {
//     case 'string':
//       return state; // Mantener el estado actual si el payload es solo un string

//     case 'object':
//       if ('name' in payload) {
//         const { name, value } = payload;
//         return {
//           ...state,
//           inventory: { ...state.inventory, [name]: value },
//         };
//       }
//       return state; // Mantener el estado actual si el objeto no tiene la propiedad 'name'

//     default:
//       return state; // Mantener el estado actual si el payload no es ni string ni objeto
//   }
// };


export { initialState, reducer };

