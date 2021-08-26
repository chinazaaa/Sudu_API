const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    storeName: {type: String},
   storePhone: {type: String},
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
      },
    ],
    serviceName: {type: Array},
    serviceOptions: {type: Array},
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
    completedByStore: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
