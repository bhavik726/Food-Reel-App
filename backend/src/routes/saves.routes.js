const express = require("express");
const router = express.Router();
const savesController = require("../controllers/saves.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Add save
router.post(
  "/foods/:foodId/save",
  authMiddleware.authUserMiddleware,
  savesController.addSave
);

// Remove save
router.delete(
  "/foods/:foodId/save",
  authMiddleware.authUserMiddleware,
  savesController.removeSave
);

// Get user's saved foods
router.get(
  "/saved",
  authMiddleware.authUserMiddleware,
  savesController.getUserSaves
);

module.exports = router;
