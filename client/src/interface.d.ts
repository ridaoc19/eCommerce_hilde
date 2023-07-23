// type MyObject = Record<string, string | number>;
// interface error<T> {
//   [key: string]: T
// }
// ==============================|| useOnChange ||============================== //
export namespace IOnChange {
  export interface PropsUseChange {
    [key: string]: { change: string; message: string };
  }

  interface value<T> {
    [key: string]: T;
  }

  export interface PropsOnChange {
    name: keyof PropsUseChange;
    value: string;
  }

  type errorBack = { errorBack: value };
}

// ==============================|| validation ||============================== //
export namespace IValidation {
  interface PropsChange {
    name: string;
    value: string;
    change: IOnChange.PropsUseChange;
  }

  interface ResponseChange {
    message: string;
    stop?: boolean;
  }

  interface PropsClick {
    change: IOnChange.PropsUseChange;
    handleOnChange: (data: { name: string; value: string }) => void;
    routes: string;
  }

  type DataPost = Record<string, string | number>;

  interface ResponseClick {
    dataPost: DataPost,
    authorize: boolean
  }

}

export namespace IUser {
  type Routes = "registre" | "login" | "token" | "change" | "reset";

  interface UserProps {
    name: string;
    lastName: string;
    email: string;
    password?: string;
    routes?: Routes;
    // confirmPassword: string;
  }

  interface ResponseUser extends Omit<UserProps, "route"> {
    _id: string;
    verified: string;
    token: string | null;
  }

  interface PostState {
    data: ResponseUser | null;
    loading: boolean;
    error: null | {} | string;
  }

  interface PropsForm {
    handleOnChange: (data: { name: string; value: string }) => void;
    change: IOnChange.PropsUseChange;
    errorBack: PostState.error;
    status: string;
  }
}

// ==============================|| Dashboard ||============================== //
export namespace IDashboard {
  enum ActionType {
    SELECT_COMPONENT = "SELECT_COMPONENT",
  }
  type SelectAction = { type: ActionType.SELECT_COMPONENT; payload: any };

  type AppState = { component: string };
  type AppAction = SelectAction;
}

// ==============================|| useContext ||============================== //
export interface IContextData {
  dashboard: AppState | AppAction;
}


