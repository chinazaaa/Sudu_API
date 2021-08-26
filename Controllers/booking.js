const { successResMsg } = require('../Utils/response');
const Booking = require("../Models/BookingModel");
const customerModel = require("../Models/customerModel");
const salonModel = require("../Models/salon");
const serviceModel = require("../Models/serviceModel");

//exports.createbooking
//exports.getbooking
//exports.getbookings
//exports.updatebookings(approving and completing)


exports.createBooking = async (req, res, next) => {

  //Generate 5random characters to insert into this.body
  function makeBody(length) {
    var result           = [];
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}
  try {

    const customer = await customerModel.findById(req.params.customerId).populate();
    const salon = await salonModel.findById(req.params.salonId).populate();
    
    // populating service name and price
    const serviceNameArray = [];
    const servicePriceArray = [];
  
    for (let i = 0; i < req.body.serviceIds.length; i++) {
     let eachSalon = req.body.serviceIds[i] 
        const service = await serviceModel.findById(eachSalon).populate();
        console.log(service.service)
        serviceNameArray.push(service.service);
        servicePriceArray.push(service.price);
    }
   
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    if (customer.userRole != "ROL-CUSTOMER")
      return res.status(403).json({ message: "Unauthorized" });
    const booking = await Booking.create({
      salon: req.params.salonId,
      services: req.body.serviceIds,
      bookingDate: req.body.bookingDate,
      customer: req.params.customerId,
      customerName: customer.userName,
      customerPhone: customer.phone,
      customerAvatar: customer.avatar,
      salonName: salon.nameOfSalon,
      salonPhone: salon.phone,
      serviceName: serviceNameArray,
      servicePrice: servicePriceArray,
      salon: req.params.salonId,
      bookingID: makeBody(4)
      
      // date: req.body.datetime
    }
    )
   

  
    return res.json({ message: "Booking successfully created", booking });
  } catch (error) {
    console.error(error)
  }
};
exports.getBookings = async (req, res) => {
  //get all bookinga
  Booking.find()
    .then((booking) => {
      res.status(200).json({
        message: "All bookings found",
        booking,
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getABooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.json({ message: "Booking found", booking });
  } catch (error) {
    return res.status(404).json({ message: "Booking not found" });
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      // FIXME this seems quite wrong
      //Shouldn't it be
      // req.body.booking 
      req.body.booking,
      {
        new: true,
      }
    );
    if (!booking) throw new Error("booking not found");
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};



exports.approveBooking = async (req, res) => {

  try {
    const booking = await Booking.findById(req.params.id);
    console.log(booking)
    booking.approved = true
    console.log(booking.approved)

    await booking.save(function (err) {
      if (err) { return response.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Booking Has Been Approved Successfully",
          200,
          booking
        );

      }
    });

  } catch (error) {
    console.log(error);
    console.log("This is an Error");
    console.error(error);
    console.log("End of Error");
    return res.status(404).json({ message: "Booking not found" });
  }
};



exports.rejectBooking = async (req, res) => {

  try {
    const booking = await Booking.findById(req.params.id);
    console.log(booking)
    booking.rejected = true
    console.log(booking.rejected)

    await booking.save(function (err) {
      if (err) { return response.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Booking Has Been Rejected Successfully",
          200,
          booking
        );

      }
    });

  } catch (error) {
    console.log(error);
    console.log("This is an Error");
    console.error(error);
    console.log("End of Error");
    return res.status(404).json({ message: "Booking not found" });
  }
};



exports.completedByCustomer = async (req, res) => {

  try {
    const booking = await Booking.findById(req.params.id);
    console.log(booking)
    booking.completedByCustomer = true
    console.log(booking.completedByCustomer)

    await booking.save(function (err) {
      if (err) { return response.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Booking Has Been Completed Successfully",
          200,
          booking
        );

      }
    });

  } catch (error) {
    console.log(error);
    console.log("This is an Error");
    console.error(error);
    console.log("End of Error");
    return res.status(404).json({ message: "Booking not found" });
  }
};


exports.completedBySalon = async (req, res) => {

  try {
    const booking = await Booking.findById(req.params.id);
    console.log(booking)
    booking.completedBySalon = true
    console.log(booking.completedBySalon)

    await booking.save(function (err) {
      if (err) { return response.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Booking Has Been Completed Successfully",
          200,
          booking
        );

      }
    });

  } catch (error) {
    console.log(error);
    console.log("This is an Error");
    console.error(error);
    console.log("End of Error");
    return res.status(404).json({ message: "Booking not found" });
  }
};


exports.getCustomerUncompletedOrders = async (req, res, next) => {
  try {
    const customer = req.params.id;
    const uncompleted = await Booking.find({customer:customer, completedByCustomer: false});
    console.log(uncompleted)
    if (!uncompleted) {
      return res.status(404).json({ message: "Uncompleted Bookings not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of Uncompleted Bookings",
      200,
      uncompleted
    );
  } catch (error) {
    return res.status(404).json({ message: "Uncompleted Bookings not found" });
  }
};


exports.getCustomerCompletedOrders = async (req, res, next) => {
  try {
    const customer = req.params.id;
    const completed = await Booking.find({customer:customer, completedByCustomer: true});
    console.log(completed)
    if (!completed) {
      return res.status(404).json({ message: "Completed Bookings not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of Completed Bookings",
      200,
      completed
    );
  } catch (error) {
    return res.status(404).json({ message: "Completed Bookings not found" });
  }
};


exports.getSalonCompletedOrders = async (req, res, next) => {
  try {
    const salon = req.params.id;
    const completed = await Booking.find({salon:salon, completedBySalon: true});
    console.log(completed)
    if (!completed) {
      return res.status(404).json({ message: "Completed Bookings not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of Completed Bookings",
      200,
      completed
    );
  } catch (error) {
    return res.status(404).json({ message: "Completed Bookings not found" });
  }
};

exports.getSalonUncompletedOrders = async (req, res, next) => {
  try {
    const salon = req.params.id;
    const uncompleted = await Booking.find({salon:salon, completedBySalon: false});
    console.log(uncompleted)
    if (!uncompleted) {
      return res.status(404).json({ message: "Uncompleted Bookings not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of Uncompleted Bookings",
      200,
      uncompleted
    );
  } catch (error) {
    return res.status(404).json({ message: "Uncompleted Bookings not found" });
  }
};



exports.getSalonUnApprovedOrders = async (req, res, next) => {
  try {
    const salon = req.params.id;
    const unapproved = await Booking.find({salon:salon, rejected: false, approved: false});
    console.log(unapproved)
    if (!unapproved) {
      return res.status(404).json({ message: "unApproved Bookings not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of unapproved Bookings",
      200,
      unapproved
    );
  } catch (error) {
    return res.status(404).json({ message: "unApproved Bookings not found" });
  }
};


exports.getCustomerOrders = async (req, res, next) => {
  try {
    const customer = req.params.id;
    const orders = await Booking.find({customer:customer});
    console.log(orders)
    if (!orders) {
      return res.status(404).json({ message: " Bookings not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of Customers Bookings",
      200,
      orders
    );
  } catch (error) {
    return res.status(404).json({ message: "Customers Bookings not found" });
  }
};