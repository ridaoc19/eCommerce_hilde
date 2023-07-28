import { IOnChange } from "./onChange.interface";

export namespace IValidation {
  // ==============================|| ValidationChangeProps ||============================== //
  // export interface ValidationChangeProps {
  //   name: string;
  //   value: string;
  //   change: IOnChange.ChangeProps;
  // }

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
    // handleOnChange: (data: { name: string; value: string }) => void;
    routes: string;
  }
  export interface ValidationClickReturn {
    dataPost: DataPost,
    authorize: boolean
  }
  export type DataPost = Record<string, string | number>;


  export type ValidationClickProps = (data: ValidationClick) => ValidationClickReturn
  export type EntriesProps = [IOnChange.Keys, IOnChange.Values]

  // export type EntriesProps = [string, { change: string, message: string }]
  // Array<[string, { change: string; message: string }]
}