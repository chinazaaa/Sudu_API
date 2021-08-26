const express = require('express');
const {  resetPasswordSalon } = require('../Controllers/forgotPasswordSalon');
const { resetPasswordCustomer } = require('../Controllers/forgotPasswordCustomer');
const router = express.Router();
const { body } = require("express-validator");


router.put('/salon', resetPasswordSalon);
//customer forgot password route

router.put('/customer', resetPasswordCustomer);
module.exports = router;
