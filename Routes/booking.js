const express = require("express");
const booking = require("../Controllers/booking");
const router = express.Router();
const auth = require("../Middleware/auth");

router.post("/booking/:salonId/:customerId", auth, booking.createBooking);
router.get("/booking/:id", auth, booking.getABooking);
router.get("/bookings", auth, booking.getBookings);
router.put("/:booking/:id", auth, booking.updateBooking);

// aprove

router.put("/approve/booking/:id", auth, booking.approveBooking);

// reject

router.put("/reject/booking/:id", auth, booking.rejectBooking);

// completed by salon

router.put("/complete/salon/booking/:id", auth, booking.completedBySalon);

// get customer orders

router.get("/customer/booking/:id", auth, booking.getCustomerOrders);

// completed by customer
router.put("/complete/customer/booking/:id", auth, booking.completedByCustomer);


//get uncompleted by customer
router.get("/uncompleted/customer/booking/:id", auth, booking.getCustomerUncompletedOrders);

//get completed by customer
router.get("/completed/customer/booking/:id", auth, booking.getCustomerCompletedOrders);

//get uncompleted by salon
router.get("/uncompleted/salon/booking/:id", auth, booking.getSalonUncompletedOrders);

//get completed by salon
router.get("/completed/salon/booking/:id", auth, booking.getSalonCompletedOrders);

//get unapproved orders by salon
router.get("/unapproved/salon/booking/:id", auth, booking.getSalonUnApprovedOrders);
module.exports = router;