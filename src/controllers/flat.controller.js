import {
  createFlat,
  getAllFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
} from "../models/flat.model.js";
import { ApiError } from "../utils/ApiError.js";

const createFlatHandler = async (req, res) => {
  const {
    location_id,
    gharbeti_id,
    title,
    description,
    price_per_month,
    available_from,
    available_to,
    room_size,
  } = req.body;

  try {
    const flat = await createFlat({
      location_id,
      gharbeti_id,
      title,
      description,
      price_per_month,
      available_from,
      available_to,
      room_size,
    });
    res.status(201).json({
      success: true,
      data: flat,
      message: "Flat created successfully",
    });
  } catch (error) {
    console.error("Error creating flat:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const getAllFlatsHandler = async (req, res) => {
  try {
    const flats = await getAllFlats();
    res.status(200).json({
      success: true,
      data: flats,
      message: "Flats retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching flats:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getFlatByIdHandler = async (req, res) => {
  const { flat_id } = req.params;

  try {
    const flat = await getFlatById(flat_id);
    if (!flat) {
      throw new ApiError(404, "Flat not found");
    }

    res.status(200).json({
      success: true,
      data: flat,
      message: "Flat retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching flat:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const updateFlatHandler = async (req, res) => {
  const { flat_id } = req.params;
  const {
    location_id,
    gharbeti_id,
    title,
    description,
    price_per_month,
    available_from,
    available_to,
    room_size,
  } = req.body;

  try {
    const updatedFlat = await updateFlat(flat_id, {
      location_id,
      gharbeti_id,
      title,
      description,
      price_per_month,
      available_from,
      available_to,
      room_size,
    });
    if (!updatedFlat) {
      throw new ApiError(404, "Flat not found");
    }

    res.status(200).json({
      success: true,
      data: updatedFlat,
      message: "Flat updated successfully",
    });
  } catch (error) {
    console.error("Error updating flat:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const deleteFlatHandler = async (req, res) => {
  const { flat_id } = req.params;

  try {
    const deletedFlat = await deleteFlat(flat_id);
    if (!deletedFlat) {
      throw new ApiError(404, "Flat not found");
    }

    res.status(200).json({
      success: true,
      data: deletedFlat,
      message: "Flat deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting flat:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export {
  createFlatHandler,
  getAllFlatsHandler,
  getFlatByIdHandler,
  updateFlatHandler,
  deleteFlatHandler,
};
