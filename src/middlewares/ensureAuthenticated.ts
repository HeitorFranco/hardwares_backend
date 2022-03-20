import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const { id: userId } = decoded as TokenPayload;

    request.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token!", 401);
  }
}
