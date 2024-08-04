import {deleteUser} from "../models/user.model.js";
import {createUser} from "../models/user.model.js";
import {updateUser} from "../models/user.model.js";
import {getUserById} from "../models/user.model.js";
import {getAllUsers} from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (userId) => {

  return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1h",
  });
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(new ApiResponse(200, users));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch users", [], error.stack));
  }
};

export const getUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new ApiError(404, `User with id ${id} not found`);
    }
    res.json(new ApiResponse(200, user));
  } catch (error) {
    next(new ApiError(400, "Failed to fetch user", [], error.stack));
  }
};

export const registerUserController = async (req, res, next) => {
  const { first_name, last_name, phone_number, address, email, password } =
    req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = await getUserById(email);
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const newUser = await createUser({
      first_name,
      last_name,
      phone_number,
      address,
      email,
      password,
    });

    res
      .status(201)
      .json(new ApiResponse(201, newUser, "User registered successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to register user", [], error.stack));
  }
};

export const updateUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, address, email, password } = req.body;
  try {
    const updatedUser = await updateUser(id, {
      first_name, 
      last_name, 
      phone_number, 
      address, 
      email, 
      password
    });
    if (!updatedUser) {
      throw new ApiError(404, `User with id ${id} not found`);
    }
    res.json(new ApiResponse(200, updatedUser, "User updated successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to update user", [], error.stack));
  }
};

export const deleteUserByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      throw new ApiError(404, `User with id ${id} not found`);
    }
    res.json(new ApiResponse(200, deletedUser, "User deleted successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to delete user", [], error.stack));
  }
};

export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // const user = await authenticateUser(email, password);
    // hardcoded authentication for now
    const user = {
      _id: '60c0b0a1b4c3f00015f3f0d7',
      email: 'ashish@gmail.com',
      password: '$2b$10$Fw8G6yj1s8z5zv9j6Ww7xu2S5W9d6lUk8LgQ6lJj7b4g9RJvO7c7u',
  }
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken(user.user_id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json(new ApiResponse(200, { accessToken }, "Login successful"));
  } catch (error) {
    next(new ApiError(401, "Authentication failed", [], error.stack));
  }
};

export const logoutUserController = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true });
    res.json(new ApiResponse(200, null, "Logout successful"));
  } catch (error) {
    next(new ApiError(500, "Failed to logout user", [], error.stack));
  }
};

export const getUserProfileController = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json(new ApiResponse(200, user));
  } catch (error) {
    next(new ApiError(400, "Failed to fetch user profile", [], error.stack));
  }
};

export const updateUserProfileController = async (req, res, next) => {
  const userId = req.user._id;
  const { first_name, last_name, phone_number, address, email, password } = req.body;
  try {
    const updatedUser = await updateUser(userId, {
      first_name, 
      last_name, 
      phone_number, 
      address, 
      email, 
      password
    });
    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }
    res.json(
      new ApiResponse(200, updatedUser, "User profile updated successfully")
    );
  } catch (error) {
    next(new ApiError(400, "Failed to update user profile", [], error.stack));
  }
};
