const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewars");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { checkAuth, uploadCloud } = require("../../middlewars");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", checkAuth, ctrl.logout);

router.put(
  "/update",
  checkAuth,
  uploadCloud.single("image"),
  validateBody(schemas.updateUserSchema),
  ctrl.updateUserData
);

router.get("/current", checkAuth, ctrl.getCurrentUser);

module.exports = router;
