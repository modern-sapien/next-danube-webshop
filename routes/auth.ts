//@ts-nocheck
import express from "express";
import { register, login, getMe } from "../controllers/auth.ts";

const router = express.Router();

import { protect } from "../middleware/auth.ts"

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;
