import { asyncHandler, Errors, AppError } from "ds-express-errors";

export const testBadRequest = asyncHandler(async (req, res, next) => {
    throw Errors.BadRequest("This is a Bad Request (400) error test");
});

export const testUnauthorized = asyncHandler(async (req, res, next) => {
    throw Errors.Unauthorized("This is an Unauthorized (401) error test");
});

export const testPaymentRequired = asyncHandler(async (req, res, next) => {
    throw Errors.PaymentRequired("This is a Payment Required (402) error test");
});

export const testForbidden = asyncHandler(async (req, res, next) => {
    throw Errors.Forbidden("This is a Forbidden (403) error test");
});

export const testNotFound = asyncHandler(async (req, res, next) => {
    throw Errors.NotFound("Resource not found (404) preset test");
});

export const testConflict = asyncHandler(async (req, res, next) => {
    throw Errors.Conflict("Conflict state detected (409) test");
});

export const testUnprocessableContent = asyncHandler(async (req, res, next) => {
    throw Errors.UnprocessableContent("Validation failed on semantic content (422) test");
});

export const testTooManyRequests = asyncHandler(async (req, res, next) => {
    throw Errors.TooManyRequests("Rate limit threshold exceeded (429) test");
});

export const testInternalServerError = asyncHandler(async (req, res, next) => {
    throw Errors.InternalServerError("Server internal failure (500) test");
});

export const testNotImplemented = asyncHandler(async (req, res, next) => {
    throw Errors.NotImplemented("Feature not yet implemented (501) test");
});

export const testBadGateway = asyncHandler(async (req, res, next) => {
    throw Errors.BadGateway("Upstream service returned invalid response (502) test");
});

export const testServiceUnavailable = asyncHandler(async (req, res, next) => {
    throw Errors.ServiceUnavailable("Service temporarily down for maintenance (503) test");
});

export const testGatewayTimeout = asyncHandler(async (req, res, next) => {
    throw Errors.GatewayTimeout("Upstream request timed out (504) test");
});

export const testCustomAppError = asyncHandler(async (req, res, next) => {
    throw new AppError("I am a teapot - custom status code test", 418);
});

// Test asyncHandler forwarding with next(error) instead of throw
export const testNextForwarding = asyncHandler(async (req, res, next) => {
    return next(Errors.BadRequest("Error forwarded via next() inside asyncHandler"));
});

// Test asyncHandler catching unexpected async rejection / crash
export const testAsyncCrash = asyncHandler(async (req, res, next) => {
    // Unhandled promise rejection / async throw of a native Error
    const obj = undefined;
    obj.doSomething();
});
