import { Response } from "express";
import { MapStatusCode, StatusHTTPSuccess } from "../enums";

export const successHandler = <T extends StatusHTTPSuccess, R>({
  res,
  json,
  dataDB,
}: {
  res: Response;
  json: Omit<MapStatusCode<R>[T], 'data'>;
  dataDB: R[] | R;
}) => {
  res.status(json.status_code).json(Object.assign(json, { data: dataDB }));
};
