import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo'
import {UserContext} from "../App"
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'; 
import LogoutIcon from '@mui/icons-material/Logout';
import "./css/Navbar.css"

function Navbar() {
  const {state, dispatch} = useContext(UserContext);
  const Navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    dispatch({type: "CLEAR"});
    Navigate("/signin");
  }
  const renderList = () => {
    if (state) {
     return [
      <div className='flex'>
      <div className="addPost">
        <IconButton>
          <Link to={"/createpost"}>
          <AddIcon fontSize='large' className='mr-2'/>
          </Link>
        </IconButton>
      </div>
      <div className="profile">
        <IconButton>
        <Link to={"/profile"}> <PersonIcon className='personIcon' fontSize='large'/>
        </Link>
        </IconButton>
      </div>
      <div className="logout pl-1">
        <IconButton>
          <LogoutIcon className='mt-1' fontSize='large' onClick={Logout}/>
        </IconButton>
      </div>
      </div>
     ] 
    }else {
      return [
        <>
        <Link to="/signin" class="mr-5 hover:text-gray-900">Login</Link>
        <Link to="/signup" class="mr-5 hover:text-gray-900">Register</Link>
        </>
      ]
    }
  }
  return (
    <div className='navbar'>
      <header class="text-gray-600 body-font">
  <div class="container mx-auto flex p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <Logo/>
    </a>
    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
      {renderList()}
    </nav>
  </div>
</header>
    </div>
  )
}

export default Navbar