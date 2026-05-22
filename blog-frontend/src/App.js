import  React from 'react';
import {Routes,Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import BlogbyId from "./pages/BlogbyId";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/blogs/:id" element={<BlogbyId />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register/>}/>
        <Route path="/users/profile" element={<Profile/>}/>
      </Routes>
    </>   
  );
};

export default App;
