const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salon",
      required: true,
    },
    salonName: {type: String},
   salonPhone: {type: String},
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
      },
    ],
    serviceName: {type: Array},
    servicePrice: {type: Array},
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    customerName: {type: String},
    customerPhone: {type: String},
    customerAvatar: {type: String},
    bookingDate:{
      type:String,
      default:new Date().toUTCString(),
      required:true
  },
  bookingID: {
    type: String
  },
    approved: {
      type: Boolean,
      default: false,
    },
    rejected: {
      type: Boolean,
      default: false,
    },
    completedByCustomer: {
      type: Boolean,
      default: false,
    },
    completedBySalon: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
