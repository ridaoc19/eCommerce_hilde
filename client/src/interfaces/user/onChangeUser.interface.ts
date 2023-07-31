export namespace IOnChange {

  export type Keys = string;
  export type Values = { change: string, message: string };

  // ==============================|| UseOnChangeProps ||============================== //
  export type UseOnChange = { [key: Keys]: Values }

  export type UseOnChangeReturn = {
    change: UseOnChange,
    handleOnChange: HandleOnChangeProps,
    handleErrorOnBack: HandleErrorOnBackProps
  }
  
  export type UseOnChangeProps = (data: UseOnChange) => UseOnChangeReturn;

  // ==============================|| OnChangeProps ||============================== //
 export type HandleOnChange = { name: string, value: string }
  export type HandleOnChangeProps = (data: HandleOnChange) => void;

  // ==============================|| handleErrorOnBack ||============================== //
  export type HandleErrorOnBackProps = () => void
}