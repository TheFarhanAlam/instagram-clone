import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'

function CreatePost() {
  const [data, setData] = useState({
    title: "",
    body: ""
  })
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    async function afterUrl() {
      if (url) {
        const {title, body} = data;
        const response = await axios.post("http://localhost:8000/post/createpost", {
          title: title,
          body: body,
          pic: url
        }, {
          headers: {
            Authorization: localStorage.getItem("jwt")
          }
        });
        if (response) {
          Navigate("/");
        }
      }
    }
    afterUrl();
  }, [url])
  
  const postDetails = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "instagram");
    const response = await axios.post("https://api.cloudinary.com/v1_1/mgk/image/upload", formData);
    setUrl(response.data.url);
  }
  const handleChange = (event) => {
    const {name, value} = event.target;
    setData((prevVal)=>{
      return {
        ...prevVal,
        [name]: value
      }
    });
  }
  const handleFiles = (event) => {
    const file = event.target.files[0];
    setImage(file);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <>
    <div className="login_card w-[400px] mx-auto border border-gray-400 mt-8">
        <div className="main_content shadow-md bg-white py-10">
            <form onSubmit={handleSubmit} className='my-10'>
              <input onChange={handleChange} value={data.title} className='p-3' type="text" placeholder='Title' name='title' />
              <input onChange={handleChange} value={data.body} className='p-3' type="text" placeholder='Write a Caption'name='body'/>
              <input className='p-3' type="File" placeholder='Post' name='photo' onChange={handleFiles}/>
              <button className='w-2/5 bg-blue-500 rounded-md mt-3 p-2 mx-[30%] text-white' onClick={postDetails}>Create</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default CreatePost