import { IOnChange } from "../onChange.interface";
import { IReduxUser } from "../redux/user.interface";

export namespace IUser {
  // ==============================|| Form user ||============================== //
  export interface FormProps {
  change: IOnChange.UseOnChange
  handleOnChange: (data: IOnChange.HandleOnChange) => void;
  errorBack: IReduxUser.InitialState["error"];
  status: string;
}

}
