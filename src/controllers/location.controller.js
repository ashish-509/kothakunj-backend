import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById,
  getLocationsByCity,
} from "../models/location.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createLocationHandler = async (req, res, next) => {
  try {
    const location = await createLocation(req.body);
    res
      .status(201)
      .json(new ApiResponse(201, location, "Location created successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to create location", [], error.stack));
  }
};

export const getAllLocationsHandler = async (req, res, next) => {
  try {
    const locations = await getAllLocations();
    res.status(200).json(new ApiResponse(200, locations));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch locations", [], error.stack));
  }
};

export const getLocationByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const location = await getLocationById(id);
    if (!location) {
      throw new ApiError(404, `Location with id ${id} not found`);
    }
    res.status(200).json(new ApiResponse(200, location));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch location", [], error.stack));
  }
};

export const updateLocationByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const location = await updateLocationById(id, req.body);
    if (!location) {
      throw new ApiError(404, `Location with id ${id} not found`);
    }
    res
      .status(200)
      .json(new ApiResponse(200, location, "Location updated successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to update location", [], error.stack));
  }
};

export const deleteLocationByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const location = await deleteLocationById(id);
    if (!location) {
      throw new ApiError(404, `Location with id ${id} not found`);
    }
    res
      .status(200)
      .json(new ApiResponse(200, location, "Location deleted successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to delete location", [], error.stack));
  }
};

export const getLocationsByCityHandler = async (req, res, next) => {
  const { city } = req.params;
  try {
    const locations = await getLocationsByCity(city);
    res.status(200).json(new ApiResponse(200, locations));
  } catch (error) {
    next(
      new ApiError(500, "Failed to fetch locations by city", [], error.stack)
    );
  }
};


export default {
  createLocationHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
  updateLocationByIdHandler,
  deleteLocationByIdHandler,
  getLocationsByCityHandler,
};
