const express = require('express');
const changePasswordStore = require('../Controllers/changePasswordStore');
const ChangePasswordCustomer = require('../Controllers/changePasswordCustomer');
const auth = require("../Middleware/auth");
const router = express.Router();

//Store change password route
router.put('/storeOwner/changePassword/:id', auth, changePasswordStore.changePasswordStore)


//Customer token password route
router.put('/customer/changePassword/:id', auth, ChangePasswordCustomer.ChangePasswordCustomer)
module.exports = router;

