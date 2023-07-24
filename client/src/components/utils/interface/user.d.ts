import { IOnChange } from "./onChange";

// ==============================|| User ||============================== //
export namespace IUser {
  export type Routes = "registre" | "login" | "token" | "change" | "reset";

  export interface UserProps {
    name: string;
    lastName: string;
    email: string;
    password?: string;
    routes?: Routes;
    // confirmPassword: string;
  }

  export interface ResponseUser extends Omit<UserProps, "route"> {
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
