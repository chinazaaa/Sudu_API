const express = require('express');
const {  resetPasswordStore } = require('../Controllers/forgotPasswordStore');
const { resetPasswordCustomer } = require('../Controllers/forgotPasswordCustomer');
const router = express.Router();
const { body } = require("express-validator");


router.put('/store', resetPasswordStore);
//customer forgot password route

router.put('/customer', resetPasswordCustomer);
module.exports = router;
