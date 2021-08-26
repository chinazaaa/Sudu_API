const express = require('express');
const resendOtp = require('../Controllers/confirmationStore');
const resendOtpCustomer = require('../Controllers/confirmationCustomer');
const ConfirmStore = require('../Controllers/confirmationStore');
const ConfirmCustomer = require('../Controllers/confirmationCustomer');
const router = express.Router();


//store token Confirmation route
router.post('/store', ConfirmStore.ConfirmStore)

//resend otp
router.post('/resend/otp/store', resendOtp.OtpResendStore)


//resend otp for customer
router.post('/resend/otp/customer', resendOtpCustomer.OtpResendCustomer)


//Customer token Confirmation route
router.post('/customer', ConfirmCustomer.ConfirmCustomer)
module.exports = router;

