
const Bookings = require('../Models/BookingModel')
//const Customers = require('../Models/customerModel')
const Services = require('../Models/serviceModel')
const { successResMsg } = require("../Utils/response");

exports.dashboard = async (req,res) => {
    try {
        // let salon = await Bookings.distinct("customer",{salon:req.params.id})
        // if (!salon) {
        //     return res.status(404).json({ message: 'Salon not found' })
        //  }
        //  console.log(salon.length)
        
        //get all customers
        const allCustomers = await Bookings.distinct("customer",{salon:req.params.id})
        //get all orders
        const allOrders = await Bookings.distinct("bookingID", {salon:req.params.id})
        //get all published services
        const publishedServices = await Services.find({isPublished:true,salon:req.params.id})
        //get all unpublished services
        const unPublishedServices = await Services.find({isPublished:false,salon:req.params.id})

        return  successResMsg(
            res,
            true,
            "Dashboard Returned Successfully",
            200,
           { "all-customers":allCustomers.length,"all-orders":allOrders.length,
            "published-services":publishedServices.length,"unpublished-services":unPublishedServices.length}
          );
            
            
        //     {code:200,"all-customers":allCustomers.length,"all-orders":allOrders.length,
        // "published-services":publishedServices.length,"unpublished-services":unPublishedServices.length})
    } catch (err){
        console.error(err)
        res.json({code:500,message:err.message})
    }
}

//module.exports = dashboard;
