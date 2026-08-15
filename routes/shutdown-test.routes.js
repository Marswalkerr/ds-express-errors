import { Router } from "express";
import {
    triggerUnhandledRejection,
    triggerUncaughtException
} from "../controllers/shutdown-test.controller.js";

const router = Router();

router.get("/unhandled-rejection", triggerUnhandledRejection);
router.get("/uncaught-exception", triggerUncaughtException);

export default router;