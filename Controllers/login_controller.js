const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
var config = process.env;
const { errorResMsg, successResMsg } = require("../Utils/response");
const StoreOwnerModel = require("../Models/storeOwner");
// const services = require('../Controllers/services');
// const { body, validationResult } = require("express-validator");
const CustomerModel = require("../Models/customerModel");
const Store = require("../Models/store");



const userLoginType = {
  store: "store",
  customer: "customer",
};

const login = async (req, res, next) => {
  const { email: email, password } = req.body;
  const { userLoginTypeChosen } = req.params;
  let user = null;
  // let email = null;

  try {
    const loginTypes = ["store", "customer"];

    if (!userLoginTypeChosen || !loginTypes.includes(userLoginTypeChosen)) {
      errorResMsg(
        res,
        false,
        400,
        `query params accepts only \'customer\' or \'store\'`,
        "Incorrect query params"
      );
    }
    if (userLoginTypeChosen === userLoginType.store) {
      // user = await StoreOwnerModel.findOne({ 'local.userName': username });
      user = await StoreOwnerModel.findOne({ "local.email": email });
      console.log(user);
      // console.log(user._id,);

      if (!user) {
        errorResMsg(
          res,
          false,
          401,
          "Incorrect UserName or Email",
          "Incorrect credentials"
        );
      } else if (user) {
        const results = bCrypt.compareSync(
          password,
          userLoginType.store === userLoginTypeChosen
            ? user.local.password
            : user.password
        );
        if (!results)
          errorResMsg(
            res,
            false,
            401,
            "Password incorrect",
            "Incorrect credentials"
          );
        if (!user.local.isEmailVerified)
          return errorResMsg(
            res,
            false,
            401,
            "not-verified",
            "Your account has not been verified."
          );
        else {
          console.log("pass");
          const storeIdentifier = user._id;
          const store = await Store.findOne({ storeOwner: storeIdentifier });
          try {
            let token = jwt.sign(
              { id: user._id, user_role: user.local.userRole },
              "verySecretValue",
              { expiresIn: "1h" }
            );
            user.local.api_token = token;
            await user.save((err) => {
              if (err) {
                return errorResMsg(res, false, 401, "", err.message);
              }
            });
            //FIXME New Code to facilitate ease of token
            user["token"] = token;
          } catch (error) {
            console.log("This Ought to be Our Error")
            console.log(error);
          }

          const dataInfo = { user, store }
          successResMsg(res, true, `Login Successful`, 200, dataInfo);
        }
        //   } else if (email) {
        //     const result = bCrypt.compareSync(
        //       password,
        //       userLoginType.store === userLoginTypeChosen
        //         ? email.local.password
        //         : email.password
        //     );
        //     if (!result) {
        //       return errorResMsg(
        //         res,
        //         false,
        //         401,
        //         "Password incorrect",
        //         "Incorrect credentials"
        //       );
        //     }
        //     if (!email.local.isEmailVerified) {
        //       return errorResMsg(
        //         res,
        //         false,
        //         401,
        //         "not-verified",
        //         "Your account has not been verified."
        //       );
        //     } else {
        //       let token = jwt.sign(
        //         { userName: email._id, user_role: user.local.userRole },
        //         "verySecretValue",
        //         { expiresIn: "1h" }
        //       );
        //       email.local.api_token = token;
        //       await email.save((err) => {
        //         if (err) {
        //           return errorResMsg(res, false, 401, "", err.message);
        //         }
        //       });
        //       //FIXME New Code to facilitate ease of token
        //       var data = {};
        //       data["email"] = email;
        //       data["token"] = token;
        //       successResMsg(res, true, `Login Successful`, 200, data);
        //       // successResMsg(res, true, `Login Successful token:  ${token}`, 200, email);
        //     }
      }
    } else if (userLoginTypeChosen === userLoginType.customer) {
      //   user = await CustomerModel.findOne({ userName: username });
      user = await CustomerModel.findOne({ email: email });
      if (!user) {
        errorResMsg(
          res,
          false,
          401,
          "Incorrect UserName or Email",
          "Incorrect credentials"
        );
      } else if (user) {
        const results = bCrypt.compareSync(password, user.password);
        if (!results)
          errorResMsg(
            res,
            false,
            401,
            "Password incorrect",
            "Incorrect credentials"
          );
        if (!user.isEmailVerified)
          return errorResMsg(
            res,
            false,
            401,
            "not-verified",
            "Your account has not been verified."
          );
        else {
          let token = jwt.sign(
            { id: user._id, user_role: user.userRole },
            "verySecretValue",
            { expiresIn: "1h" }
          );

          //FIXME New Code to facilitate ease of token
          user.api_token = token;
          // user["token"] = token;
          successResMsg(res, true, `Login Successful`, 200, user);

          await user.save((err) => {
            if (err) {
              return errorResMsg(res, false, 401, "", err.message);
            }
          });
        }
        //   } else if (email) {
        //     const result = bCrypt.compareSync(password, email.password);
        //     if (!result) {
        //       return errorResMsg(
        //         res,
        //         false,
        //         401,
        //         "Password incorrect",
        //         "Incorrect credentials"
        //       );
        //     }
        //     if (!email.isEmailVerified) {
        //       return errorResMsg(
        //         res,
        //         false,
        //         401,
        //         "not-verified",
        //         "Your account has not been verified."
        //       );
        //     } else {
        //       let token = jwt.sign(
        //         { id: email._id, user_role: email.userRole },
        //         "verySecretValue",
        //         { expiresIn: "1h" }
        //       );
        //       email.api_token = token;
        //       await email.save((err) => {
        //         if (err) {
        //           return errorResMsg(res, false, 401, "", err.message);
        //         }
        //       });
        //       //FIXME New Code to facilitate ease of token
        //       var data = {};
        //       data["email"] = email;
        //       data["token"] = token;
        //       successResMsg(res, true, `Login Successful`, 200, data);
        //       // successResMsg(res, true, `Login Successful token:  ${token}`, 200, email);
        //     }
      }
    }
  } catch (err) {
    return errorResMsg(res, false, 500, err.message, "Internal Server Error");
  }
};

module.exports = {
  login,
};
