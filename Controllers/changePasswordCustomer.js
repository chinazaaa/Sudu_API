const bCrypt = require("bcryptjs");
const random = require("../Utils/random");
const CustomerModel = require("../Models/customerModel");
//const response = require("../Utils/response");
const { errorResMsg, successResMsg } = require('../Utils/response');
const { comparePassword, hashPassword } = require('../Utils//password')


const ChangePasswordCustomer = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
     // const { id } = req.params;

     // const user = await getUserById(userId)
     const user = await CustomerModel.findById(req.user.id);
      //const user = await SalonOwnerModel.findById({_id: id})
      console.log(user)
      
      if (!user)
      return res.status(404).json({message: "Customer not found"}) 

      const isValid = await comparePassword(oldPassword, user.local.password);
      console.log(isValid);

      if (!isValid) {
        return res.status(404).json({message: "Not valid"}) 
      }
      const hashedPassword = hashPassword(newPassword);
   
    // Update Password
  user.password = hashedPassword;
  await user.save();
  return successResMsg(res, true, "Your password has been changed", 200, user);
    } catch (err) {
      console.log(err);
      return res.status(404).json({message: "Error Occured"}) 
    }
};

module.exports = {
    ChangePasswordCustomer,
}
 
