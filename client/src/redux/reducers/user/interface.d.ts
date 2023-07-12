interface ResultDataUser {
  _id: string;
  name: string;
}

interface PostState {
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

// export namespace MyNamespace {
//   export interface MyInterface1 {
//       prop1: boolean;
//   }
//   export interface MyInterface2 {
//       prop2: string;
//   }
// }