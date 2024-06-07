const express = require("express");
const AuthController = require("./auth.controller");

const router = express.Router();

router.post("/sign-in", AuthController.login);
router.post("/sign-up", AuthController.register);
router.post("/login/social", AuthController.socialLogin);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
