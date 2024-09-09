import express from "express";
import { chatRoutes } from "@/config/routes";
import { getMessages, sendMessage } from "@/controllers/message";

const router = express.Router();

router.get(chatRoutes.default, getMessages);
router.post(chatRoutes.default, sendMessage);

export default router;
