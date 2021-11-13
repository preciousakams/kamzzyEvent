const { Router } = require('express');
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authController");
const router = Router();

  router.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  router.post("/api/auth/signin", controller.signin);

  module.exports = router;