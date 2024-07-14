import React from 'react';

function PostHeader({ user, el, email, friends, addFriend, acceptFriend }) {
  return (
    <div className="flex flex-row items-center gap-3 p-5 rounded-t-xl bg-gray-400">
      <img src={user.profileImage} className="w-10 h-10 mr-2" alt="" />
      <div className="font2 flex w-full flex-col items-start">
        <p>{user.username}</p>
        <p className="text-xs text-gray-800">{el.date}</p>
      </div>
      {/* check if him the same user or not */}
      {user.email !== email ? (
        !friends.find(
          (fr) => fr.sender === user._id || fr.receiver === user._id
        ) ? (
          <div className="flex flex-row w-full justify-end">
            <button
              className="bg-white rounded-lg p-3"
              onClick={(e) => addFriend(user._id, e)}
            >
              <div className="flex flex-row items-center gap-2 w-full ">
                <p>Add Friend</p>
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
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          friends.map((fr, i) => {
            if (fr.status === 'pending') {
              if (fr.receiver === user._id) {
                return (
                  <div className="flex flex-row w-full justify-end" key={i}>
                    <button
                      className="bg-gray-300 rounded-lg p-3"
                      onClick={(e) => cancelFriend(fr._id, e)}
                    >
                      <div className="flex flex-row items-center gap-2 w-full ">
                        <p>cancel Request</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-orange-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                );
              } else if (fr.sender === user._id) {
                return (
                  <div className="flex flex-row w-full justify-end" key={i}>
                    <button
                      className="bg-gray-300 rounded-lg p-3"
                      onClick={(e) => acceptFriend(fr._id, e)}
                    >
                      <div className="flex flex-row items-center gap-2 w-full ">
                        <p>Accept Request</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-orange-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                );
              }
            } else if (
              fr.status === 'approval' &&
              (fr.sender === user._id || fr.receiver === user._id)
            ) {
              //show him he is friend
              return (
                <div className="flex flex-row w-full justify-end" key={i}>
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
              );
            }
          })
        )
      ) : (
        ''
      )}
    </div>
  );
}

export default PostHeader;
