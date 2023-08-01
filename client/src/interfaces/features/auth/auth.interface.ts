import { IOnChange } from "../../hooks/onChange.interface";
import { IReduxUser } from "../../redux/user/user.interface";

export namespace IAuth {
  // ==============================|| Form user ||============================== //
  export interface FormProps {
    change: IOnChange.UseOnChange
    handleOnChange: (data: IOnChange.HandleOnChange) => void;
    errorBack: IReduxUser.InitialState["error"];
    status: string;
  }
}
