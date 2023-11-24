import { Response } from "express";
import { MapStatusCode, StatusHTTPSuccess } from "../enums";
import { IUser, IUsers } from "../../../modules/user/model";


export const successHandler = <T extends StatusHTTPSuccess>({ res, json, dataDB, filterDelete, filterAdd }: { res: Response, json: Omit<MapStatusCode<IUsers>[T], 'data'>, dataDB: IUser[], filterDelete: (keyof IUsers)[], filterAdd: Array<{ key: string, value: string | number | boolean }> }) => {
  // export const successHandler = <T extends StatusHTTPSuccess, R>({ res, json }: { json: MapStatusCode<R>[T], res: Response }) => {
  let cleanedUserData = dataDB.map((item) => {
    let cleanedItem = { ...item.toObject() };

    if (filterDelete.length > 0) {
      filterDelete.forEach((field) => {
        delete cleanedItem[field];
      });
    }

    if (filterAdd.length > 0) {
      filterAdd.forEach(({ key, value }) => {
        cleanedItem[key] = value;
      });
    }

    return cleanedItem;
  });

  res.status(json.status_code).json(Object.assign(json, { data: cleanedUserData }));
  // let cleanedUserData = { ...dataDB.toObject() };

  // if (filterDelete.length > 0) {
  //   filterDelete.forEach(item => {
  //     delete cleanedUserData[item]
  //   })
  // }
  // if (filterAdd.length > 0) {
  //   filterAdd.forEach(({ key, value }) => {
  //     cleanedUserData[key] = value
  //   })
  // }

  // res
  //   .status(json.status_code)
  //   .json(Object.assign(json, { data: cleanedUserData }));
}
