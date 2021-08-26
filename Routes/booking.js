const express = require("express");
const booking = require("../Controllers/booking");
const router = express.Router();
const auth = require("../Middleware/auth");

router.post("/booking/:storeId/:customerId", auth, booking.createBooking);
router.get("/booking/:id", auth, booking.getABooking);
router.get("/bookings", auth, booking.getBookings);
router.put("/:booking/:id", auth, booking.updateBooking);

// aprove

router.put("/approve/booking/:id", auth, booking.approveBooking);

// reject

router.put("/reject/booking/:id", auth, booking.rejectBooking);

// completed by store

router.put("/complete/store/booking/:id", auth, booking.completedByStore);

// get customer orders

router.get("/customer/booking/:id", auth, booking.getCustomerOrders);

// completed by customer
router.put("/complete/customer/booking/:id", auth, booking.completedByCustomer);


//get uncompleted by customer
router.get("/uncompleted/customer/booking/:id", auth, booking.getCustomerUncompletedOrders);

//get completed by customer
router.get("/completed/customer/booking/:id", auth, booking.getCustomerCompletedOrders);

//get uncompleted by store
router.get("/uncompleted/store/booking/:id", auth, booking.getStoreUncompletedOrders);

//get completed by store
router.get("/completed/store/booking/:id", auth, booking.getStoreCompletedOrders);

//get unapproved orders by store
router.get("/unapproved/store/booking/:id", auth, booking.getStoreUnApprovedOrders);
module.exports = router;