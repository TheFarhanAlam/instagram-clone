import React, {useState, useContext} from 'react';
import Logo2 from "../assets/Logo2"
import {ToastContainer, toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"
import {UserContext} from "../App"
import axios from "axios"
import "./css/Login.css"
import "react-toastify/dist/ReactToastify.css"

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const Navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      }
    });
  }
  const signinUser = async (event) => {
    event.preventDefault();
    try {
      const {email, password} = user;
      const response = await axios.post("http://localhost:8000/signin", {
        email: email,
        password: password
      });
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({type: "USER", playload: response.data.user});
      Navigate("/");
      window.parent.location = window.parent.location.href
    } catch (error) {
      console.log(error);
      toast("Please fill right credentials", {
        position: "bottom-right"
      });
    }
  }
  return (
    <>
    <div className="login_card w-[400px] mx-auto border border-gray-400">
        <div className="main_content shadow-md bg-white py-10">
            <div className="logo flex justify-center">
            <Logo2 />
            </div>
            <form id='login' onSubmit={signinUser} className='my-10'>
              <input onChange={handleChange} value={user.name} name='email' className='p-3' type="email" placeholder='your@name.com'/>
              <input onChange={handleChange} value={user.name} name='password' className='p-3' type="password" placeholder='Password'/>
              <button className='w-2/5 bg-blue-500 rounded-md mt-3 p-2 mx-[30%] text-white' type='submit'>Sign in</button>
            </form>
        </div>
        </div>
        <div className="another_card w-[400px] mx-auto border border-gray-400 my-5">
          <div className="main_content shadow-md bg-white py-6">
            <p className='flex gap-1 justify-center'>Don't have an account? <Link to={"/signup"} className='text-blue-800'>Sign up</Link></p>
          </div>
    </div>
    <ToastContainer/>
    </>
  );
}