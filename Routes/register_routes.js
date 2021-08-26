const express = require('express');
const RegisterController = require('../Controllers/register_controller');
const RegisterUserController = require('../Controllers/registerCustomer_controller');
const resendOtp = require('../Controllers/register_controller');
const ConfirmSalon = require('../Controllers/confirmationSalon');
const ConfirmCustomer = require('../Controllers/confirmationCustomer');
const router = express.Router();
const { body } = require("express-validator");

//User registration route
router.post('/salon',[
       body("phone").isInt().withMessage("Phone number must be a number"),
        body("password").exists().isLength({ min: 8, max:25 }).withMessage("Password must be between 8 to 25 characters long"),
        body("userName").escape().isLength({ min: 4, max: 25 }).withMessage("userName must be between 4 to 25 characters long"),
        body("email").exists().trim().isEmail().withMessage("Email must be valid")
],  RegisterController.registerSalon)
//Customer registration route
router.post('/customer',[
       body("phone").isInt().withMessage("Phone number must be a number"),
        body("password").exists().isLength({ min: 8, max:25 }).withMessage("Password must be between 8 to 25 characters long"),
        body("userName").escape().isLength({ min: 4, max: 25 }).withMessage("userName must be between 4 to 25 characters long"),
        body("email").exists().trim().isEmail().withMessage("Email must be valid")
], RegisterUserController.registerCustomer)

//Salon token Confirmation route
//router.post('/salon', ConfirmSalon.ConfirmSalon)


//Customer token Confirmation route
//router.post('/customer', ConfirmCustomer.ConfirmCustomer)
module.exports = router;

