import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createBooking, getAllBookings, getUserBookings, updateBookingStatus, deleteBooking } from '../controllers/bookingController.js';
// user booking routes
const bookingRouter = express.Router();
// create a new booking
bookingRouter.post("/create", protect, createBooking);
// user's booking
bookingRouter.get("/my-bookings", protect, getUserBookings);

// admin management routes

// fetch all bookings
bookingRouter.get("/bookings", getAllBookings);
// update status booking
bookingRouter.put("/update-status/:bookingId", updateBookingStatus);
// delete booking
bookingRouter.post("/delete", deleteBooking);

export default bookingRouter;