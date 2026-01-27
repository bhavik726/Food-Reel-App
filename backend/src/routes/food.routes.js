const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

//post api
router.post(
  "/",
  authMiddleware.authauthFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

//get api

router.get(
    "/",
     authMiddleware.authUserMiddleware,
     foodController.getFoodItems);

module.exports = router;
