import { Response } from "express";
import { MapStatusCode, StatusHTTPError } from "./enums";

// export const errorHandler = <T extends StatusHTTPError>({ res, error, dataError }:
//   { res: Response, error: unknown, dataError: MapStatusCode[T] }) => {


//   if (error instanceof Error) {
//     if (dataError.errors.some(e => e.message))
//       // Cambiando el código de estado y el mensaje de error para indicar un error interno del servidor
//       res
//         .status(dataError.status_code)
//         .json({
//           status_code: 400;
//           status: 'internal_server_error',
//           errors: error.message
//         });
//   } else {
//     // Cambiando el código de estado y el mensaje de error para indicar un error desconocido
//     res.status(500).json({ status: 'internal_server_error', error: `Error desconocido: ${error}` });
//   }

// };

export const errorHandlerArray = <T extends StatusHTTPError>({ res, json }: { res: Response, json: MapStatusCode[T] }) => {
  res
    .status(json.status_code)
    .json(json);
};


export const errorHandlerRes = <T extends StatusHTTPError>({ res, status_code, status, errors }: MapStatusCode[T] & { res: Response }) => {
  res
    .status(status_code)
    .json({
      status_code,
      status,
      errors
    });
}
