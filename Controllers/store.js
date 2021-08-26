const mongoose = require("mongoose")

const Store = require("../Models/store")

exports.getAStore = async(req, res, next) => {
    const _id = req.params.id;
    const store = await Store.findOne({ _id});
    if (store) {
        return res.status(200).json({message: "Your store", store}) 
    } else {
        return res.json({ message: 'Store not found'})
    }
    
}







