import express from "express";
import {
  registerUserController,
  loginUserController,
  getUserProfileController,
  updateUserProfileController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/profile", verifyJWT, getUserProfileController);

router.put("/profile", verifyJWT, updateUserProfileController);

router.get("/", verifyJWT, getAllUsersController);

router.get("/:id", verifyJWT, getUserByIdController);

router.put("/:id", verifyJWT, updateUserByIdController);

router.delete("/:id", verifyJWT, deleteUserByIdController);

export default router;
