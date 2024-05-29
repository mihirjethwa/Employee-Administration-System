import winston, { format } from "winston";
const { combine, timestamp, prettyPrint } = format;

const options: winston.LoggerOptions = {
  format: combine(
    format.json(),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === "production" ? "info" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" })
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
