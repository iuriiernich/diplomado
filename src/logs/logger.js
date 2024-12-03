import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      timestamp: true,
      translateTime: "SYS:dd/mm/yyyy HH:mm:ss",
    },
  },
});

export default logger;
