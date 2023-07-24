import { IOnChange } from "./onChange";

// ==============================|| validation ||============================== //
export namespace IValidation {
  
  export interface PropsChange {
    name: string;
    value: string;
    change: IOnChange.PropsUseChange;
  }

  export interface ResponseChange {
    message: string;
    stop?: boolean;
  }

  export interface PropsClick {
    change: IOnChange.PropsUseChange;
    handleOnChange: (data: { name: string; value: string }) => void;
    routes: string;
  }

 export type DataPost = Record<string, string | number>;

  export interface ResponseClick {
    dataPost: DataPost,
    authorize: boolean
  }

}