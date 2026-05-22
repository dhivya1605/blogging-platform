require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const blogRoutes = require("./Routes/BlogRoutes");
const userRoutes = require("./Routes/UserRoutes");
const app = express()
 
app.use(cors({
  origin: [
    "http://localhost:3001",
    "https://blogging-platform-19hy9lq9w-dhivya1605s-projects.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });


app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports= app;
