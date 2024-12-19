import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware";
import asyncHandler from "../middlewares/AsyncHandler";
import {
  getFriendContacts,
  getFriendDetail,
  searchContacts,
} from "../controllers/ContactController";

const router: any = express.Router();

router.route("/search").post(verifyToken, asyncHandler(searchContacts));
router.route("/friends").get(verifyToken, asyncHandler(getFriendContacts));
router.route("/friends/:id").get(verifyToken, asyncHandler(getFriendDetail));

export default router;
