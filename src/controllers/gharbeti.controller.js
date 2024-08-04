import {
  createGharbeti,
  findGharbetiByEmail,
  findGharbetiById,
  checkPassword,
  findAllGharbetis,
  updateGharbetiModel,
  deleteGharbetiModel,
} from "../models/gharbeti.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const registerGharbeti = async (req, res) => {
  try {
    const gharbeti = await createGharbeti(req.body);
    res.status(201).json({
      success: true,
      data: gharbeti,
      message: "Gharbeti registered successfully",
    });
  } catch (error) {
    console.error("Error registering Gharbeti:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const loginGharbeti = async (req, res) => {
  const { email, password } = req.body;
  try {
    const gharbeti = await findGharbetiByEmail(email);
    if (!gharbeti) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await checkPassword(password, gharbeti.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign(
      { id: gharbeti.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in Gharbeti:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getAllGharbetis = async (req, res) => {
  try {
    const gharbetis = await findAllGharbetis();
    res.status(200).json({
      success: true,
      data: gharbetis,
    });
  } catch (error) {
    console.error("Error fetching Gharbetis:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const getGharbetiById = async (req, res) => {
  const { id } = req.params;
  try {
    const gharbeti = await findGharbetiById(id);
    if (!gharbeti) {
      throw new ApiError(404, "Gharbeti not found");
    }
    res.status(200).json({
      success: true,
      data: gharbeti,
    });
  } catch (error) {
    console.error("Error fetching Gharbeti:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const updateGharbeti = async (req, res) => {
  const { id } = req.params;
  try {
    const gharbeti = await updateGharbetiModel(id, req.body);
    res.status(200).json({
      success: true,
      data: gharbeti,
      message: "Gharbeti updated successfully",
    });
  } catch (error) {
    console.error("Error updating Gharbeti:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const deleteGharbeti = async (req, res) => {
  const { id } = req.params;
  try {
    const gharbeti = await deleteGharbetiModel(id);
    res.status(200).json({
      success: true,
      data: gharbeti,
      message: "Gharbeti deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Gharbeti:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
