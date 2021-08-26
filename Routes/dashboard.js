const express = require("express");
const dashboard = require("../Controllers/dashboard");
const router = express.Router();
const auth = require("../Middleware/auth");

router.get("/dashboard/:id", auth, dashboard.dashboard);
module.exports = router;
