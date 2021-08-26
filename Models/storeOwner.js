const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const storeOwnerSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  local: {
    phone: { type: Number, required: true },
    userName: { type: String, required: true},
    email: { type: String},
    otp: { type: Number },
    api_token: { type: String },
    isActive: { type: Boolean, default: 1 },
    isEmailVerified: { type: Boolean, default: 0 },
    password: { type: String, required: true },
    //owner_ref_id: { type: mongoose.Schema.Types.ObjectId, ref: "service" },
    customer: { type: Schema.Types.ObjectId, ref: "customer" },
    store: {type: Schema.Types.ObjectId, ref: "store"},
    userRole: { type: String, default: "ROL-STORE" },
    
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/sudu/image/upload/v1629976631/sudu_logo_hh2la3.png",
    filename: String
  },
  // cloudinary_id: {
  //   type: String
  // },
  // image: {
    
  //     type: String,
      
  //   filename: String
  // },
},
  { timestamps: true });





module.exports = mongoose.model('storeOwner', storeOwnerSchema);