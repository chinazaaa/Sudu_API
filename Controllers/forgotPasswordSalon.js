// FIXME Unused const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
// FIXME Unused const _ = require("lodash");
const random = require("../Utils/random");
const SalonOwnerModel = require("../Models/salonOwner");
const CustomerModel = require("../Models/customerModel");
const response = require("../Utils/response");
// FIXME Unused  const { body, validationResult } = require("express-validator");
const {identifier} = require("./register_controller");
// FIXME Unused  const { CLIENT_URL } = process.env;
const { errorResMsg, successResMsg } = require('../Utils/response');
const brymes_mailer = require("../Utils/brymes_mailer");

module.exports.forgotPasswordSalon = async (req, res) => {
	 
    const email = req.body.email;
   // let customer = await CustomerModel.findOne({ email });
    let user = await SalonOwnerModel.findOne({'local.email': email });
   // console.log(user)

    if (!user) {
        return errorResMsg(
            res,
            false,
            404, //FIXME should this be 404?
            "User Not Found. Please Register Instead"
        );
    } 
	else if (user) {

        const config = {
            data: JSON.stringify({
                subject: "ONE TIME PASSWORD",
                sender: "no-reply@saloney.com",
                recipients: [user.identifier],
                html_body: `<h2> Your email verification code is ${user.local.otp}</h2>`,
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

module.exports.resetPasswordSalon = async (req, res) => {
	const { otp, newPassword } = req.body;


	const passWord = await bCrypt.hash(newPassword, 10);
	await SalonOwnerModel.findOne({ 'local.otp': otp }, (err, user) => {

		if (!user) {
			return errorResMsg(res, false, 400, "User with this otp does not exist");
		}
		if (err) {
			return errorResMsg(res, false, 400, err.message);
		}


		user.local.password = passWord;


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
