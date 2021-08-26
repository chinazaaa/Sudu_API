
const CustomerModel = require("../Models/customerModel");
const { errorResMsg, successResMsg } = require('../Utils/response');
module.exports.ConfirmCustomer = async (req, res) => {
 


    // Find a matching token
  const verify= await CustomerModel.findOne({ otp: req.body.otp });
 // console.log(verify.isEmailVerified)
        if (!verify){
            return errorResMsg(
                res,
                false,
                400,
                "We were unable to find a valid token. Your token may have expired.",
                             );
               }
               
        else if(verify){
            //console.log(verify)
            if (verify.isEmailVerified){
                return errorResMsg(res, false, 400, 'already-verified', 'This user has already been verified.');
                   }
            else if (!verify.isEmailVerified){
            verify.isEmailVerified=true;
            console.log(verify.isEmailVerified)
          await verify.save(function (err) {
                if (err) { return response.status(500).send({ msg: err.message }); }
                else{
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


module.exports.OtpResendCustomer = async (req, res) => {
    
    const email = req.body;
    let customer = await CustomerModel.findOne({ email });
    //let user = await SalonOwnerModel.findOne({'local.email': email });
   // console.log(user)

    if (!customer) {
        return errorResMsg(
            res,
            false,
            404, //FIXME should this be 404?
            "User Not Found. Please Register Instead"
        );
    } else if (customer) {

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
