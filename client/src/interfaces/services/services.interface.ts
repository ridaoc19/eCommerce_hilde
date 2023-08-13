import { IUserRedux } from "../redux/user/user.interface";
import { IProduct } from "../sections/product.interface";
import { IUser } from "../sections/user.interface";

export namespace IServices {
  export interface UserApi {
    routes: IUser.UserData["routes"];
    dataPost: IUserRedux.UserPostsProps;
  }
}


export namespace IProductServices {
  export interface DepartmentApi{
    routes: IProduct.ProductData["routes"];
    dataPost?: IUserRedux.UserPostsProps;
  }
}
