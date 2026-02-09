const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  BlogbyId,
  toggleLike,
  addComment,
  saveBlog
} = require("../controllers/blogController");


router.post("/add", authMiddleware, createBlog);


router.get("/", getAllBlogs);

router.get("/:id", BlogbyId);


router.patch("/:id/like", authMiddleware, toggleLike);


router.patch("/:id/comment", authMiddleware, addComment);

// router.patch("/:id/save",authMiddleware,saveBlog);

module.exports = router;
