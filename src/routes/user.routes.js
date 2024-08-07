import express from "express";
import {
  getAllUsersController,
  getUserByIdController,
  registerUserController,
  updateUserByIdController,
  deleteUserByIdController,
  loginUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUserController);

// Login a user
router.post("/login", loginUserController);

// Get all users
router.get("/", getAllUsersController);

// Get a user by ID
router.get("/:id", getUserByIdController);

// Update a user by ID
router.put("/:id", updateUserByIdController);

// Delete a user by ID
router.delete("/:id", deleteUserByIdController);

export default router;
