
export namespace IOnChange {

  export type Keys = string;
  export type Values = { change: string, message: string };

  // ==============================|| UseOnChangeProps ||============================== //
  // export type UseOnChangeProps = { [key: Keys]: Values }
  export type UseOnChange = { [key: Keys]: Values }

  export type UseOnChangeReturn = {
    change: UseOnChange,
    handleOnChange: HandleOnChangeProps,
    handleErrorOnBack: HandleErrorOnBackProps
  }
  
  export type UseOnChangeProps = (data: UseOnChange) => UseOnChangeReturn;

  // ==============================|| OnChangeProps ||============================== //
  // export interface OnChangeProps {
  //   name: keyof UseOnChangeProps;
  //   value: string;
  // }
  export type HandleOnChange = { name: string, value: string }
  // export type HandleOnChange = { name: keyof UseOnChange, value: string }
  export type HandleOnChangeProps = (data: HandleOnChange) => void;

  // ==============================|| handleErrorOnBack ||============================== //
  export type HandleErrorOnBackProps = () => void

}





// export type UseOnChangeProps<K extends Keys> = {
//   [key in K]: Values;
// };

// export interface PropsOnChange<K extends Keys> {
//   name: K;
//   value: string;
// }

// export interface PropsUseChange {
//   [key: string]: { change: string; message: string };
// }

// export interface value<T> {
//   [key: string]: T;
// }
// export type errorBack = { errorBack: [key: string] };


// export type PropsOnChange = (name: string, value: string | number) => void;
// // export type PropsOnChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void;
// type PropsOnClick = (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement> | MouseEvent<HTMLAnchorElement>) => void

