import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import createHttpError, { isHttpError } from "http-errors";
import passport from "passport";
import assetRoutes from "./routes/assetRoutes";
import "./utils/passport";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(cookieParser());
app.use(passport.initialize());

//routes related to the user
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/asset", assetRoutes);

//error hnadlers
app.use((req, res, next) => {
  next(createHttpError(404, "Api endpoint not found"));
});
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "an unknown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({
    success: false,
    errorMessage,
  });
});

export default app;
