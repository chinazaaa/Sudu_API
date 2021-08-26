const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const _ = require("lodash");
const random = require("../Utils/random");
const CustomerModel = require("../Models/customerModel");
const { body, validationResult } = require("express-validator");
const { email, userName, password } = require("./registerCustomer_controller");
const { CLIENT_URL } = process.env;
const brymes_mailer = require("../Utils/brymes_mailer");
const { errorResMsg, successResMsg } = require('../Utils/response');


module.exports.forgotPasswordCustomer = async (req, res) => {

	 
    const email = req.body.email;
    let customer = await CustomerModel.findOne({email:email});
   // let user = await SalonOwnerModel.findOne({'local.email': email });
console.log(customer)

    if (!customer) {
        return errorResMsg(
            res,
            false,
            404, //FIXME should this be 404?
            "User Not Found. Please Register Instead"
        );
    } 
	else if (customer) {

        const config = {
            data: JSON.stringify({
                subject: "ONE TIME PASSWORD",
                sender: "no-reply@saloney.com",
                recipients: [customer.email],
                html_body: `<h2> Your email verification code is ${customer.otp}</h2>`,
            }),
        };

        const message_result = await brymes_mailer.sendMail(config);
        if ((await message_result.status) === 200) {
            successResMsg(
                res,
                true,
                "OTP has been sent to your email for verification",
                200,
            );
        }
    } 
	

}


module.exports.resetPasswordCustomer = async (req, res) => {
	const { otp, newPassword } = req.body;


	const passWord = await bCrypt.hash(newPassword, 10);
	await CustomerModel.findOne({ otp: otp }, (err, user) => {

		if (!user) {
			return errorResMsg(res, false, 400, "User with this otp does not exist");
		}
		if (err) {
			return errorResMsg(res, false, 400, err.message);
		}


		user.password = passWord;


		user.save((err, result) => {

			if (err) {
				console.log(user)
				return errorResMsg(res, false, 400, err.message);
			}
			else {


				return successResMsg(res, true, "Your password has been changed", 200, result);
			}
		})
	})



}