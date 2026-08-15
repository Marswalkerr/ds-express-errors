import { asyncHandler } from "ds-express-errors";

// trigger Unhandled Promise Rejection (outside of route promise chain)
export const triggerUnhandledRejection = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Triggering unhandledRejection in background..." });

    // emitted asynchronously outside the Express cycle
    setTimeout(() => {
        Promise.reject(new Error("Simulated unhandled background promise rejection!"));
    }, 100);
});

// trigger Uncaught Exception (outside of route try/catch)
export const triggerUncaughtException = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Triggering uncaughtException in background..." });

    // emitted asynchronously outside the Express cycle
    setTimeout(() => {
        throw new Error("Simulated fatal uncaught background exception!");
    }, 100);
});
