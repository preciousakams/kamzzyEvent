const { Router } = require('express');
const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");
const router = Router();



  router.get("/api/all", controller.allAccess);

  router.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  router.get(
    "/api/client",
    [authJwt.verifyToken, authJwt.isClient],
    controller.clientBoard
  );

  router.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  module.exports = router;