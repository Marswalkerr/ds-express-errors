import { asyncHandler, Errors } from "ds-express-errors";

// Custom Domain Error Classes
export class PaymentGatewayError extends Error {
    constructor(message) {
        super(message);
        this.name = "PaymentGatewayError";
    }
}

export class MicroserviceTimeoutError extends Error {
    constructor(message) {
        super(message);
        this.name = "MicroserviceTimeoutError";
    }
}

// 1. Test Custom Mapper for PaymentGatewayError
export const testCustomPaymentError = asyncHandler(async (req, res) => {
    // Throwing custom domain error without manual try/catch
    throw new PaymentGatewayError("Stripe balance transaction failed");
});

// 2. Test Custom Mapper for MicroserviceTimeoutError
export const testCustomTimeoutError = asyncHandler(async (req, res) => {
    throw new MicroserviceTimeoutError("Auth microservice connection timed out after 5000ms");
});

// 3. Test Standard Error with custom formatError structure
export const testFormattedStandardError = asyncHandler(async (req, res) => {
    throw Errors.BadRequest("This is a standard error demonstrating formatError output");
});
