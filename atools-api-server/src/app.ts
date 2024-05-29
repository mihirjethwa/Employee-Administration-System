import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import winston from "winston";
import expressWinston from "express-winston";
import router from "./routes";
import jwt from "express-jwt";
import { JWT } from "./config/api.config";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import multer from 'multer';
import path from "path";
// import { ApiResponse, Error } from "./models/ApiResponse";

//.env variables
dotenv.config({ path: path.join(__dirname, "config/config.env")});

// Create Express server
const app = express();


//Connecting Database
connectDB();

app.set("port", process.env.PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(cors());

app.use(
  jwt({
    secret: JWT.key,
    algorithms: [JWT.algorithm],
    credentialsRequired: false,
  })
);

// express-winston logger makes sense BEFORE the router
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.timestamp(), winston.format.prettyPrint()),
    msg: "HTTP {{req.method}} {{req.url}}",
  })
);

// app.use(function (err: any, req: any, res: any, next: any) {
//   if (err.name === 'UnauthorizedError') {
//     const error = new Error();
//     error.message = "Invalid token.";
//     error.code = 401;

//     const response = new ApiResponse();
//     response.statusCode = 401;
//     response.data = [],
//     response.error = error;
//     res.status(401).send(response);
//   }
// });

app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.timestamp(), winston.format.prettyPrint()),
    msg: "HTTP {{req.method}} {{req.url}}",
  })
);

export default app;
