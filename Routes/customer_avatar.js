const express = require("express");
const image = require("../Controllers/customer_avatar");
const upload = require("../Utils/multer");
const router = express.Router();
const auth = require("../Middleware/auth");
router.put("/customer/avatar/:id", upload.single("avatar"), auth, image.updateCustomerAvatar);
//router.delete("/customer/image/:id",auth, image.deleteCustomerImage);
module.exports = router;

