const express = require("express");
const profile = require("../Controllers/profile");
const upload = require("../Utils/multer");
const router = express.Router();
const auth = require("../Middleware/auth");
 router.put("/profile/salon/:id", auth, profile.updateASalon);
router.put("/profile/gallery/:id",upload.array("image"),auth, profile.updateGallery);
router.put("/profile/salonOwner/:id",auth, profile.updateASalonOwner);
router.put("/profile/customer/:id", auth, profile.updateACustomer);
router.get("/profile/salonOwner/:id", auth, profile.getSalonOwner);
router.get("/profile/customer/:id", auth, profile.getCustomer);
module.exports = router;


