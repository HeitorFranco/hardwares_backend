import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppError } from "./errors/AppError";
import { routes } from "./routes/routes";

if (process.env.NODE_ENV == "production") {
  require("dotenv/config");
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    message: "Internal Server Error",
  });
});

export { app };
