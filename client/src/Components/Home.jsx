import React, {useState, useContext,useEffect} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {UserContext} from "../App"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import "./css/Home.css"

function Home() {
  const [userData, setUserData] = useState([]);

  const Navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    async function allPosts() {
      try {
        const {data} = await axios.get("http://localhost:8000/post/allpost", {
          headers: {
            Authorization: localStorage.getItem("jwt")
          }
        });
        setUserData(data.posts);
      } catch (error) {
        console.log(error);
        Navigate("/signin");
      }
    }
    allPosts();
  }, [])

  const like = async (id) => {
    const response = await axios.put("http://localhost:8000/post/like", {
      postId: id
    }, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    })
    window.parent.location = window.parent.location.href
  } 
  const unlike = async (id) => {
    const response = await axios.put("http://localhost:8000/post/unlike", {
      postId: id
    }, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    })
    window.parent.location = window.parent.location.href
  } 
  const makeComment = async (text, postId) => {
    const response = await axios.put("http://localhost:8000/post/comment", {
      postId: postId,
      text: text
    }, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    });
    const comments = response.data.result.comments;
    const newData = comments.map((item) => {
      if (item.id == response.data.result._id) {
        return response
      }
    })
    setUserData(newData)
    window.parent.location = window.parent.location.href
  }
  const deletePost = async (postId) => {
    const response = await axios.delete(`http://localhost:8000/post/delete/${postId}`, {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    });
    console.log(response.data);
    const newData = response.data.result.filter((item) => {
      return item._id !== response.data._id
    });
    setUserData(newData);
    window.parent.location = window.parent.location.href
  }
  return (
    <> 
      {
      userData.map((item) => {
          return (
            <> 
      <div className='flex justify-center items-center mb-5'>
      <div className="home relative w-[370px] h-auto bg-[#fff] shadow-2xl p-5">
        <div className="top flex justify-between items-center">
          <div className="userDetails flex items-center ">
            <div className="profile_img relative w-8 h-8 overflow-hidden mr-3 rounded-full">
              <Link to={ item.postedBy._id === state._id ? `/profile` : `/profile/${item.postedBy._id}`}>
              <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="img" className='absolute top-0 left-0 w-full h-full object-cover'/>
              </Link>
            </div>
            <h3 className='text-base text-[#4d4d4f] font-medium leading-4'>{item.postedBy.name} <br /> <span className='text-xs'>{item.postedBy.email}</span></h3>
          </div>
          {
            item.postedBy._id == state._id && 
            <DeleteIcon onClick={() => {deletePost(item._id)}} className='cursor-pointer'/>
          }
        </div>
        <div className="imgBx flex justify-center pt-1 relative items-center w-[100%] m-[10px 0 15px]">
          <img src={item.photo} alt="" className='h-[320px]'/>
        </div>
        <div className="actionBtns justify-start
         items-start">
          <div className="left">
            <FavoriteBorderIcon/>
            {
              item.likes.includes(state._id)
              ?
              <ThumbDownAltIcon className='cursor-pointer' onClick={() => {unlike(item._id)}}/>
              :
              <ThumbUpIcon className='mx-3 cursor-pointer' onClick={() => {like(item._id)}}/>
            }
          </div>
        </div>
        <div>
          <h4 className='title font-semibold text-xl'>{item.likes.length} likes</h4>
          <h4 className='title font-semibold text-xl'>{item.title}</h4>
          <p className='body font-mono'>{item.body}</p>
        </div>
        <div className="comment">
          <h1 className='font-semibold text-lg'>All Comments : </h1>
          {
            item.comments.map((record) => {
              console.log(record);
              return (
                <>
                <h6 key={record.postedBy.name}>{record.text}</h6>
                </>
              )
            })
          }
          <form onSubmit={(event) => {event.preventDefault() 
          makeComment(event.target[0].value, item._id);
          }}>
          <input type="text" placeholder='Comment' className='mt-3 border-b border-black pb-1 mb-2 outline-none'/>
          </form>
        </div>
      </div>
    </div>
    {/* <img src={item.} alt="" /> */}
      </>
          )
        })
      }
    </>
  )
}

export default Home