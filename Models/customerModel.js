const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const customerSchema = new mongoose.Schema({
  phone: { type: Number, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  isEmailVerified: { type: Boolean, default: 0 },
  api_token: { type: String },
  isActive: { type: Boolean, default: 1 },
  password: { type: String, required: true },
  otp: { type: Number },
  userRole: { type: String, default: "ROL-CUSTOMER" },
  salon_ref_id: { type: Schema.Types.ObjectId, ref: "salonOwner" },

  avatar: {
    type: String,
    default: "https://res.cloudinary.com/saloney/image/upload/v1623862747/SaloneyLogo.png",
    filename: String
  },
  // cloudinary_id: {
  //   type: String,
  // },
},
  { timestamps: true });

module.exports = mongoose.model('customer', customerSchema);