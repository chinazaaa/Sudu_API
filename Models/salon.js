const mongoose = require('mongoose');
const geocoder = require('../Utils/geocoder');
const Schema = mongoose.Schema;
const salonSchema = new mongoose.Schema({
    nameOfSalon: { type: String,required: true },
    description: { type: String, default: "Not set"},
    image: { type: Array},
    // FIXME New Code
    phone: { type: Number, required: true },
    category: { type: String },//, required: true},
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/saloney/image/upload/v1623862747/SaloneyLogo.png",
      filename: String
    },

    address: {
        type: String,
        required: true, 
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          index: '2dsphere'
        //   required: true
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        //   required: true
        },
        formattedAddress: String
      },
    salonOwner: {
        type: Schema.Types.ObjectId,
        ref: 'salonOwner'
    },
},
    { timestamps: true });

    //Geocode and create location

salonSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
   this.location = {
       type: 'Point',
       coordinates: [loc[0].longitude, loc[0].latitude],
       formattedAddress: loc[0].formattedAddress,
      

   }
   // do not save address
   this.address = undefined;
   next();
});
//salonSchema.index({location: '2dsphere'})
module.exports = mongoose.model('salon', salonSchema)