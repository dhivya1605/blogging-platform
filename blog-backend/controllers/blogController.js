const Blog = require("../models/BlogSchema");


const createBlog = async (req, res) => {
  try {
    const { description } = req.body;

    const blog = new Blog({
      authorId: req.userId, 
      description
    });

    await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("authorId", "name email")
      .populate("comments.userId", "name")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const BlogbyId = async(req,res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("authorId", "name email")
      .populate("comments.userId", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const userId = req.userId;

    if (blog.likes.includes(userId)) {
      blog.likes.pull(userId); 
    } else {
      blog.likes.push(userId); 
    }

    await blog.save();

    res.json({
      message: "Like updated",
      totalLikes: blog.likes.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { message } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({
      userId: req.userId,
      message
    });

    await blog.save();

    res.json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  createBlog,
  getAllBlogs,
  BlogbyId,
  toggleLike,
  addComment
};
