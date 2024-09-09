import express from "express";
import { getContacts, getContactById, addContacts, createContact, updateContact, deleteContact } from "@/controllers/contact";
import {contactRoutes} from "@/config/routes";

const router = express.Router();

router.get(contactRoutes.default, getContacts);
router.get(contactRoutes.byId, getContactById);

export default router;
