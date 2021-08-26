const mongoose = require("mongoose")
const cloudinary = require("../Utils/cloudinary");
const { successResMsg } = require("../Utils/response");
const SalonOwner = require("../Models/salonOwner")
const Customer = require("../Models/customerModel")
const Salon = require("../Models/salon");
const fs = require("fs");
const _ = require("underscore");


exports.updateASalonOwner = async(req, res, next) => {

let query = { $set: {} };

Object.keys(req.body).forEach(requestBodyKey => { 
  let requestBodyFieldValue = req.body[requestBodyKey];
  query.$set[`local.${requestBodyKey}`] = requestBodyFieldValue;
});
const filter = {_id: req.params.id}
const salonOwner = await SalonOwner.findByIdAndUpdate(filter, query, {
  new: true,
})
if (!salonOwner) {
  return res.status(404).json({ message: 'Salon not found' })
}
else {
  successResMsg(
    res,
    true,
    "Profile Has Been Updated Successfully",
    200,
    salonOwner
  );
}
}



exports.updateASalon = async (req, res, next) => {
  try {
    const salon = await Salon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' })
    }

    await salon.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Profile Has Been Updated Successfully",
          200,
          salon
        );

      }
    });
    // return res.json({salon})
  } catch (error) {
    return res.status(404).json({ message: 'Salon not found' })
  }
}

//create a cloudinary upload helper function
const cloudinaryImageUploadMethod = async file => {
  return new Promise(resolve => {
      cloudinary.uploader.upload( file , (err, res) => {
        if (err) return res.status(500).send("upload image error")
          console.log( res.secure_url )
          resolve({
            res: res.secure_url
          }) 
        }
      ) 
  })
}


exports.updateGallery = async (req, res) => {
  
  try {
   
   //let profile = await Salon.findById(req.params.id);
   const salon = mongoose.Types.ObjectId(req.params.id)

    const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethod(path)
          urls.push(newPath)
          console.log(urls)
        }
          req.body.image = urls.map( url => url.res )
          
         await Salon.findByIdAndUpdate({_id: salon},req.body,{new:true,runValidators:true},(err,docs)=>{
            // if (err) console.error(err)
            // console.log(docs)
            if (err) { return res.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Profile Has Been Updated Successfully",
          200,
        );

      }
          })
          
  } 
  catch (error) {
    console.log(error)
    return res.status(404).json({ message: 'Salon not found' })
  }
}

exports.updateACustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    } else {
      await customer.save(function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        else {
          successResMsg(
            res,
            true,
            "Profile Has Been Updated Successfully",
            200,
            customer
          );

        }
      });
    }
    // return res.json({customer})
  } catch (error) {
    return res.status(404).json({ message: 'Customer not found' })
  }
}

// Get a particular salon owner profile

exports.getSalonOwner = async (req, res, next) => {
  try {
    const salonOwner = await SalonOwner.findById(req.params.id);
    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon Owner not found' })
    }
    return res.json({ salonOwner })
  } catch (error) {
    return res.status(404).json({ message: 'Salon owner not found' })
  }
}


// Get a particular customer  profile

exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    return res.json({ customer })
  } catch (error) {
    return res.status(404).json({ message: 'Customer not found' })
  }
}
