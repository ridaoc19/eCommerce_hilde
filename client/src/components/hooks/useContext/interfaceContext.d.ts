
// export namespace InterfaceContext {
//   interface Dashboard {
//     state: any;
//     dispatch: any;
//   }


//   interface MyContextData {
//     dashboard: Dashboard
//   };

// }

// export namespace Reducer {
//   type AppState = {
//     component: string;
//   };

//   enum ActionType {
//     SELECT_COMPONENT = "SELECT_COMPONENT",
//   }

//   type SelectAction = {
//     type: ActionType.SELECT_COMPONENT;
//     payload: any;
//   };

//   type AppAction = SelectAction;

// }




// export namespace IDashboard {
//   enum ActionType { SELECT_COMPONENT = "SELECT_COMPONENT" }
//   type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: any; };

//   type AppState = { component: string; };
//   type AppAction = SelectAction;
// }

// export interface IContextData {
//   dashboard: AppState | AppAction
// }








// export type AppState = {
//   count: number;
// };

// export enum ActionType {
//   INCREMENT = "INCREMENT",
//   DECREMENT = "DECREMENT",
// }

// type IncrementAction = {
//   type: ActionType.INCREMENT;
// };

// type DecrementAction = {
//   type: ActionType.DECREMENT;
// };

// export type AppAction = IncrementAction | DecrementAction;


// const initialState: AppState = {
//   count: 0,
// };