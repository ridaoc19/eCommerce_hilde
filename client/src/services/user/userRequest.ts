import { Method } from "../../interfaces/global.interface";
import { IUser } from "../../interfaces/user.interface";


export enum RouteUser {
  Login = 'post|user/login',
  Token = 'post|user/token',
  Registre = 'post|user/registre',
  Change = 'post|user/change',
  Reset = 'post|user/reset',
  AccountInfo = 'post|user/accountInfo',
  AccountPass = 'post|user/accountPass',
  AccountAdminPut = 'put|user/accountAdmin',
  AccountAdminDelete = 'delete|user/accountAdmin',
  AccountAdminGet = 'get|user/accountAdmin',
  Verify = 'post|user/verify',
}

export type RequestMapUser = {
  [RouteUser.Login]: {
    route: RouteUser.Login;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'email'> & { password: string };
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
  [RouteUser.AccountInfo]: {
    route: RouteUser.AccountInfo;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'name' | 'lastName' | 'email' | 'phone' | 'user_id'> & { newEmail: string };
  };
  [RouteUser.AccountPass]: {
    route: RouteUser.AccountPass;
    method: Method.Post;
    requestData: Pick<IUser.UserData, 'user_id'> & { password: string, newPassword: string };
  };
  [RouteUser.AccountAdminGet]: {
    route: RouteUser.AccountAdminGet;
    method: Method.Get;
  };
  [RouteUser.AccountAdminPut]: {
    route: RouteUser.AccountAdminPut;
    method: Method.Put;
    requestData: Pick<IUser.UserData, 'user_id' | 'roles'>;
  };
  [RouteUser.AccountAdminDelete]: {
    route: RouteUser.AccountAdminDelete;
    method: Method.Delete;
    routeId: string
  };
  [RouteUser.Verify]: {
    route: RouteUser.Verify;
    method: Method.Post;
    requestData: { tokenEmail: string };
  };
};