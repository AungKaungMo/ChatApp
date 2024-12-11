import express from "express";
import authRoutes from "./AuthRoute";
import imageRoutes from "./ImageRoute";
import contactRoutes from "./ContactRoute";
import messageRoutes from "./MessageRoute";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", imageRoutes);
router.use("/contact", contactRoutes);
router.use("/message", messageRoutes);

export default router;
