const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
	userName:{ type: String, required: true},
	email:{ type: String, required: true},
	password: { type: String, required: true },
	 userRole: { type: String, default: "ROL-ADMIN" }
},
 
 { timestamps: true});

 

module.exports = mongoose.model('Admin', AdminSchema);