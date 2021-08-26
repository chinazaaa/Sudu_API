const express = require('express');
const { forgotPasswordSalon} = require('../Controllers/forgotPasswordSalon');
const { forgotPasswordCustomer} = require('../Controllers/forgotPasswordCustomer');
const router = express.Router();
const { body } = require("express-validator");

//salon forgot password route

router.put('/salon', forgotPasswordSalon);

//customer forgot password route
router.put('/customer', forgotPasswordCustomer);

module.exports = router;
