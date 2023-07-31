export namespace IReduxUser {
  // ==============================|| Redux User ||============================== //
  // =|| templateMessage --->tools ||= //
  export type Routes = "registre" | "login" | "token" | "change" | "reset" | "account" | "";

  export interface TemplateMessageReturn {
    routes: Routes;
    message: string;
  }
  export type TemplateMessageProps = (data: { routes: Routes }) => TemplateMessageReturn

  // =|| userPosts --> actions ||= //
  export interface UserPostsProps {
    _id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    components?: string;
    token?: string | undefined;
    routes?: Routes;
    // confirmPassword: string;
  }

  export interface UserPostsReturn extends UserPostsProps {
    // export interface UserPostsReturn extends Exclude<UserPostsProps, "routes" | "type"> {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;

    _id: string;
    verified: string;
    roles: string;
  }

  // ==============================|| initialState --> index ||============================== //

  export interface InitialState {
    data: UserPostsReturn | null;
    loading: boolean;
    error: null | {} | string;
  }
}