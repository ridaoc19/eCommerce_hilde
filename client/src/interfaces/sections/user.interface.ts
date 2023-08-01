export namespace IUser {
  // ==============================|| User ||============================== //
  export type Routes = "registre" | "login" | "token" | "change" | "reset" | "account" | "";
  export type Roles = "super" | "admin" | "edit" | "visitant";

  export interface UserData {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    oldPassword: string;
    password: string;
    components: string;
    token: string | undefined;
    routes: Routes;
    verified: boolean;
    roles: Roles;
    // newPassword: string;
    // confirmNewPassword: string;
    // confirmPassword: string;
  }
}