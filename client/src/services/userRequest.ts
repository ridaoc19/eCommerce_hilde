import { Method } from "../interfaces/global.interface";
import { IUser } from "../interfaces/user.interface";

export enum RouteUser {
  Login = 'post|user/login',
  Token = 'post|user/token',
  Registre = 'post|user/registre',
  Change = 'post|user/change',
  Reset = 'post|user/reset',
  // Account = 'user/account',
  // Verify = 'user/verify',
}

export type RequestMapUser = {
  [RouteUser.Login]: {
    route: RouteUser.Login;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'email' | 'password'>;
  };
  [RouteUser.Token]: {
    route: RouteUser.Token;
    method: Method.Get;
    requestData: Pick<IUser.UserData, 'token'>;
  };
  [RouteUser.Registre]: {
    route: RouteUser.Registre;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone'>;
  };
  [RouteUser.Change]: {
    route: RouteUser.Change;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'email'> & { password: string, newPassword: string };
  };
  [RouteUser.Reset]: {
    route: RouteUser.Reset;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'email'>;
  };
};