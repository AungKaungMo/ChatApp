import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware";
import asyncHandler from "../middlewares/AsyncHandler";
import {
  getAllUnknownFriends,
  getFriendContacts,
  getFriendDetail,
  searchContacts,
} from "../controllers/ContactController";

const router: any = express.Router();

router.route("/search").post(verifyToken, asyncHandler(searchContacts));
router.route("/friends").get(verifyToken, asyncHandler(getFriendContacts));
router.route("/friends/:id").get(verifyToken, asyncHandler(getFriendDetail));
router
  .route("/unknown-friends")
  .get(verifyToken, asyncHandler(getAllUnknownFriends));

export default router;
