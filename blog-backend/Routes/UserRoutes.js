const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {register,login,logout,toggleSaveBlog,profile} = require('../controllers/userController');

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/save/:blogId", authMiddleware, toggleSaveBlog);

router.get("/profile", authMiddleware, profile);

module.exports = router;
