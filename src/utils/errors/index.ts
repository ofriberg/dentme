import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public translationCode?: string
  ) {
    super(message);
    this.name = "HttpError"
  }
}

export const errorMiddleWare = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      error: "Validation error",
      details: err.issues.map(({ path, message }) => ({
        path: path.join("."),
        message
      })),
      translationCode: "VALIDATION_ERROR"
    })
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
      translationCode: err.translationCode
    })
  }

  return res.status(500).json({
    error: "Internal server error",
    translationCode: "INTERNAL_ERROR"
  })
}