import express from "express";
import {
  createBookingHandler,
  getBookingByIdHandler,
  getAllBookingsHandler,
  updateBookingHandler,
  deleteBookingHandler,
} from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/bookings", verifyJWT, createBookingHandler);

router.get("/bookings", verifyJWT, getBookingByIdHandler);

router.get("/bookings/:id", verifyJWT, getAllBookingsHandler);

router.put("/bookings/:id", verifyJWT, updateBookingHandler);

router.delete("/bookings/:id", verifyJWT, deleteBookingHandler);

export default router;
