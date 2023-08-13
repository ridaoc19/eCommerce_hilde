export namespace IProduct {
  // ==============================|| User ||============================== //
  type Routes = "registre" | "login" | "token" | "change" | "reset" | "account" | "";
  // type Roles = "super" | "admin" | "edit" | "visitant";
  interface Specification {
    key: string;
    value: string;
  }

  export interface ProductData {
    _id: string;
    department: string;
    category: string,
    subCategory: string;
    name: string;
    price: string;
    images: string[];
    description: string;
    specification: Specification[];
    routes: Routes
  }
}