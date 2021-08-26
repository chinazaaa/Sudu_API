const mongoose = require("mongoose")
const cloudinary = require("../Utils/cloudinary");
const { successResMsg } = require("../Utils/response");
const StoreOwner = require("../Models/storeOwner")
const Customer = require("../Models/customerModel")
const Store = require("../Models/store");
const fs = require("fs");
const _ = require("underscore");


exports.updateAStoreOwner = async(req, res, next) => {

let query = { $set: {} };

Object.keys(req.body).forEach(requestBodyKey => { 
  let requestBodyFieldValue = req.body[requestBodyKey];
  query.$set[`local.${requestBodyKey}`] = requestBodyFieldValue;
});
const filter = {_id: req.params.id}
const storeOwner = await StoreOwner.findByIdAndUpdate(filter, query, {
  new: true,
})
if (!storeOwner) {
  return res.status(404).json({ message: 'Store not found' })
}
else {
  successResMsg(
    res,
    true,
    "Profile Has Been Updated Successfully",
    200,
    storeOwner
  );
}
}



exports.updateAStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }

    await store.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Profile Has Been Updated Successfully",
          200,
          store
        );

      }
    });
  } catch (error) {
    return res.status(404).json({ message: 'Store not found' })
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
   
   const store = mongoose.Types.ObjectId(req.params.id)

    const urls = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethod(path)
          urls.push(newPath)
          console.log(urls)
        }
          req.body.image = urls.map( url => url.res )
          
         await Store.findByIdAndUpdate({_id: store},req.body,{new:true,runValidators:true},(err,docs)=>{
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
    return res.status(404).json({ message: 'Store not found' })
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

// Get a particular store owner profile

exports.getStoreOwner = async (req, res, next) => {
  try {
    const storeOwner = await StoreOwner.findById(req.params.id);
    if (!storeOwner) {
      return res.status(404).json({ message: 'Store Owner not found' })
    }
    return res.json({ storeOwner })
  } catch (error) {
    return res.status(404).json({ message: 'Store owner not found' })
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
