// export namespace User {
//   export interface ResultDataUser {
//     _id: string;
//     name: string;
//   }

//   interface error<T> {
//     [key: string]: T
//   }

//   export interface PostState {
//     data: ResultDataUser | null;
//     loading: boolean;
//     error: error ;
//   }


//   export interface Post {
//     name: string;
//     lastName: string;
//     email: string;
//     // password: string;
//     // confirmPassword: string;
//   }

// }

export interface User {
  name: string;
  lastName: string;
  email: string;
  password: string;
}