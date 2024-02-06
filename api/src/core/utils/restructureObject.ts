import { IUser, IUsers } from "../../modules/user/model";

export const estructureUserDB = <R extends string | number | symbol, T extends keyof IUsers>({ data, filterDelete, filterAdd }: { data: IUser, filterDelete: T[], filterAdd: Array<{ key: R, value: string | number | boolean }> }): Omit<IUsers, T> & Record<R, string | number | boolean >  => {
  let cleanedUserData = { ...data.toObject() };

  if (filterDelete.length > 0) {
    filterDelete.forEach(item => {
      delete cleanedUserData[item]
    })
  }
  if (filterAdd.length > 0) {
    filterAdd.forEach(({ key, value }) => {
      cleanedUserData[key] = value
    })
  }

  return cleanedUserData
};
