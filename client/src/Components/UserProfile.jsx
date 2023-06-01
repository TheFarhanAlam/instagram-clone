import React, {useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios"
import  "./css/Profile.css"
import { UserContext } from '../App';

function Profile() {
const [userProfile, setUserProfile] = useState({});
const {state, dispatch} = useContext(UserContext);
const [usersPost, setUsersPost] = useState([]);
  const userId = useParams().userId;
  useEffect(() => {
    async function userProfile() {
        const {data} = await axios.get(`http://localhost:8000/user/userProfile/${userId}`, {
            headers: {
                Authorization: localStorage.getItem("jwt")
            }
        });
        setUserProfile(data)
        setUsersPost(data.usersPost);
    }
    userProfile();
}, [])

};
  return (
    <> 
    { userProfile ?
        <>
        <div className='profile w-[80%] items-center mx-auto mb-8'>
      <div className='flex justify-around border-b border-gray-400 pb-8'>
      <div className="right">
        <img className='w-[160px] h-[160px] rounded-[80px]' src="https://m0.her.ie/wp-content/uploads/2018/01/07093633/GettyImages-887815620.jpg" alt="" />
      </div>
      <div className="left">
        <h4 className='text-3xl'>{userProfile.user?userProfile.user.name: null}</h4>
        <div className='flex w-[109%] justify-between mt-5'>
          <h5>{userProfile.user?userProfile.usersPost.length:null} Posts</h5>
          <h5>{userProfile.user ? userProfile.user.followers.length : null} followers</h5>
          <h5>{userProfile.user ? userProfile.user.followings.length : null} followings</h5>
        </div>
        <button className='w-2/5 bg-blue-500 rounded-md mt-3 p-2 mx-[30%] text-white' type='submit' onClick={() => {followUser("647814a67b957373e6a25a91")}}>Follow</button>
        <p className='mt-5 font-bold'>{userProfile.user?userProfile.user.email:null}</p>
      </div>
    </div>
      </div>
    <div className='max-w-[550px] mx-auto'>
    <div className="gallery flex flex-wrap justify-around">
    {
        usersPost ?
        usersPost.map((pics) => {
            return (

                <>
            <img className='w-2/5 mb-5' src={pics.photo} alt={pics.title} key={pics._id} />
            </>
                )
        })
        :
        null
    }
    </div>
    </div>
      </>
    
    :
    <h2>Loading...</h2>
    }
    </>
  )

export default Profile;