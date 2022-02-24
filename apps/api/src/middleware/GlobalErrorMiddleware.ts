import { NextFunction, Response, Request } from "express";
import NotFoundError from "../exceptions/NotFoundError";
import { ApiRequest } from "../types/Api";

export const buildError = (type: string, error: Error) => {
  const response: any = {
    error: type,
    message: error.message,
  };

  if (process.env.NODE_ENV !== "production") {
    response.trace = error.stack;
  }
  return response;
};

export default function globalErrorMiddleware(err: Error, req: ApiRequest, res: Response, next: NextFunction): void {
  switch (err.constructor.name) {
    case NotFoundError.name:
      res.status(404).json(buildError("not-found", err));
      break;
    default:
      res.status(500).json(buildError("server-error", err));
      break;
  }
  next(err);
}
