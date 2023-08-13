
// ==============================|| User ||============================== //
export namespace IUser {
  type Routes = "registre" | "login" | "token" | "change" | "reset" | "account" | "";
  type Roles = "super" | "admin" | "edit" | "visitant";

  export interface UserData {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    token: string | undefined;
    routes: Routes;
    verified: boolean;
    roles: Roles;
    components: string;
    // oldPassword: string;
    // newPassword: string;
    // confirmNewPassword: string;
    // confirmPassword: string;
  }

  export type LoginData = Pick<IUser.UserData, 'email' | 'password'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type RegistreData = Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type passChangeData = Pick<IUser.UserData, 'password' | '_id'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type resetData = Pick<IUser.UserData, 'email'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type tokenData = Pick<IUser.UserData, 'token'> & Partial<Pick<IUser.UserData, 'routes'>>;

  export type InformationData = Pick<IUser.UserData, '_id' | 'name' | 'lastName' | 'email' | 'phone' | 'components'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type PasswordData = Pick<IUser.UserData, '_id' | 'password' | 'components'> & Partial<Pick<IUser.UserData, 'routes'>>;
}

// ==============================|| Redux ||============================== //
export namespace IUserRedux {
  export interface InitialState {
    data: IUser.UserData | null;
    loading: boolean;
    error: null | {} | string;
  }

  export type UserPostsProps = IUser.LoginData | IUser.RegistreData | IUser.passChangeData | IUser.resetData | IUser.tokenData | IUser.InformationData | IUser.PasswordData;

  export interface TemplateMessageReturn {
    routes: IUser.UserData["routes"];
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IUser.UserData["routes"] }) => TemplateMessageReturn

  export interface UserApi {
    routes: IUser.UserData["routes"];
    dataPost: UserPostsProps;
  }
}


// ==============================|| props components ||============================== //
export namespace IUserComponents {

  export type Status = "form" | "loading" | "success" | "error"

  export interface FormProps {
    change: IUserOnChange.UseUserOnChange
    handleOnChange: (data: IUserOnChange.HandleUserOnChange) => void;
    errorBack: IUserRedux.InitialState["error"];
    status: Status;
  }

  export interface InputProps {
    svg?: {
      type: string;
      height?: number;
      width?: number;
      color?: string;
    };
    svgTwo?: {
      type: string;
      height?: number;
      width?: number;
      color?: string;
    };
    styleClass: string;
    errorMessage: string;
    input: {
      type?: string;
      placeholder: string;
      value: string;
      handleOnChange: IUserOnChange.HandleUserOnChangeProps
      name: string;
    };
  }
}

// ==============================|| Validation ||============================== //
export namespace IUserValidation {
  // =|| ValidationChangeProps ||= //
  export interface ValidationChangeReturn {
    message: string;
    stop?: boolean;
  }

  export interface ValidationChange {
    name: string;
    value: string;
    change: IUserOnChange.UseUserOnChange;
  }

  export type ValidationChangeProps = (data: ValidationChange) => ValidationChangeReturn

  // =|| ValidationClickProps ||= //
  export interface ValidationClick {
    change: IUserOnChange.UseUserOnChange;
    handleOnChange: IUserOnChange.HandleUserOnChangeProps
    routes: IUser.UserData["routes"];
  }
  export interface ValidationClickReturn {
    dataPost: DataPost,
    authorize: boolean
  }
  export type DataPost = Record<string, string | number>;

  export type ValidationClickProps = (data: ValidationClick) => ValidationClickReturn
  export type EntriesProps = [IUserOnChange.Keys, IUserOnChange.Values]
}


// ==============================|| IUserOnChange ||============================== //
export namespace IUserOnChange {

  export type Keys = string;
  export type Values = { change: string, message: string };
  // export type Values = { change: string | Array<string | number> | Record<string, string | number>, message: string };

  // =|| UseOnChangeProps ||= //
  export type UseUserOnChange = { [key: Keys]: Values }

  export type UseUserOnChangeReturn = {
    change: UseUserOnChange,
    handleOnChange: HandleUserOnChangeProps,
    handleErrorOnBack: HandleUserErrorOnBackProps
  }

  export type UseUserOnChangeProps = (data: UseUserOnChange) => UseUserOnChangeReturn;

  // =|| OnChangeProps ||= //
  export type HandleUserOnChange = { name: string, value: string }
  export type HandleUserOnChangeProps = (data: HandleUserOnChange) => void;

  // =|| handleUserErrorOnBack ||= //
  export type HandleUserErrorOnBackProps = () => void
}


