import { Response } from "express";
import { MapStatusCode, StatusHTTPSuccess } from "../enums";

export const successHandler = <T extends StatusHTTPSuccess, R >({ res, json, dataDB }: { res: Response, json: Omit<MapStatusCode<R>[T], 'data'>, dataDB: R[], }) => {
  // export const successHandler = <T extends StatusHTTPSuccess, R extends Model>({ res, json, dataDB }: { res: Response, json: Omit<MapStatusCode<R>[T], 'data'>, dataDB: R[], }) => {

  res.status(json.status_code).json(Object.assign(json, { data: dataDB }));
};

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

