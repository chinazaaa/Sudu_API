const Service = require("../Models/serviceModel");
const cloudinary = require("../Utils/cloudinary");
// const SalonOwnerModel = require("../Models/salonOwner");
const Salon = require("../Models/salon");
const { successResMsg } = require('../Utils/response');


exports.createService = async (req, res) => {
  try {
     
    const salon = await Salon.findById(req.params.id);
    console.log(salon);
     // Upload image to cloudinary
     const result = await cloudinary.uploader.upload(req.file.path);
     console.log(result)
    if (!salon) {
      return res.json({ message: "Salon not found" });
    }
    const service = await Service.create({
      service: req.body.service,
      description: req.body.description,
      image: result.secure_url,
      category: req.body.category,
      price: req.body.price,
      salon: salon._id,
      cloudinary_id: result.public_id
    });
    successResMsg(
      res,
      true,
      "Service Has Been Created Successfully",
      200,
      service
    );
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: error.message });
  }
};
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    successResMsg(
      res,
      true,
      "Service Has Been Deleted Successfully",
      200,
      service
    );
  } catch (error) {
    return res.status(404).json({ message: "Service not found" });
  }
};

//update service by image
exports.updateService = async (req, res) => {

  try{
  const id = req.params.id
  let service = await Service.findById(id);
    
        // Delete image from cloudinary
       // await cloudinary.uploader.destroy(user.cloudinary_id);  // truncate the db and add cloudinary_id to the model and uncomment this line and also this fuction parameter you're passing isnt complete, google this fuction and see how it is implemented
        // Upload image to cloudinary
        let result;
        if (req.file) {
          result = await cloudinary.uploader.upload(req.file.path);
          console.log(result)
        }
        image = result.secure_url
        // const data = {
        //   //name: req.body.name || user.name,
        //   image: result.secure_url || Service.image,
        //   // cloudinary_id: result.public_id || user.cloudinary_id,
        // };
     service = await Service.findOneAndUpdate({_id:id}, req.body,{
      new: true,runValidators:true
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return  successResMsg(
      res,
      true,
      "Service Has Been Updated Successfully",
      200,
      service
    );
  } catch (error) {
    console.error(error)
    return res.status(404).json({ message:error.message });
  }
};

exports.publishService = async (req, res) => {

  try {
    const service = await Service.findById(req.params.serviceId);
    console.log(service)
    service.isPublished = true
    console.log(service.isPublished)

    await service.save(function (err) {
      if (err) { return response.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Service Has Been Published Successfully",
          200,
          service
        );

      }
    });

  } catch (error) {
    console.error(error);
    console.log("End of Error");
    return res.status(404).json({ message:error.message });
  }
};



exports.unpublishService = async (req, res) => {

  try {
    const service = await Service.findById(req.params.serviceId);
    console.log(service)
    service.isPublished = false
    console.log(service.isPublished)

    await service.save(function (err) {
      if (err) { return response.status(500).send({ msg: err.message }); }
      else {
        successResMsg(
          res,
          true,
          "Service Has Been Unpublished Successfully",
          200,
          service
        );

      }
    });

  } catch (error) {
    console.error(error);
    console.log("End of Error");
    return res.status(404).json({ message: error.message });
  }
};
// find services in the db
exports.findServices = (req, res) => {
  Service.find()
    .then((service) => {
      res.status(200).json({
        message: "All services found",
        service
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.findAService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    successResMsg(
      res,
      true,
      "Service Found",
      200,
      service
    );
  } catch (error) {
    console.error(error)
    return res.status(404).json({ message: error.message });
  }
};

exports.getPublished = async (req, res) => {
  try {
    const salonId = req.params.salonId;
    const published = await Service.find({salon:salonId, isPublished: true});
    console.log(published)
    if (!published) {
      return res.status(404).json({ message: "published services not found" });
    }
    return   successResMsg(
      res,
      true,
      "List of Published Services",
      200,
      published
    );
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};



exports.getunPublished = async (req, res) => {
  try {
    const salonId = req.params.salonId;
    const unpublished = await Service.find({salon:salonId, isPublished: false});
    console.log(unpublished)
    if (!unpublished) {
      return res.status(404).json({ message: "published services not found" });
    }
    successResMsg(
      res,
      true,
      "List of UnPublished Services",
      200,
      unpublished
    );
  } catch (error) {
    console.error(error)
    return res.status(404).json({ message: error.message });
  }
};