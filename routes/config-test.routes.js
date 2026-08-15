import { Router } from "express";
import {
    testCustomPaymentError,
    testCustomTimeoutError,
    testFormattedStandardError
} from "../controllers/config-test.controller.js";

const router = Router();

router.get("/custom-payment-error", testCustomPaymentError);
router.get("/custom-timeout-error", testCustomTimeoutError);
router.get("/formatted-standard-error", testFormattedStandardError);

export default router;
