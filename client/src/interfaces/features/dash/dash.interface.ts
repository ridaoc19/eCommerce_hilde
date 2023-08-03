import { IUser } from "../../sections/user.interface";

export namespace IDash {
}

export namespace IInformation {
  export type InformationData = Pick<IUser.UserData, '_id' | 'name' | 'lastName' | 'email' | 'phone' | 'components'> & Partial<Pick<IUser.UserData, 'routes'>>;
}

export namespace IPassword {
  export type PasswordData = Pick<IUser.UserData, '_id' | 'password' | 'components'> & Partial<Pick<IUser.UserData, 'routes'>>;
}