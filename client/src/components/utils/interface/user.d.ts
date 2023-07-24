import { IOnChange } from "./onChange";

// ==============================|| User ||============================== //
export namespace IUser {
  export type Routes = "registre" | "login" | "token" | "change" | "reset" | "account";

  export interface UserProps {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    routes?: Routes;
    components?: string;
    // confirmPassword: string;
  }

  export interface ResponseUser extends Exclude<UserProps, "routes" | "type"> {
    _id: string;
    verified: string;
    token: string | null;
    roles: string;
  }

  export interface PostState {
    data: ResponseUser | null;
    loading: boolean;
    error: null | {} | string;
  }

  export interface PropsForm {
    handleOnChange: (data: { name: string; value: string }) => void;
    change: IOnChange.PropsUseChange;
    errorBack: PostState["error"];
    status: string;
  }
}
