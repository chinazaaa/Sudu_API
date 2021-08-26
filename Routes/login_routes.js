const express = require('express');
const { login } = require('../Controllers/login_controller');
const router = express.Router();
const { body } = require("express-validator");

//User registration route
//router.post('/login/salonOwner', LoginController.loginSalon)
//Customer registration route
//router.post('/login/customer',  LoginController.loginCustomer)

router.post('/login/:userLoginTypeChosen',[
        body("password").exists().isLength({ min: 8, max:25 }).withMessage("Password must be between 8 to 25 characters long"),
        body("userName").escape().isLength({ min: 4, max: 25 }).withMessage("userName must be between 4 to 25 characters long"),
        
], login);

module.exports = router;
