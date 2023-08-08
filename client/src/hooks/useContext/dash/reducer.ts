import Svg from "../../../assets/icons/Svg";
// import { ISidebar } from "../../../interfaces/components/layout/layout.interface";
import { IDashReducer } from "../../../interfaces/hooks/context.interface";

export enum ActionTypeDashboard {
  SELECT_COMPONENT = "SELECT_COMPONENT",
  ACCOUNT_TOGGLE_INFORMATION = "ACCOUNT_TOGGLE_INFORMATION",
  ACCOUNT_TOGGLE_PASSWORD = "ACCOUNT_TOGGLE_PASSWORD",
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
    department: false,
    category: false,
    subcategory: false
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

