import React from 'react';

function PostCard({ el }) {
  return (
    <div className="flex flex-col  gap-3 p-5 md:pl-10 rounded-b-xl bg-gray-300">
      {/* post desc */}
      <p>{el.body}</p>
      {/* post photo */}
      <div className="flex items-center justify-center">
        <img
          src={el.postImage}
          className=" md:w-[600px] md:h-[430px] rounded-md  mr-2"
          alt=""
        />
      </div>
    </div>
  );
}

export default PostCard;
