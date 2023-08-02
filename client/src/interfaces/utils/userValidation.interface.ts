import { IUserOnChange } from "../hooks/UserOnChange.interface";
import { IUser } from "../sections/user.interface";

export namespace IUserValidation {
  // ==============================|| ValidationChangeProps ||============================== //
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

  // ==============================|| ValidationClickProps ||============================== //
  export interface ValidationClick {
    change: IUserOnChange.UseUserOnChange;
    handleOnChange: IUserOnChange.HandleUserOnChangeProps
    routes: IUser.Routes;
  }
  export interface ValidationClickReturn {
    dataPost: DataPost,
    authorize: boolean
  }
  export type DataPost = Record<string, string | number>;

  export type ValidationClickProps = (data: ValidationClick) => ValidationClickReturn
  export type EntriesProps = [IUserOnChange.Keys, IUserOnChange.Values]
}