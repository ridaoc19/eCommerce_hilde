import { IUserOnChange } from "../../hooks/UserOnChange.interface";
import { IUserRedux } from "../../redux/user/user.interface";
import { IUser } from "../../sections/user.interface";

export namespace IAuth {
  // ==============================|| Login ||============================== //
  export type LoginData = Pick<IUser.UserData, 'email' | 'password'> & Partial<Pick<IUser.UserData, 'routes'>>;

  // ==============================|| Form user ||============================== //
  export type State = "form" | "loading" | "success" | "error"

  export interface FormProps {
    change: IUserOnChange.UseOnChange
    handleOnChange: (data: IUserOnChange.HandleOnChange) => void;
    errorBack: IUserRedux.InitialState["error"];
    status: string;
  }
}
