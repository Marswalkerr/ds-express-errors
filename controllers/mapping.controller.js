import { z } from "zod";
import jwt from "jsonwebtoken";
import { asyncHandler } from "ds-express-errors";
import { User } from "../models/user.model.js";

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    age: z.number().min(18, "Must be at least 18 years old").optional()
});

export const testZodValidation = asyncHandler(async (req, res) => {
    // Calling .parse() throws ZodError on invalid payload without try/catch
    const validatedData = registerSchema.parse(req.body);
    res.status(200).json({ success: true, data: validatedData });
});

export const testMongooseValidation = asyncHandler(async (req, res) => {
    // Calling User.create with invalid fields triggers Mongoose ValidationError
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
});

export const testMongooseDuplicate = asyncHandler(async (req, res) => {
    const duplicateEmail = "duplicate_test@example.com";

    await User.deleteMany({ email: duplicateEmail });
    await User.create({
        username: "original_user",
        email: duplicateEmail,
        age: 25
    });

    // Attempting to create duplicate user will trigger MongoDB 11000 error
    const duplicateUser = await User.create({
        username: "duplicate_user",
        email: duplicateEmail,
        age: 30
    });

    res.status(201).json({ success: true, data: duplicateUser });
});

export const testMongooseCastError = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Passing an invalid hex string to findById triggers CastError
    const user = await User.findById(id);
    res.status(200).json({ success: true, data: user });
});

export const testJwtInvalid = asyncHandler(async (req, res) => {
    const invalidToken = "invalid.token.signature";
    // jwt.verify throws JsonWebTokenError on invalid token
    const decoded = jwt.verify(invalidToken, "test_secret_key");
    res.status(200).json({ success: true, decoded });
});

export const testJwtExpired = asyncHandler(async (req, res) => {
    // Generate an already-expired token
    const secret = "test_jwt_secret";
    const expiredToken = jwt.sign({ userId: "12345" }, secret, { expiresIn: "0s" });

    // Wait a tiny moment to guarantee expiration, then verify
    await new Promise((resolve) => setTimeout(resolve, 100));

    // jwt.verify throws TokenExpiredError
    const decoded = jwt.verify(expiredToken, secret);
    res.status(200).json({ success: true, decoded });
});
