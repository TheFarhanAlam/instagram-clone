import React, {useEffect, useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import {UserContext} from  "../App"
import axios from "axios"
import  "./css/Profile.css"

function Profile() {
  const [myPics, setMyPics] = useState([]);
  const [follow, setFollow] = useState({})
  const {state} = useContext(UserContext);
  const Navigate = useNavigate();
  useEffect(() => {
    async function myPost() {
      const response = await axios.get("http://localhost:8000/post/mypost", {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      })
      setMyPics(response.data.myPost)
    }
    myPost();
  }, [])

  if (!state) {
    Navigate("/");
  }
  return (
    <> 
    <div className='profile w-[80%] items-center mx-auto mb-8'>
      <div className='flex justify-around border-b border-gray-400 pb-8'>
      <div className="right">
        <img className='w-[160px] h-[160px] rounded-[80px]' src="https://m0.her.ie/wp-content/uploads/2018/01/07093633/GettyImages-887815620.jpg" alt="" />
      </div>
      <div className="left">
        <h4 className='fon text-3xl'>{state?state.name:<h1>Loading...</h1>}</h4>
        <div className='flex w-[109%] justify-between mt-5'>
          <h5> posts</h5>
          <h5> followers</h5>
          <h5>100 followings</h5>
        </div>
        <p className='mt-5 font-bold'>{state?state.email:null}</p>
      </div>
    </div>
      </div>
    <div className='max-w-[550px] mx-auto'>
    <div className="gallery flex flex-wrap justify-around">
      {
        myPics.map((pics) => {
          return (
            <>
            <img className='w-2/5 mb-5' src={pics.photo} alt={pics.title} key={pics._id} />
            </>
          )
        })
      }
    </div>
    </div>
    </>
  )
}

export default Profile;