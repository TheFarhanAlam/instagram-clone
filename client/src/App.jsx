import React, {useEffect, useContext, createContext, useReducer} from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Profile from "./Components/Profile"
import CreatePost from './Components/CreatePost'
import UserProfile from './Components/UserProfile'
import {reducer, initialState} from "./Reducer/userReducer"
import './App.css'

export const UserContext = createContext();

const Routing = () => {
  const Navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({type: "USER", payload: user});
    }else {
      Navigate("/signin");
    }
  }, [])
  
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/createpost' element={<CreatePost/>}/>
      <Route path='/profile/:userId' element={<UserProfile/>}/>
    </Routes>
    </>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    </>
  )
}

export default App
