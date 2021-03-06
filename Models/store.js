const mongoose = require('mongoose');
const geocoder = require('../Utils/geocoder');
const Schema = mongoose.Schema;
const storeSchema = new mongoose.Schema({
    nameOfStore: { type: String,required: true, unique: true },
    description: { type: String, default: "Not set"},
    image: { type: Array},
    // FIXME New Code
    phone: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },

    category: { type: String },//, required: true},
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/sudu/image/upload/v1629976631/sudu_logo_hh2la3.png",
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
          //index: '2dsphere'
        //   required: true
        },
        coordinates: {
          type: [Number],
          //index: '2dsphere'
        //   required: true
        },
        formattedAddress: String
      },
    storeOwner: {
        type: Schema.Types.ObjectId,
        ref: 'storeOwner'
    },
},
    { timestamps: true });

    //Geocode and create location

storeSchema.pre('save', async function(next) {
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
//storeSchema.index({location: '2dsphere'})
module.exports = mongoose.model('store', storeSchema)