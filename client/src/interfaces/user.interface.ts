
export namespace IUser {

  export enum QUERY_KEY_USER {
    SingleUser = 'user',
    MultipleUsers = 'users'
  }
  type Roles = "super" | "admin" | "edit" | "visitant" | "";

  export interface UserData {
    _id: string;
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
}

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
