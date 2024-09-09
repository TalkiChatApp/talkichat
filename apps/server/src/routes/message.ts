import express from "express";
import { messageRoutes } from "@/config/routes";
import { sendMessage } from "@/controllers/message";

const router = express.Router();

router.post(messageRoutes.default, sendMessage);

export default router;
