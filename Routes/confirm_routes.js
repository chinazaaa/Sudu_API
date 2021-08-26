const express = require('express');
const resendOtp = require('../Controllers/confirmationSalon');
const resendOtpCustomer = require('../Controllers/confirmationCustomer');
const ConfirmSalon = require('../Controllers/confirmationSalon');
const ConfirmCustomer = require('../Controllers/confirmationCustomer');
const router = express.Router();


//Salon token Confirmation route
router.post('/salon', ConfirmSalon.ConfirmSalon)

//resend otp
router.post('/resend/otp/salon', resendOtp.OtpResendSalon)


//resend otp for customer
router.post('/resend/otp/customer', resendOtpCustomer.OtpResendCustomer)


//Customer token Confirmation route
router.post('/customer', ConfirmCustomer.ConfirmCustomer)
module.exports = router;

