export namespace IUser {
  // ==============================|| User ||============================== //
  type Routes = "registre" | "login" | "token" | "change" | "reset" | "account" | "";
  type Roles = "super" | "admin" | "edit" | "visitant";

  export interface UserData {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    token: string | undefined;
    routes: Routes;
    verified: boolean;
    roles: Roles;
    // components: string;
    // oldPassword: string;
    // newPassword: string;
    // confirmNewPassword: string;
    // confirmPassword: string;
  }
}