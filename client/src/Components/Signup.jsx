import React, {useState} from 'react';
import Logo2 from "../assets/Logo2"
import {Link} from "react-router-dom"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./css/Login.css"

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const Navigate = useNavigate();
  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }
    });
  }
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const {name, email, password} = user;
      const response = await axios.post("http://localhost:8000/signup", {
        name: name,
        email: email,
        password: password
      });
      Navigate("/signin");
    } catch (error) {
      toast(error.response.data.error, {
        position: "bottom-right"
      });
    }
  }
  return (
    <>
    <div className="signup_card w-[400px] mx-auto border border-gray-400">
        <div className="main_content shadow-md bg-white py-10">
            <div className="logo flex justify-center">
            <Logo2 />
            </div>
            <form className='my-10' onSubmit={registerUser}>
              <input value={user.name} onChange={handleChange} name='name' className='p-3' type="text" placeholder='John Doe'/>
              <input value={user.email} onChange={handleChange} name='email' className='p-3' type="email" placeholder='your@name.com'/>
              <input value={user.password} onChange={handleChange} name='password' className='p-3' type="password" placeholder='Password'/>
              <button className='w-2/5 bg-blue-500 rounded-md mt-3 p-2 mx-[30%] text-white'>Sign up</button>
            </form>
        </div>
        </div>
        <div className="another_card w-[400px] mx-auto border border-gray-400 my-5">
          <div className="main_content shadow-md bg-white py-6">
            <p className='flex gap-1 justify-center'>Have an account? <Link to={"/signin"} className='text-blue-800'>Log in</Link></p>
          </div>
    </div>
    <ToastContainer/>
    </>
  );
}