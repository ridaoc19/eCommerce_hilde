import { IUserRedux } from "../redux/user/user.interface";
import { IUser } from "../sections/user.interface";

export namespace IServices {
  export interface UserApi {
    routes: IUser.UserData["routes"];
    dataPost: IUserRedux.UserPostsProps;
  }
}
