var jwt = require("jsonwebtoken");
var config = process.env;
const SalonOwnerModel = require('../Models/salonOwner');
const CustomerModel = require('../Models/customerModel');

const verifyToken = (req, res, next) => {
  var token =
    req.body.api_token || req.query.api_token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      success: false,
      message: "Token is required for verification",
      error: {
        statusCode: 403,
        auth: false,
        description: "You must provide a token to authenticate your call",
      },
    });
  }

  jwt.verify(token, 'verySecretValue', async function (err, decoded) {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Invalid Token",
        error: {
          statusCode: 401,
          auth: false,
          description: "You entered an invalid token",
        },
      });
    }

    // decoded = jwt_decode(token);

    req.user = decoded;
    console.log(decoded);
    if (!decoded.user_role) {
      let user = await SalonOwnerModel.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "unauthorized access",
          errors: {
            statusCode: 401,
          },
        });
      }
    } else if (decoded.user_role.toLowerCase().includes("customer")) {
      try {
        let user = await CustomerModel.findOne({ _id: req.user.id });
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "unauthorized access",
            errors: {
              statusCode: 401,
            },
          });
        }
        req.user.owner_ref_id = user.owner_ref_id;
        // req.user.store_id = user.store_id;
      } catch (error) {
        return require("../Controllers/login_controler").errorHandler(
          error,
          res
        );
      }
    } else if (decoded.user_role.toLowerCase().includes("salonOnwer")) {
      req.user.owner_ref_id = user.owner_ref_id;
    }
    // console.log(req.user);
    next();
  });
};

module.exports = verifyToken;
