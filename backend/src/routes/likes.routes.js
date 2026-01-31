const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likes.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Add like
router.post(
  "/foods/:foodId/like",
  authMiddleware.authUserMiddleware,
  likesController.addLike
);

// Remove like
router.delete(
  "/foods/:foodId/like",
  authMiddleware.authUserMiddleware,
  likesController.removeLike
);

// Get user's liked foods
router.get(
  "/likes",
  authMiddleware.authUserMiddleware,
  likesController.getUserLikes
);

module.exports = router;
