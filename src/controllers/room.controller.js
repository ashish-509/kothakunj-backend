import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
} from "../models/room.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Get all rooms
export const getAllRoomsHandler = async (req, res, next) => {
  try {
    const rooms = await getAllRooms();
    res.json(new ApiResponse(200, rooms));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch rooms", [], error.stack));
  }
};

// Get a room by ID
export const getRoomByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const room = await getRoomById(id);
    if (!room) {
      throw new ApiError(404, `Room with id ${id} not found`);
    }
    res.json(new ApiResponse(200, room));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch room", [], error.stack));
  }
};

// Create a new room
export const createRoomHandler = async (req, res, next) => {
  const {
    city,
    area,
    bedrooms,
    bathrooms,
    roomSize,
    kitchenRooms,
    extraRoom,
    rent,
    priceRange,
    amenities,
    furnished,
    preferredGender,
    description,
    houseFrontPicture,
    gallery,
    location_id,
    user_id,
  } = req.body;

  try {
    const newRoom = await createRoom({
      city,
      area,
      bedrooms,
      bathrooms,
      roomSize,
      kitchenRooms,
      extraRoom,
      rent,
      priceRange,
      amenities,
      furnished,
      preferredGender,
      description,
      houseFrontPicture,
      gallery,
      location_id,
      user_id,
    });
    res
      .status(201)
      .json(new ApiResponse(201, newRoom, "Room created successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to create room", [], error.stack));
  }
};

// Update a room by ID
export const updateRoomByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  const {
    city,
    area,
    bedrooms,
    bathrooms,
    roomSize,
    kitchenRooms,
    extraRoom,
    rent,
    priceRange,
    amenities,
    furnished,
    preferredGender,
    description,
    houseFrontPicture,
    gallery,
    location_id,
    user_id,
  } = req.body;

  try {
    const updatedRoom = await updateRoomById(id, {
      city,
      area,
      bedrooms,
      bathrooms,
      roomSize,
      kitchenRooms,
      extraRoom,
      rent,
      priceRange,
      amenities,
      furnished,
      preferredGender,
      description,
      houseFrontPicture,
      gallery,
      location_id,
      user_id,
    });
    if (!updatedRoom) {
      throw new ApiError(404, `Room with id ${id} not found`);
    }
    res.json(new ApiResponse(200, updatedRoom, "Room updated successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to update room", [], error.stack));
  }
};

// Delete a room by ID
export const deleteRoomByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRoom = await deleteRoomById(id);
    if (!deletedRoom) {
      throw new ApiError(404, `Room with id ${id} not found`);
    }
    res.json(new ApiResponse(200, deletedRoom, "Room deleted successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to delete room", [], error.stack));
  }
};
