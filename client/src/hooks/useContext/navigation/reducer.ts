
export enum ActionTypeNavigation {
  NAVIGATION_UPDATE = 'NAVIGATION_UPDATE',
  NAVIGATION_UPDAgE = 'NAVIGATION_UPDAgE',
}

// export type UpdateState<T> = (
//   data: { name: keyof T; value: T[keyof T] }[]
// ) => void
// const updateState: UpdateState<InitialState> = (data) => {
//   data.forEach(({ name, value }) => {
//     setState((prevState) => ({ ...prevState, [name]: value }))
//   })
// }

export namespace INavigatorReducer {
  export type AppState = {
    menu: [],
  };

  export type AppAction<T> = {
    type: keyof T;
    payload: T[keyof T]
  };

  export type Reducer = (state: AppState, action: AppAction<AppState>) => AppState
}

const initialState: INavigatorReducer.AppState = {
  menu: []
};

const reducer: INavigatorReducer.Reducer = (state, action) => {

  switch (action.type) {
    case "menu":
      return { ...state, menu: action.payload }
    default:
      return state;
  }
};

export { initialState, reducer };

