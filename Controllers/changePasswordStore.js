//const bCrypt = require("bcryptjs");
//const random = require("../Utils/random");
const StoreOwnerModel = require("../Models/storeOwner");
//const response = require("../Utils/response");
const { successResMsg } = require('../Utils/response');
const { comparePassword, hashPassword } = require('../Utils/password')


const changePasswordStore = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      //const { id } = req.params;

     // const user = await getUserById(userId)
     const user = await StoreOwnerModel.findById(req.user.id);
      console.log(user)
   
      if (!user)
      return res.status(404).json({message: "Store not found"}) 

      const isValid = await comparePassword(oldPassword, user.local.password);
      console.log(isValid);

      if (!isValid) {
        return res.status(404).json({message: "Not valid"}) 
      }
      const hashedPassword = hashPassword(newPassword);
   
    // Update Password
  user.local.password = hashedPassword;
  await user.save();
  return successResMsg(res, true, "Your password has been changed", 200, user);
    } catch (err) {
      console.log(err);
      return res.status(404).json({message: "Error Occured"}) 
    }
};

module.exports = {
    changePasswordStore,
}
 
