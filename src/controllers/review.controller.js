import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getReviewsByRoomId,
} from "../models/review.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createReviewHandler = async (req, res, next) => {
  const { room_id, user_id, rating, comment } = req.body;
  try {
    const review = await createReview({ room_id, user_id, rating, comment });
    res
      .status(201)
      .json(new ApiResponse(201, review, "Review created successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to create review", [], error.stack));
  }
};

export const getAllReviewsHandler = async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(new ApiResponse(200, reviews));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch reviews", [], error.stack));
  }
};

export const getReviewByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);
    if (!review) {
      throw new ApiError(404, `Review with id ${id} not found`);
    }
    res.status(200).json(new ApiResponse(200, review));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch review", [], error.stack));
  }
};

export const updateReviewByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  const { room_id, user_id, rating, comment } = req.body;
  try {
    const review = await updateReviewById(id, {
      room_id,
      user_id,
      rating,
      comment,
    });
    if (!review) {
      throw new ApiError(404, `Review with id ${id} not found`);
    }
    res
      .status(200)
      .json(new ApiResponse(200, review, "Review updated successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to update review", [], error.stack));
  }
};

export const deleteReviewByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await deleteReviewById(id);
    if (!review) {
      throw new ApiError(404, `Review with id ${id} not found`);
    }
    res
      .status(200)
      .json(new ApiResponse(200, review, "Review deleted successfully"));
  } catch (error) {
    next(new ApiError(400, "Failed to delete review", [], error.stack));
  }
};

export const getReviewsByRoomIdHandler = async (req, res, next) => {
  const { room_id } = req.params;
  try {
    const reviews = await getReviewsByRoomId(room_id);
    res.status(200).json(new ApiResponse(200, reviews));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch reviews", [], error.stack));
  }
};


