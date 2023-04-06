//@ts-nocheck
import express from "express";
import { register, login } from "../controllers/auth.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
