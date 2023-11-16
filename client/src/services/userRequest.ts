import { Method } from "../interfaces/global.interface";
import { IUser } from "../interfaces/user.interface";

export enum RouteUser {
  Login = 'post|user/login',
  Token = 'post|user/token',
  Reset = 'post|user/reset',
  Registre = 'post|user/registre',
  // Change = 'user/change',
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
  [RouteUser.Reset]: {
    route: RouteUser.Reset;
    method: Method.Put;
    requestData: Pick<IUser.UserData, 'name' | 'lastName' | 'phone'>;
  };
};