import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";
import { StatusCodes } from "@/middlewares/status_codes";
import { ReasonResponse } from "@/middlewares/reason_response";
import createResponse from "./response";

const catchErrors: ErrorRequestHandler = (error, req, res, next) => {
  let code: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = ReasonResponse.INTERNAL_SERVER_ERROR;

  if (isHttpError(error)) {
    code = error.status;
    message = error.message;
  }

  return createResponse({
    code, message, res: res.json({ error })
  });
};

export default catchErrors;
