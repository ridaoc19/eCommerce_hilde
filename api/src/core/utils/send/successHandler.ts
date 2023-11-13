import { Response } from "express";
import { MapStatusCode, StatusHTTPSuccess } from "../enums";
import { IUser, IUsers } from "../../../modules/user/model";


export const successHandler = <T extends StatusHTTPSuccess>({ res, json, dataDB, filterDelete, filterAdd }: { res: Response, json: Omit<MapStatusCode<IUsers>[T], 'data'>, dataDB: IUser, filterDelete: (keyof IUsers)[], filterAdd: Array<{ key: string, value: string | number | boolean }> }) => {
  // export const successHandler = <T extends StatusHTTPSuccess, R>({ res, json }: { json: MapStatusCode<R>[T], res: Response }) => {
  let cleanedUserData = { ...dataDB.toObject() };

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

  res
    .status(json.status_code)
    .json(Object.assign(json, { data: cleanedUserData }));
}

// export const estructureUserDB = <R extends string | number | symbol, T extends keyof IUsers>({ data, filterDelete, filterAdd }: { data: IUser, filterDelete: T[], filterAdd: Array<{ key: R, value: string | number | boolean }> }): Omit<IUsers, T> & Record<R, string | number | boolean> => {
//   let cleanedUserData = { ...data.toObject() };

//   if (filterDelete.length > 0) {
//     filterDelete.forEach(item => {
//       delete cleanedUserData[item]
//     })
//   }
//   if (filterAdd.length > 0) {
//     filterAdd.forEach(({ key, value }) => {
//       cleanedUserData[key] = value
//     })
//   }

//   return cleanedUserData
// };


// export const successHandler = <T extends StatusHTTPSuccess, R>({ res, json }: { json: MapStatusCode<R>[T], res: Response }) => {
//   res
//     .status(json.status_code)
//     .json(json);
// }