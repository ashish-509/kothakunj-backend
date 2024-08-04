import {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../models/booking.model.js";
import { ApiError } from "../utils/ApiError.js";

const createBookingHandler = async (req, res) => {
  const { user_id, room_id, booking_date, start_date, end_date, status } = req.body;

  try {
    const booking = await createBooking({
      user_id,
      room_id,
      booking_date,
      start_date,
      end_date,
      status,
    });
    res.status(201).json({
      success: true,
      data: booking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error while creating booking.",
    });
  }
};

const getBookingByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await getBookingById(id);
    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }
    res.status(200).json({
      success: true,
      data: booking,
      message: "Booking retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const getAllBookingsHandler = async (req, res) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateBookingHandler = async (req, res) => {
  const { id } = req.params;
  const { user_id, room_id, booking_date, start_date, end_date, status } = req.body;

  try {
    const updatedBooking = await updateBooking(id, {
      user_id,
      room_id,
      booking_date,
      start_date,
      end_date,
      status,
    });
    if (!updatedBooking) {
      throw new ApiError(404, "Booking not found");
    }
    res.status(200).json({
      success: true,
      data: updatedBooking,
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const deleteBookingHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await deleteBooking(id);
    if (!deletedBooking) {
      throw new ApiError(404, "Booking not found");
    }
    res.status(200).json({
      success: true,
      data: deletedBooking,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export {
  createBookingHandler,
  getBookingByIdHandler,
  getAllBookingsHandler,
  updateBookingHandler,
  deleteBookingHandler,
};
