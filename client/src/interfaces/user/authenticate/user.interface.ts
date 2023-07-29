import { IOnChange } from "../onChangeUser.interface";
import { IReduxUser } from "../reduxUser.interface";


export namespace IUser {
  // ==============================|| Form user ||============================== //
  export interface FormProps {
  change: IOnChange.UseOnChange
  handleOnChange: (data: IOnChange.HandleOnChange) => void;
  errorBack: IReduxUser.InitialState["error"];
  status: string;
}

}
