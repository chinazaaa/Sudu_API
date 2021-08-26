const jwt = require("jsonwebtoken"); //FIXME should this be here?
const bCrypt = require("bcryptjs");
const response = require("../Utils/response");
const random = require("../Utils/random");
const { body, validationResult } = require("express-validator");
const CustomerModel = require("../Models/customerModel");
const SalonOwnerModel = require("../Models/salonOwner");
const { CLIENT_URL } = process.env;
const brymes_mailer = require("../Utils/brymes_mailer");

//  Register Customer
module.exports.registerCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map((v) => v.msg) });
  }
  console.log(errors.array());
  const { userName, phone, email } = req.body;
  let { password, userRole = "ROL-CUSTOMER" } = req.body;

  try {
    let customer = await CustomerModel.findOne({ email });
    let user = await SalonOwnerModel.findOne({ email });
    let dup_username = await CustomerModel.findOne({ userName });
    if (customer || user) {
      response.errorResMsg(
        res,
        false,
        409,
        "Email already taken. Please use another one.",
        ""
      );
    } else if (dup_username) {
      return response.errorResMsg(
        res,
        false,
        409,
        "Username already taken, please choose another username",
        "Username already" + " exists"
      );
    }

    password = await bCrypt.hash(password, 10);
    //customer = await CustomerModel.create({ phone, userName, email, password });
    //response.successResMsg(res,true, "User Registered Succesfully", 201, customer)
    const otp = random.randomInt(1000, 7000);

    // const data = {
    //   from: "noreply@gmail.com",
    //   to: email,
    //   subject: "ONE TIME PASSWORD",
    //   html: `
    //   <h2> Your email verification code is ${otp}</h2>
    //   `,
    // };
    // const message_result = await mg.messages().send(data);
    // console.log("Message Result:", message_result);

    const config = {
      data: JSON.stringify({
        subject: "ONE TIME PASSWORD",
        sender: "no-reply@saloney.com",
        recipients: [email],
        html_body: `<h2> Your email verification code is ${otp}</h2>`,
      }),
    };
    const message_result = await brymes_mailer.sendMail(config);

    console.log("From Call::: Status");
    console.log("Message Result:", JSON.stringify(await message_result.data));
    console.log(await message_result.status);

    if ((await message_result.status) === 200) {
      console.log("message result is valid");
      user = await CustomerModel.create({
        email,
        password,
        userRole,
        phone,
        userName,
        otp,
      });

      user = await user.save();
      console.log("User has been saved");
      // response.successResMsg(res, true, 'User Registered Successfully', 201, user);
      response.successResMsg(
        res,
        true,
        "OTP has been sent to your email for verification",
        201,
        user
      );
    } else {
      console.log("If statement failed");
      /**
       * Check if the mail sent or not, to know this, the console.log on line 50 would let you know the kind of
       * error it is, if it is null and if it is an exception, it will be caught on line 72
       */
    }
  } catch (e) {
    console.log(e);
    console.log("It seems an error occurred");
    /*
     *report all possible error exceptions here
     * 1 -- 50x errors
     * 2 -- Email failed exceptions
     */
  }
};
