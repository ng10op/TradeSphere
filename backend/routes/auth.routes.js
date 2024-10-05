const express = require("express");
const {
  signup,
  login,
  logout,
  changePassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/changePass", changePassword);

module.exports = router;
