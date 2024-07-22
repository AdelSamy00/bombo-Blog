import React from 'react';

function FriendCard({ user, request, isRequest, acceptFriend, cancelFriend }) {
  return (
    <div className="flex flex-col sm:px-10 gap-3 rounded-lg bg-gray-300 w-64 h-72 md:h-[320px] ">
      <img
        src="/blogging.png"
        className=" px-2 sm:px-0 w-[200] h-[200px] mt-3 "
        alt=""
      />
      <h3 className="font2 text-orange-500 text-2xl text-center pb-3 pt-4 md:pb-0 md:pt-0">
        {isRequest ? request?.sender?.username : user?.username}
      </h3>
      {isRequest ? (
        <div className="flex justify-between">
          <button
            className="text-white text-lg bg-green-600 p-2 rounded-lg"
            onClick={(e) => acceptFriend(request?._id, e)}
          >
            Accept
          </button>
          <button
            className="text-white text-lg bg-red-600 p-2 rounded-lg"
            onClick={(e) => cancelFriend(request?._id, e)}
          >
            cancel
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default FriendCard;
