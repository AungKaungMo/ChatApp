import express from "express";
import asyncHandler from "../middlewares/AsyncHandler";
import { verifyToken } from "../middlewares/AuthMiddleware";
import {
  addProfileImage,
  removeProfileImage,
} from "../controllers/AuthController";
import multer from "multer";
const router: any = express.Router();

const upload = multer({ dest: "uploads/files" });
router
  .route("/upload-image")
  .post(verifyToken, upload.single("file"), asyncHandler(addProfileImage));
router
  .route("/delete-image/:fileId")
  .delete(verifyToken, asyncHandler(removeProfileImage));
export default router;
