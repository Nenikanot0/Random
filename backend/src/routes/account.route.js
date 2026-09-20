import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createAccount } from "../controllers/account.controller.js";

const router = express.Router();


router.post("/",authMiddleware,createAccount);

export default router;