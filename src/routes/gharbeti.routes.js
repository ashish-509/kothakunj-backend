import express from "express";
import {
  registerGharbeti,
  loginGharbeti,
  getAllGharbetis,
  getGharbetiById,
  updateGharbeti,
  deleteGharbeti,
} from "../controllers/gharbeti.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import logger  from "../middlewares/logger.middleware.js";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(logger);

router.post("/register", upload.single("profileImage"), registerGharbeti);

router.post("/login", loginGharbeti);

router.get("/gharbetis", verifyJWT, getAllGharbetis);

router.get("/gharbetis/:id", verifyJWT, getGharbetiById);

router.put(
  "/gharbetis/:id",
  verifyJWT,
  upload.single("profileImage"),
  updateGharbeti
);

router.delete("/gharbetis/:id", verifyJWT, deleteGharbeti);

router.use(errorHandler);

export default router;
