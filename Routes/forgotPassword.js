const express = require('express');
const { forgotPasswordStore} = require('../Controllers/forgotPasswordStore');
const { forgotPasswordCustomer} = require('../Controllers/forgotPasswordCustomer');
const router = express.Router();
const { body } = require("express-validator");

//store forgot password route

router.put('/store', forgotPasswordStore);

//customer forgot password route
router.put('/customer', forgotPasswordCustomer);

module.exports = router;
