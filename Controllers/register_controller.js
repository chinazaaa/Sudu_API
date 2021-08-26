const bCrypt = require("bcryptjs");
const StoreOwnerModel = require("../Models/storeOwner");
const Store = require("../Models/store");
const response = require("../Utils/response");
const random = require("../Utils/random");
const { body, validationResult } = require("express-validator");
// const { CLIENT_URL } = process.env;
// FIXME do we need this? const { nextTick } = require("process");
const brymes_mailer = require("../Utils/brymes_mailer");

const CustomerModel = require("../Models/customerModel");

//f7f9fa0af68681c789c8dadaf2da0cc1-ba042922-c4191797

//  Register User  
module.exports.registerStore = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map((v) => v.msg) });
  }
  console.log(errors.array());
  let {
    password,
    phone,
    userName,
    //location,
    address,
    nameOfStore,
    deliveryCharge,
    email: identifier,
    userRole = "ROL-STORE",
  } = req.body;

  try {
    //  Duplicate check
    let user = await StoreOwnerModel.findOne({ identifier });
    //let customer = await CustomerModel.findOne({ identifier });


    // let dup_username = await StoreOwnerModel.findOne({
    //   "local.userName": userName,
    // });

    // if (user || customer) {
    //   return response.errorResMsg(
    //     res,
    //     false,
    //     409,
    //     "Email already taken, please use another email",
    //     "User already" + " exists"
    //   );
    // } else if (dup_username) {
    //   return response.errorResMsg(
    //     res,
    //     false,
    //     409,
    //     "Username already taken, please choose another username",
    //     "Username already" + " exists"
    //   );
    // }

    password = await bCrypt.hash(password, 10);
    const otp = random.randomInt(1000, 7000);

    /* const data = {
      from: "noreply@gmail.com",
      to: identifier,
      subject: "ONE TIME PASSWORD",
      html: `
      <h2> Your email verification code is ${otp}</h2>
      `,
    }; */

    const config = {
      data: JSON.stringify({
        subject: "ONE TIME PASSWORD",
        sender: "no-reply@sudu.com",
        recipients: [identifier],
        html_body: `<h2> Your email verification code is ${otp}</h2>`,
      }),
    };
    const message_result = await brymes_mailer.sendMail(config);

    // console.log("From Call::: ")
    // console.log(JSON.stringify(message_result))
    console.log("From Call::: Status");

    // const message_result = await mg.messages().send(data);
    console.log("Message Result:", JSON.stringify(await message_result.data));
    console.log(await message_result.status);
    if ((await message_result.status) === 200) {
      console.log("message result is valid");
      user = await StoreOwnerModel.create({
        identifier,
        local: {
          email: identifier,
          password,
          userRole,
          phone,
          userName,
          deliveryCharge,
          otp,

        },
      });
      console.log("About to sign token");

      // I replaced signToken() with jwt.sign()

      user = await user.save();
      try {
        const storeName = await Store.findOne({ nameOfStore });
        if (storeName) return res.json({ message: "Store name is taken" });

        const store = new Store({
          nameOfStore,
          //location,
          address,
          storeOwner: user._id,
          phone,
          deliveryCharge
        });
        
        await store.save();
        user.local.nameOfStore = store.nameOfStore;
        user.local.location = store.location;
        user.local.deliveryCharge = store.deliveryCharge;
        console.log(store)
      } catch (error) {
        console.log(error);
      }
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
      return response.errorResMsg(
        res,
        false,
        403,
        "Invalid Email",
        "Cannot send otp to the provided email" +
        ": Please contact support if you have any issues"
      );
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
