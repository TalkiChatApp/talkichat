import express from "express";
import { authRoutes } from "@/config/routes";
import { register } from "@/controllers/auth";

const router = express.Router();

router.post(authRoutes.default, register);

export default router;
