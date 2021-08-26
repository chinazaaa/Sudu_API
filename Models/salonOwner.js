const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const salonOwnerSchema = new mongoose.Schema({
  identifier: { type: String, required: true, unique: true },
  local: {
    phone: { type: Number, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    otp: { type: Number },
    api_token: { type: String },
    isActive: { type: Boolean, default: 1 },
    isEmailVerified: { type: Boolean, default: 0 },
    password: { type: String, required: true },
    //owner_ref_id: { type: mongoose.Schema.Types.ObjectId, ref: "service" },
    customer: { type: Schema.Types.ObjectId, ref: "customer" },
    salon: {type: Schema.Types.ObjectId, ref: "salon"},
    userRole: { type: String, default: "ROL-SALON" },
    
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/saloney/image/upload/v1623862747/SaloneyLogo.png",
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

// salonOwnerSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// })


// salonOwnerSchema.set('toJSON', {
//   virtuals: true
// })

module.exports = mongoose.model('salonOwner', salonOwnerSchema);