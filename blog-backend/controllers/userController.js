// controller is used to have the functionalities
const bcrypt = require("bcryptjs");   
const jwt = require("jsonwebtoken");
const User =  require("../models/UserSchema");
const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { name,email, password } = req.body;
  const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();
  res.json({ message: "User Registered" });
}

const login =  async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    { id: user._id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  
  res.cookie("token", token, {
      httpOnly: true,
   secure: true,
  sameSite: "None"
    maxAge: 60 * 60 * 1000
  });

  res.json({ message: "Login Successful" });
}

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}

const toggleSaveBlog = async (req, res) => {
  try {
    const userId = req.userId;
    const blogId = req.params.blogId;

    const user = await User.findById(userId);

    if (user.savedBlogs.includes(blogId)) {
      user.savedBlogs.pull(blogId);
      await user.save();
      return res.json({ message: "Blog unsaved", saved: false });
    } else { 
      user.savedBlogs.push(blogId);
      await user.save();
      return res.json({ message: "Blog saved", saved: true });
    }

  } catch (err) {
    res.status(500).json({ message: "Error toggling save" });
  }
};

// const toggleSaveBlog = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const blogId = req.params.blogId;

//     const user = await User.findById(userId);

//     // check if blog already saved
//     const isSaved = user.savedBlogs.includes(blogId);

//     if (isSaved) {
//       // UNSAVE
//       user.savedBlogs = user.savedBlogs.filter(
//         id => id.toString() !== blogId
//       );
//       await user.save();
//       return res.json({ message: "Blog unsaved", saved: false });
//     } else {
//       // SAVE
//       user.savedBlogs.push(blogId);
//       await user.save();
//       return res.json({ message: "Blog saved", saved: true });
//     }

//   } catch (error) {
//     res.status(500).json({ message: "Error toggling save" });
//   }
// };


const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("savedBlogs"); 

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Profile error" });
  }
};

module.exports = {
    register,
    login,
    logout,
    toggleSaveBlog,
    profile
}