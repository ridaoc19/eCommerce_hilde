export namespace ReduxUser {
  interface ResultDataUser {
    _id: string;
    name: string;
  }
  export interface PostState {
    data: ResultDataUser | null;
    loading: boolean;
    error: string | null | {};
  }

  interface UserProps {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

}