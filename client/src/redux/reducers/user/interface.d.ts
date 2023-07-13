export namespace ReduxUser {
  export interface ResultDataUser {
    _id: string;
    name: string;
    email: string;
  }
  
  interface error<T> {
    [key: string]: T
  }

  export interface PostState {
    data: ResultDataUser | null;
    loading: boolean;
    error: error ;
  }


  export interface UserProps {
    name: string;
    lastName: string;
    email: string;
    // password: string;
    // confirmPassword: string;
  }

}