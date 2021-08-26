const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const serviceSchema = mongoose.Schema({
	service:{type: String, required: true},
	price:{type: String, required: true},
	description:{type: String, required: true},
	category:{type: String, required: true},
	isPublished: { type: Boolean, default: false },
   image: { type: String, required: true},
      salon :{ 
      	type: Schema.Types.ObjectId, 
      	ref: "salon" },
		  cloudinary_id: {type: String},
},
{ timestamps: true});

module.exports = mongoose.model('service', serviceSchema)