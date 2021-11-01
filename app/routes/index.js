const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const authController = require("../controller/auth");
const orderController = require("../controller/order");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

router.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    messsage: "EMS Backend API",
  });
});

router.post("/login", authController.login);

// all routes that come after this middleware are protected
// and can only be accessed if the user is logged in
router.use(authenticate);

router.get(
  "/order",
  authorize(role.ADMIN_ROLE, role.USERS_ROLE),
  orderController.getOrder
);
router.post("/order", authorize(role.USERS_ROLE), orderController.createOrder);
router.delete(
  "/order",
  authorize(role.USERS_ROLE),
  orderController.deleteOrder
);

module.exports = router;
