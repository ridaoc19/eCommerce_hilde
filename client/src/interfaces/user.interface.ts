import { IProduct } from "./product.interface";

// ==============================|| User ||============================== //
export namespace IUser {
  export const USER_NAME_QUERY = ['user']
  export const USER_NAME_QUERY_ALL = ['users']
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
    items: {
      purchasedProducts: Array<IProduct.Variants['_id']>;
      favoriteProducts: Array<IProduct.Variants['_id']>;
    };
    addresses: Array<string>;
    token: string;
  }
}

/////////////////////////////////////////////
export type PermitsRoles = {
  id: 'sidebar_user'
  | 'sidebar_newDeptCatSubProdData'
  | 'sidebar_productEntry'
  | 'sidebar_otro'
  | 'inventory_department'
  | 'inventory_category'
  | 'inventory_subcategory'
  | 'inventory_product'
  | 'super' | 'admin' | 'edit'
  roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
}

export const permitsRoles: PermitsRoles[] = [
  { id: 'super', roles: ["super", "admin", 'edit', 'visitant'] },
  { id: 'admin', roles: ["admin", 'edit', 'visitant'] },
  { id: 'edit', roles: ['edit', 'visitant'] },
  { id: 'sidebar_user', roles: ["super", "admin", 'edit', 'visitant'] },
  { id: 'sidebar_newDeptCatSubProdData', roles: ['super', 'admin'] },
  { id: 'sidebar_productEntry', roles: ['super', 'admin', 'edit'] },
  { id: 'sidebar_otro', roles: ['visitant', "super", 'admin'] },
  { id: 'inventory_department', roles: ['super', 'admin'] },
  { id: 'inventory_category', roles: ['super', 'admin'] },
  { id: 'inventory_subcategory', roles: ['super', 'admin'] },
  { id: 'inventory_product', roles: ["super", "admin", 'edit'] },
]
