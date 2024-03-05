import { Request, Response } from "express";
// import { deleteFiles } from "../middleware/files";
import { MapStatusCode, StatusHTTP, StatusHTTPError } from "./enums";

export const errorHandlerCatch = ({ res, error }: { req: Request, res: Response, error: unknown }) => {
  // if (req?.files && Array.isArray(req.files) && req.files.length > 0) {//eliminar image si hay error
    // deleteFiles(req.files.map(e => e.filename))
  // }
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

export const errorHandlerArray = <T extends StatusHTTPError>({ req, res, json }: { req: Request, res: Response, json: MapStatusCode<string>[T] }) => {
  if (req?.files && Array.isArray(req.files) && req.files.length > 0) {//eliminar image si hay error
    // deleteFiles(req.files.map(e => e.filename))
  }

  res
    .status(json.status_code)
    .json(json);
};


export const errorHandlerRes = <T extends StatusHTTPError>({ req, res, status_code, status, errors }: MapStatusCode<string>[T] & { req: Request, res: Response }) => {
  if (req?.files && Array.isArray(req.files) && req.files.length > 0) {//eliminar image si hay error
    // deleteFiles(req.files.map(e => e.filename))
  }

  res
    .status(status_code)
    .json({
      status_code,
      status,
      errors
    });
}
