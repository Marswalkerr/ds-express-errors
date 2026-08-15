import { Router } from "express";
import {
    testZodValidation,
    testMongooseValidation,
    testMongooseDuplicate,
    testMongooseCastError,
    testJwtInvalid,
    testJwtExpired
} from "../controllers/mapping.controller.js";

const router = Router();

router.post("/zod-validation", testZodValidation);
router.post("/mongoose-validation", testMongooseValidation);
router.post("/mongoose-duplicate", testMongooseDuplicate);
router.get("/mongoose-cast/:id", testMongooseCastError);
router.get("/jwt-invalid", testJwtInvalid);
router.get("/jwt-expired", testJwtExpired);

export default router;
