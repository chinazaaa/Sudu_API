const SalonOwnerModel = require("../Models/salonOwner");
const CustomerModel = require("../Models/customerModel");

const brymes_mailer = require("../Utils/brymes_mailer");

const { errorResMsg, successResMsg } = require('../Utils/response');
module.exports.ConfirmSalon = async (req, res) => {
    const otp = req.body.otp;


    // Find a matching token
    const verify = await SalonOwnerModel.findOne({ 'local.otp': otp });
    console.log(otp)
    if (!verify) {
        return errorResMsg(
            res,
            false,
            400,
            "We were unable to find a valid token. Your token may have expired.",
        );
    }

    else if (verify) {
        console.log(verify)
        if (verify.local.isEmailVerified) {
            return errorResMsg(res, false, 400, 'already-verified', 'This user has already been verified.');
        }
        else if (!verify.local.isEmailVerified) {
            verify.local.isEmailVerified = true;
            console.log(verify.local.isEmailVerified)
            await verify.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                else {
                    successResMsg(
                        res,
                        true,
                        "The account has been verified. Please log in.",
                        200,
                        verify
                    );

                }
            });
        }
    }
}

module.exports.OtpResendSalon = async (req, res) => {
    
    const email = req.body.email;
    //let customer = await CustomerModel.findOne({ email });
    let user = await SalonOwnerModel.findOne({'local.email': email });
   // console.log(user)

    if (!user) {
        return errorResMsg(
            res,
            false,
            404, //FIXME should this be 404?
            "User Not Found. Please Register Instead"
        );
    } else if (user) {

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
