const express = require('express');
const changePasswordSalon = require('../Controllers/changePasswordSalon');
const ChangePasswordCustomer = require('../Controllers/changePasswordCustomer');
const auth = require("../Middleware/auth");
const router = express.Router();

//Salon change password route
router.put('/salonOwner/changePassword/:id', auth, changePasswordSalon.changePasswordSalon)


//Customer token password route
router.put('/customer/changePassword/:id', auth, ChangePasswordCustomer.ChangePasswordCustomer)
module.exports = router;

