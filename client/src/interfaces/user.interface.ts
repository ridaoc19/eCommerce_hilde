
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

// export namespace IUserContext {
export enum keyDashboard {
  DASHBOARD_COMPONENTS = 'component',
  DASHBOARD_ACCOUNT = 'account',
  DASHBOARD_PERMITS = 'permits',
  DASHBOARD_LOGIN = 'login',
}

export type StateDashboard = {
  [keyDashboard.DASHBOARD_COMPONENTS]: 'user' | 'newDeptCatSubProdData' | '',
  [keyDashboard.DASHBOARD_ACCOUNT]: 'information' | 'password' | '',
  [keyDashboard.DASHBOARD_PERMITS]: {
    [keyDashboard in PermitsRoles['id']]: boolean;
  },
  [keyDashboard.DASHBOARD_LOGIN]: {
    status: string,
    isLogin: boolean;
    isLoading: boolean;
    isError: boolean;
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
  DASHBOARD_LOGIN_UPDATE_ERROR = 'DASHBOARD_LOGIN_UPDATE_ERROR',
}

export type PayloadDashboard = {
  [TypeDashboard.DASHBOARD_COMPONENTS]: 'user' | 'newDeptCatSubProdData' | '',
  [TypeDashboard.DASHBOARD_ACCOUNT]: 'information' | 'password' | '',
  [TypeDashboard.DASHBOARD_PERMITS]: {
    [TypeDashboard in PermitsRoles['id']]: boolean;
  },
  [TypeDashboard.DASHBOARD_LOGIN]: {
    status: string,
    isLogin: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    errors: Array<{
      field: string | 'general';
      message: string
    }>;
    user: IUser.UserData;
    userAll: IUser.UserData[];
  },
  [TypeDashboard.DASHBOARD_LOGOUT]: {
    isLogin: false;
  },
  [TypeDashboard.DASHBOARD_LOGIN_UPDATE_ERROR]: {
    errors: Array<{
      field: string | 'general';
      message: string
    }>;
  }
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


