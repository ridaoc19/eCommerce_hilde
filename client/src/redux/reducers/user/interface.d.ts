export namespace ReduxUser {
  export interface ResultDataUser {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    state: string;
    token: string | null;
  }

  interface error<T> {
    [key: string]: T
  }

  export interface PostState {
    data: ResultDataUser | null;
    loading: boolean;
    error: error;
  }


  export interface UserProps {
    name: string;
    lastName: string;
    email: string;
    // password: string;
    // confirmPassword: string;
  }

}