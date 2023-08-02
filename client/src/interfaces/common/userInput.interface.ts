import { IUserOnChange } from "../hooks/UserOnChange.interface";

export namespace IUserInput {
  export interface Props {
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