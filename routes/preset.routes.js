import { Router } from "express";
import {
    testBadRequest,
    testUnauthorized,
    testPaymentRequired,
    testForbidden,
    testNotFound,
    testConflict,
    testUnprocessableContent,
    testTooManyRequests,
    testInternalServerError,
    testNotImplemented,
    testBadGateway,
    testServiceUnavailable,
    testGatewayTimeout,
    testCustomAppError,
    testNextForwarding,
    testAsyncCrash
} from "../controllers/preset.controller.js";

const router = Router();

// Preset routes
router.get("/bad-request", testBadRequest);
router.get("/unauthorized", testUnauthorized);
router.get("/payment-required", testPaymentRequired);
router.get("/forbidden", testForbidden);
router.get("/not-found", testNotFound);
router.get("/conflict", testConflict);
router.get("/unprocessable", testUnprocessableContent);
router.get("/too-many-requests", testTooManyRequests);
router.get("/internal-server-error", testInternalServerError);
router.get("/not-implemented", testNotImplemented);
router.get("/bad-gateway", testBadGateway);
router.get("/service-unavailable", testServiceUnavailable);
router.get("/gateway-timeout", testGatewayTimeout);

// Custom AppError route
router.get("/custom-app-error", testCustomAppError);

// AsyncHandler behavior routes
router.get("/next-forwarding", testNextForwarding);
router.get("/async-crash", testAsyncCrash);

export default router;
