import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware";
import asyncHandler from "../middlewares/AsyncHandler";
import { getMessages } from "../controllers/MessageController";

const router: any = express.Router();

router.route("/get-messages").get(verifyToken, asyncHandler(getMessages));

export default router;
