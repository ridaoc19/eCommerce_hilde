import { Method } from "../interfaces/global.interface";
import { IUser } from "../interfaces/user.interface";

export enum RouteUser {
  Login = 'post|user/login',
  Token = 'user/token',
  Reset = 'user/reset',
  // Registre = 'user/registre',
  // Change = 'user/change',
  // Account = 'user/account',
  // Verify = 'user/verify',
}

export type RequestMapUser = {
  [RouteUser.Login]: {
    route: RouteUser.Login;
    method: "post";
    requestData: Pick<IUser.UserData, 'email' | 'password'>;
  };
  [RouteUser.Token]: {
    route: RouteUser.Token;
    method: Method.Get;
    requestData: IUser.UserData['token'];
  };
  [RouteUser.Reset]: {
    route: RouteUser.Reset;
    method: Method.Put;
    requestData: Pick<IUser.UserData, 'name' | 'lastName' | 'phone'>;
  };
};