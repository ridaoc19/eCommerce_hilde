export namespace IUserOnChange {

  export type Keys = string;
  export type Values = { change: string, message: string };
  // export type Values = { change: string | Array<string | number> | Record<string, string | number>, message: string };

  // ==============================|| UseOnChangeProps ||============================== //
  export type UseUserOnChange = { [key: Keys]: Values }

  export type UseUserOnChangeReturn = {
    change: UseUserOnChange,
    handleOnChange: HandleUserOnChangeProps,
    handleErrorOnBack: HandleUserErrorOnBackProps
  }

  export type UseUserOnChangeProps = (data: UseUserOnChange) => UseUserOnChangeReturn;

  // ==============================|| OnChangeProps ||============================== //
  export type HandleUserOnChange = { name: string, value: string }
  export type HandleUserOnChangeProps = (data: HandleUserOnChange) => void;

  // ==============================|| handleUserErrorOnBack ||============================== //
  export type HandleUserErrorOnBackProps = () => void
}