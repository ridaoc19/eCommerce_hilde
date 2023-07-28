import { IOnChange } from './onChange.interface';

export namespace IInput {
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
      handleOnChange: IOnChange.HandleOnChangeProps
      name: string;
    };
  }
}