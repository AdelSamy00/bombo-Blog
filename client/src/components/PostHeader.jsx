import React from 'react';

function PostHeader({ user, post, email, isFriend }) {
  //console.log(isFriend);
  return (
    <div className="flex flex-row items-center gap-3 p-5 rounded-t-xl bg-gray-400">
      <img src={user.profileImage} className="w-10 h-10 mr-2" alt="" />
      <div className="font2 flex w-full flex-col items-start">
        <p>{user.username}</p>
        <p className="text-xs text-gray-800">{post.date}</p>
      </div>
      {/* check if him the same user or not */}
      {user.email !== email ? (
        isFriend ? (
          <div className="flex flex-row w-full justify-end">
            <button className="bg-gray-300 rounded-lg p-3">
              <div className="flex flex-row items-center gap-2 w-full ">
                <p>Friends</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </button>
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export default PostHeader;
