import express from "express";
import cookieParser from "cookie-parser";
import { Errors, errorHandler, setConfig } from "ds-express-errors";
import cors from "cors";

import presetRouter from "../routes/preset.routes.js";
import mappingRouter from "../routes/mapping.routes.js";
import configTestRouter from "../routes/config-test.routes.js";
import shutdownTestRouter from "../routes/shutdown-test.routes.js";

setConfig({
    devEnvironments: ["development", "dev", "local"],
    maxLoggerRequests: 200,
    customMappers: [
        (err) => {
            if (err.name === "PaymentGatewayError") {
                return Errors.PaymentRequired(`Payment processing failed: ${err.message}`);
            }
        },
        (err) => {
            if (err.name === "MicroserviceTimeoutError") {
                return Errors.GatewayTimeout(`Downstream service error: ${err.message}`);
            }
        }
    ],
    formatError: (err, { req, isDev }) => ({
        success: false,
        status: err.isOperational ? "fail" : "error",
        statusCode: err.statusCode || 500,
        message: err.message,
        timestamp: new Date().toISOString(),
        ...(isDev
            ? {
                  method: req.method,
                  path: req.originalUrl,
                  stack: err.stack
              }
            : {})
    })
});

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/presets", presetRouter);
app.use("/api/v1/mapping", mappingRouter);
app.use("/api/v1/config-test", configTestRouter);
app.use("/api/v1/shutdown-test", shutdownTestRouter);

app.use((req, res, next) => {
    next(Errors.NotFound("Route " + req.originalUrl + " not found"));
});

app.use(errorHandler);

export { app };