import { IAuth } from "../../features/auth/auth.interface";
import { IUser } from "../../sections/user.interface";

export namespace IUserRedux {
  export interface TemplateMessageReturn {
    routes: IUser.Routes;
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: IUser.Routes }) => TemplateMessageReturn

  export interface InitialState {
    data: IUser.UserData | null;
    loading: boolean;
    error: null | {} | string;
  }

  export type UserPostsProps = IAuth.LoginData | IAuth.RegistreData | IAuth.passChangeData | IAuth.resetData;

}