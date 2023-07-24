// ==============================|| useOnChange ||============================== //
export namespace IOnChange {

  export interface PropsUseChange {
    [key: string]: { change: string; message: string };
  }

  // export interface value<T> {
  //   [key: string]: T;
  // }
  // export type errorBack = { errorBack: [key: string] };

  export interface PropsOnChange {
    name: keyof PropsUseChange;
    value: string;
  }

}
