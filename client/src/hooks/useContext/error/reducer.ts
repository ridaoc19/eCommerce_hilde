
export namespace IErrorReducer {
  export type AppState = {
    errors: Array<{
      field: string | 'general';
      message: string
    }>;
  };

  export type AppAction<T> = {
    type: keyof T;
    payload: T[keyof T]
  };

  export type Reducer = (state: AppState, action: AppAction<AppState>) => AppState
}

const initialState: IErrorReducer.AppState = {
  errors: []
};

const reducer: IErrorReducer.Reducer = (state, action) => {

  switch (action.type) {
    case "errors":
      const errors = action.payload.length === 0 ? [] : [...state.errors, ...action.payload]
      return { ...state, errors }
    default:
      return state;
  }
};

export { initialState, reducer };

