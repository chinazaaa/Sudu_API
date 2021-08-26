const express = require("express");
const image = require("../Controllers/store_avatar");
const upload = require("../Utils/multer");
const router = express.Router();
const auth = require("../Middleware/auth");
router.put("/store/avatar/:id", upload.single("avatar"), auth, image.updateStoreAvatar);
//router.delete("/store/image/:id",auth, image.deleteStoreOwnerImage);
module.exports = router;

