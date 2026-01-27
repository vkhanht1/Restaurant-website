import Booking from "../models/bookingModel.js";
// create new booking table
export const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, phone, numberOfPeople, date, time, note } = req.body;
    // check for required fields
    if (!name || !phone || !numberOfPeople || !date || !time) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // check the same booking is not ready
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" },
    });
    if (existingBooking)
      return res
        .status(400)
        .json({ message: "This time slot is already booked", success: false });
    // create booking linked to user    
    const booking = await Booking.create({
      user: id, name, phone, numberOfPeople, date, time, note
    });
    res
      .status(201)
      .json({ success: true, message: "Table booked successfully", booking });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
// retrieve bookings for user
export const getUserBookings = async (req, res) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.find({ user: id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
// retrieve all bookings for admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
// update booking status for admin 
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    booking.status = status;
    await booking.save();
    res
      .status(200)
      .json({ success: true, message: "Booking status updated", booking });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error", success: false });
  }
};
// admin delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }
    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting booking" });
  }
}