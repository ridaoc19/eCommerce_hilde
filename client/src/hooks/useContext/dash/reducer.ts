import Svg from "../../../assets/icons/Svg";
// import { ISidebar } from "../../../interfaces/components/layout/layout.interface";
import { IDashReducer } from "../../../interfaces/hooks/context.interface";

export enum ActionTypeDashboard {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
  SELECT_INVENTORY = "SELECT_INVENTORY"
}

// const item: ISidebar.ItemRole[] = [
//   { id: 1, value: "user", type: "Usuarios", svg: Svg({ type: "user" }), roles: ["super", "admin", 'edit', 'visitant'] },
//   { id: 2, value: "inventory", type: "Inventario", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
//   { id: 3, value: "otro", type: "Otro", svg: Svg({ type: "padlock" }), roles: ['visitant', "super", 'admin'] }
// ];

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
  },
  itemSidebar: [
    { id: 1, value: "user", type: "Usuarios", svg: Svg({ type: "user" }), roles: ["super", "admin", 'edit', 'visitant'] },
    { id: 2, value: "inventory", type: "Inventario", svg: Svg({ type: "shop" }), roles: ['super', 'admin'] },
    { id: 3, value: "otro", type: "Otro", svg: Svg({ type: "padlock" }), roles: ['visitant', "super", 'admin'] }
  ]
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
      return {
        ...state,
        inventory: {
          ...state.inventory,
          ...action.payload, // Ahora directamente usamos el payload
        },
      };
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

