const express = require("express");
const profile = require("../Controllers/profile");
const upload = require("../Utils/multer");
const router = express.Router();
const auth = require("../Middleware/auth");
 router.put("/profile/store/:id", auth, profile.updateAStore);
router.put("/profile/gallery/:id",upload.array("image"),auth, profile.updateGallery);
router.put("/profile/storeOwner/:id",auth, profile.updateAStoreOwner);
router.put("/profile/customer/:id", auth, profile.updateACustomer);
router.get("/profile/storeOwner/:id", auth, profile.getStoreOwner);
router.get("/profile/customer/:id", auth, profile.getCustomer);
module.exports = router;


