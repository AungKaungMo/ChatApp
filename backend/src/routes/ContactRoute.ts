import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware";
import asyncHandler from "../middlewares/AsyncHandler";
import {
  getFriendContacts,
  searchContacts,
} from "../controllers/ContactController";

const router: any = express.Router();

router.route("/search").post(verifyToken, asyncHandler(searchContacts));
router.route("/friends").get(verifyToken, asyncHandler(getFriendContacts));

export default router;
