import React from 'react';
import './Fonts.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddPost() {
  const getTime = () => {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    return date.toLocaleDateString('sv');
  };
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState('');
  const [fileDataURL, setFileDataURL] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    const image = e.target.files[0];
    console.log(image);
    if (!image.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setImage(image);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (image) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(image);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [image]);
  useEffect(() => {
    setId(user?._id);
  }, []);
  const addPost = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('userid', id);
    formData.append('description', description);
    formData.append('postImage', file);
    formData.append('createdAt', getTime());
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':
          'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
      },
    };
    axios
      .post('/api/post/', formData, config)
      .then((res) => {
        alert(res.data.message);
        navigate('/home');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <section>
        <form onSubmit={addPost}>
          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col bg-white rounded-md w-full md:w-5/6 h-[35vh] md:h-[48vh] relative px-10 pt-5">
              <div className="flex flex-col">
                <label htmlFor="description">Add post description:</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="bg-gray-200 rounded-lg"
                  cols="30"
                  rows="5"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col ">
                <label htmlFor="image">Add image:</label>
                <label
                  className="h-48 flex flex-col items-center cursor-pointer justify-center p-6 md:w-[200px] lg:w-[300px] gap-5 border-2 border-dashed border-gray-400 rounded-xl shadow-xl "
                  htmlFor="file"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill=""
                      viewBox="0 0 24 24"
                      className="h-20 fill-gray-700"
                    >
                      <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill=""
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="font-normal text-gray-700">
                      Click to upload image
                    </span>
                  </div>
                  <input type="file" id="file" onChange={changeHandler} />
                </label>
              </div>
            </div>
            <div className="flex flex-row md:flex-col mt-52 mr-3 md:mt-5 justify-center md:justify-start items-center ">
              {fileDataURL ? (
                <img
                  src={fileDataURL}
                  className="w-[300px] h-[300px] rounded-md"
                  alt="preview"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col  items-center ">
            <button
              type="submit"
              className="bg-orange-400 w-[200px] h-[50px] md:mt-28 text-white rounded-md"
            >
              Add Post
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
