import { IOnChange } from "../hooks/onChange.interface";

export namespace IValidation {
  // ==============================|| ValidationChangeProps ||============================== //
  export interface ValidationChangeReturn {
    message: string;
    stop?: boolean;
  }

  export interface ValidationChange {
    name: string;
    value: string;
    change: IOnChange.UseOnChange;
  }

  export type ValidationChangeProps = (data: ValidationChange) => ValidationChangeReturn

  // ==============================|| ValidationClickProps ||============================== //
  export interface ValidationClick {
    change: IOnChange.UseOnChange;
    handleOnChange: IOnChange.HandleOnChangeProps
    routes: string;
  }
  export interface ValidationClickReturn {
    dataPost: DataPost,
    authorize: boolean
  }
  export type DataPost = Record<string, string | number>;

  export type ValidationClickProps = (data: ValidationClick) => ValidationClickReturn
  export type EntriesProps = [IOnChange.Keys, IOnChange.Values]
}