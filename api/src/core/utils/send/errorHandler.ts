import { Response } from "express";
import { MapStatusCode, StatusHTTP, StatusHTTPError } from "../enums";

export const errorHandlerCatch = ({ res, error }:
  { res: Response, error: unknown }) => {
    if (error instanceof Error) {
    res
      .status(400)
      .json({
        status_code: 400,
        status: StatusHTTP.badRequest_400,
        errors: [{ field: 'general', message: error.message }]
      });
  } else {
    res
      .status(500)
      .json({
        status_code: 500,
        status: StatusHTTP.internalServerError_500,
        errors: []
      });
  }

};

export const errorHandlerArray = <T extends StatusHTTPError>({ res, json }: { res: Response, json: MapStatusCode<string>[T] }) => {
  res
    .status(json.status_code)
    .json(json);
};


export const errorHandlerRes = <T extends StatusHTTPError>({ res, status_code, status, errors }: MapStatusCode<string>[T] & { res: Response }) => {
  res
    .status(status_code)
    .json({
      status_code,
      status,
      errors
    });
}
