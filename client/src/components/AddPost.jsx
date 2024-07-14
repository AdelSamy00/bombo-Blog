import React from 'react';
import { Link } from 'react-router-dom';

function AddPost({ profileImage }) {
  return (
    <div className="flex flex-row justify-center items-center pb-10">
      <img src={profileImage} className="w-10 h-10 rounded-md" alt="" />
      <Link to={'/addpost'}>
        <button className="font2 ml-3 p-3 rounded-2xl bg-gray-300">
          What's in your mind? Go a head and write post.
        </button>
      </Link>
      <Link to={'/addpost'}>
        <button className="hidden sm:flex font2 ml-3 p-3 rounded-2xl bg-orange-500 text-white">
          New Post
        </button>
      </Link>
    </div>
  );
}

export default AddPost;
