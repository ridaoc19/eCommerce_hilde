
export namespace IUser {

  export enum QUERY_KEY_USER {
    SingleUser = 'user',
    MultipleUsers = 'users'
  }
  type Roles = "super" | "admin" | "edit" | "visitant" | "";

  export interface UserData {
    user_id: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    verified: boolean;
    verifiedEmail: boolean;
    roles: Roles;
    addresses: Array<string>;
    token: string;
  }

  export const userDataEmpty: IUser.UserData = {
    user_id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    verified: false,
    verifiedEmail: false,
    roles: "",
    addresses: [],
    token: ""
  }
}

export type StateDashboard = {
  component: 'user' | 'newDeptCatSubProdData' | 'adminUser',
  account: 'information' | 'password' | '',
  permits: {
    [keyDashboard in PermitsRoles['id']]: boolean;
  },
  login: {
    field: string,
    isLogin: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errors: Array<{
      field: string | 'general';
      message: string
    }>;
    user: IUser.UserData;
    userAll: IUser.UserData[];
  }
}

export enum TypeDashboard {
  DASHBOARD_COMPONENTS = 'component',
  DASHBOARD_ACCOUNT = 'account',
  DASHBOARD_PERMITS = 'permits',
  DASHBOARD_LOGIN = 'login',
  DASHBOARD_LOGOUT = 'logout',
  DASHBOARD_LOGIN_DELETE_ERROR = 'DASHBOARD_LOGIN_DELETE_ERROR',
  DASHBOARD_LOGIN_DELETE_USER_ALL = 'DASHBOARD_LOGIN_DELETE_USER_ALL'
}

export type PayloadDashboard = {
  [TypeDashboard.DASHBOARD_COMPONENTS]: StateDashboard['component'],
  [TypeDashboard.DASHBOARD_ACCOUNT]: StateDashboard['account'],
  [TypeDashboard.DASHBOARD_PERMITS]: StateDashboard['permits'],
  [TypeDashboard.DASHBOARD_LOGIN]: StateDashboard['login'],
  [TypeDashboard.DASHBOARD_LOGOUT]: { isLogin: false },
  [TypeDashboard.DASHBOARD_LOGIN_DELETE_ERROR]: { field: string }
  [TypeDashboard.DASHBOARD_LOGIN_DELETE_USER_ALL]: ''
}




// }

/////////////////////////////////////////////
export type PermitsRoles = {
  id: 'super' | 'admin' | 'edit' | 'visitant'
  roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
}

export const permitsRoles: PermitsRoles[] = [
  { id: 'super', roles: ["super"] },
  { id: 'admin', roles: ["super", "admin"] },
  { id: 'edit', roles: ["super", "admin", 'edit'] },
  { id: 'visitant', roles: ["super", "admin", 'edit', 'visitant'] },
]


