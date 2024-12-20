import express from "express";
import {
  login,
  register,
  getUserInfo,
  updateProfile,
  logout,
} from "../controllers/AuthController";
import asyncHandler from "../middlewares/AsyncHandler";
import { verifyToken } from "../middlewares/AuthMiddleware";

const router: any = express.Router();

router.route("/register").post(asyncHandler(register));
router.route("/login").post(asyncHandler(login));
router.route("/logout").post(asyncHandler(logout));
router.route("/user-info").get(verifyToken, asyncHandler(getUserInfo));
router
  .route("/update-profile/:id")
  .put(verifyToken, asyncHandler(updateProfile));
export default router;
