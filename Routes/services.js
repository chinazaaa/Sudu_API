const express = require("express");
const services = require("../Controllers/services");
const upload = require("../Utils/multer");
const router = express.Router();
const auth = require("../Middleware/auth");
router.post("/services/:id", upload.single("image"), auth, services.createService);
router.delete("/services/:id", auth, services.deleteService);
router.put("/services/:id",upload.single("image"), auth, services.updateService);
router.get("/services", auth, services.findServices);
router.get("/services/:id", auth, services.findAService);

router.post("/services/publish/:serviceId", auth, services.publishService);
router.post("/services/unpublish/:serviceId", auth, services.unpublishService);
router.get("/publishedServices/:salonId",auth,services.getPublished);
router.get("/unpublishedServices/:salonId",auth,services.getunPublished);
module.exports = router;
