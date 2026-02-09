require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const blogRoutes = require("./routes/BlogRoutes");
const userRoutes = require("./routes/UserRoutes");
const app = express()
 
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect("mongodb://localhost:27017/blogDB")
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
