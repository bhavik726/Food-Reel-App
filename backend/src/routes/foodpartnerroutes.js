const express = require('express');
const foodPartnerController = require("../controllers/foodpartnercontroller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/* /api/food-partner/:id */
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById)

module.exports = router;