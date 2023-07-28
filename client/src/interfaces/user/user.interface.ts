import { IOnChange } from "../onChange.interface";
import { IReduxUser } from "../redux/user.interface";

export namespace IUser {

  // ==============================|| Form user ||============================== //
//   export interface FormProps extends IOnChange.HandleOnChangeProps, IOnChange.UseOnChangeProps {
//     // handleOnChange: (data: { name: string; value: string }) => void;
//     errorBack: ReduxUser.InitialState["error"];
//     status: string;
//   }

export interface FormProps {
  // Resto de las propiedades de FormProps
  change: IOnChange.UseOnChange
  handleOnChange: (data: IOnChange.HandleOnChange) => void;
  errorBack: IReduxUser.InitialState["error"];
  status: string;
}



}
