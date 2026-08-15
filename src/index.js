import dotenv from "dotenv";
import mongoose from "mongoose";
import { initGlobalHandlers, gracefulHttpClose } from "ds-express-errors";
import connectDB from "../db/db.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // Initialize Global Process & Graceful Shutdown Handlers
        initGlobalHandlers({
            closeServer: gracefulHttpClose(server),
            onShutdown: async (signal) => {
                console.log("[Graceful Shutdown] Closing Mongoose connection...");
                await mongoose.disconnect();
                console.log("[Graceful Shutdown] Mongoose disconnected cleanly.");
            },
            onCrash: async (err, signal) => {
                console.error("[Process Crash Handler] Caught fatal error:", err?.message || err);
            },
            maxTimeout: 10000,
            exitOnUncaughtException: true,
            exitOnUnhandledRejection: true
        });
    })
    .catch((error) => {
        console.log("Mongo connection failed! ", error);
    });