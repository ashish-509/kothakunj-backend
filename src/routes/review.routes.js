import express from "express";
import {
  createReviewHandler,
  getAllReviewsHandler,
  getReviewByIdHandler,
  updateReviewByIdHandler,
  deleteReviewByIdHandler,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/reviews", verifyJWT, createReviewHandler);

router.get("/reviews", getAllReviewsHandler);

router.get("/reviews/:id", getReviewByIdHandler);

router.put("/reviews/:id", verifyJWT, updateReviewByIdHandler);

router.delete("/reviews/:id", verifyJWT, deleteReviewByIdHandler);

export default router;

