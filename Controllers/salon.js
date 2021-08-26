const mongoose = require("mongoose")

const Salon = require("../Models/salon")

//const geocode = require("..//Utils/geocoder")
// exports.getSalons = async(req, res, next) => {
//     try {
      
//         const salons = await Salon.find({location: {$near: {$maxDistance: 2000,$minDistance: 100, $geometry: {type: "Point",coordinates:[6.4698, 3.5852 ]}}}})
//         console.log(salons)
//         return res.status(200).json({message: "Your salon", salons}) 
//     } catch (err) {
//         console.log(err)
//         return res.json({ message: 'Salon not found'})

//     }
// }

// exports.getASalonbyCustomer = async(req, res, next) => {
//     const _id = req.params.id;
//     const salon = await Salon.findOne({ _id});
//     if (salon) {
//         return res.status(200).json({message: "Your salon", data:salon}) 
//     } else {
//         return res.json({ message: 'Salon not found'})
//     }
    
// }
exports.getASalon = async(req, res, next) => {
    const _id = req.params.id;
    const salon = await Salon.findOne({ _id});
    if (salon) {
        return res.status(200).json({message: "Your salon", salon}) 
    } else {
        return res.json({ message: 'Salon not found'})
    }
    
}


// exports.getMapSalons = async(req, res, next) => {
//     try {
//         //await Salon.ensureIndex({ loc: '2dsphere' });
//         //await Salon.createIndex({point:"2dsphere"});
//         //const salons = await Salon.find({location:{$near:{geometry:{type:"Point", coordinates: [3.3792056, 3.3792056]}}}});
//        //const salon = await Salon.createIndex({location:"2dsphere"})
//         const salons = await Salon.find({location: {$near: {$maxDistance: 50000, $geometry: {type: "Point",coordinates:[3.3792056, 3.3792056]}}}})
//         console.log(salons)
//         return res.status(200).json({message: "Your salon", salons}) 
//     } catch (err) {
//         console.log(err)
//         return res.json({ message: 'Salon not found'})

//     }
// }





