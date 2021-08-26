const express = require("express");
const image = require("../Controllers/salon_avatar");
const upload = require("../Utils/multer");
const router = express.Router();
const auth = require("../Middleware/auth");
router.put("/salon/avatar/:id", upload.single("avatar"), auth, image.updateSalonAvatar);
//router.delete("/salonOwner/image/:id",auth, image.deleteSalonOwnerImage);
module.exports = router;

