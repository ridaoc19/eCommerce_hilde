import { IUserOnChange } from "../../hooks/UserOnChange.interface";
import { IUserRedux } from "../../redux/user/user.interface";
import { IUser } from "../../sections/user.interface";

export namespace IAuth {
  // ==============================|| Login ||============================== //
  export type LoginData = Pick<IUser.UserData, 'email' | 'password'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type RegistreData = Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type passChangeData = Pick<IUser.UserData, 'password' | '_id'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type resetData = Pick<IUser.UserData, 'email'> & Partial<Pick<IUser.UserData, 'routes'>>;
  export type tokenData = Pick<IUser.UserData, 'token'> & Partial<Pick<IUser.UserData, 'routes'>>;

  // ==============================|| Form user ||============================== //
  export type Status = "form" | "loading" | "success" | "error"

  export interface FormProps {
    change: IUserOnChange.UseUserOnChange
    handleOnChange: (data: IUserOnChange.HandleUserOnChange) => void;
    errorBack: IUserRedux.InitialState["error"];
    status: Status;
  }
}