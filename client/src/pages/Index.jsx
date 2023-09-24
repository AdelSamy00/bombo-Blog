import Header from './Header';
import './Fonts.css';
import FriendsNavbar from './FriendsNavbar';
import { Link, redirect } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Index() {
  const [id, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/profile')
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        setProfileImage(user.profileImage);
        setEmail(user.email);
        setId(user._id);
        setFriends(user.friends);
        axios
          .get('/allPosts')
          .then((res) => {
            setPosts(res.data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        navigate('/');
      });
  }, []);
  const addFriend = async (friendId, e) => {
    e.preventDefault();
    axios
      .post('/addFriend', {
        friendId,
        id,
      })
      .then((res) => {
        axios
          .get(`/allFriends/${id}`)
          .then((res) => {
            setFriends(res.data.friends);
          })
          .catch((err) => {
            console.log(err);
          });
        alert('send Request succcessfully.');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <header className="sticky top-0 z-30 w-full">
        <Header />
      </header>
      <section>
        <div className="flex justify-end">
          <FriendsNavbar />
          {/* secendery div --> posts */}
          <div className="flex flex-col bg-white rounded-md w-full md:w-5/6 min-h-screen relative px-10 pt-10">
            {/* add post */}
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
            {/* posts */}

            <div className="flex flex-col sm:px-20 gap-7">
              {/* post 1 */}
              {posts.length > 0
                ? posts.map((el, i) => {
                    return el.user.map((user, i) => {
                      return (
                        <div className="" key={i}>
                          {/* post header */}
                          <div className="flex flex-row items-center gap-3 p-5 rounded-t-xl bg-gray-400">
                            <img
                              src={user.profileImage}
                              className="w-10 h-10 mr-2"
                              alt=""
                            />
                            <div className="font2 flex w-full flex-col items-start">
                              <p>{user.username}</p>
                              <p className="text-xs text-gray-800">{el.date}</p>
                            </div>
                            {/* check if him the same user or not */}
                            {user.email !== email ? (
                              !friends.find((fr) => fr.friend === user._id) ? (
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
                                    if (
                                      fr.request === 'sender' &&
                                      fr.friend === user._id
                                    ) {
                                      return (
                                        <div
                                          className="flex flex-row w-full justify-end"
                                          key={i}
                                        >
                                          <button
                                            className="bg-gray-300 rounded-lg p-3"
                                            onClick={() => addFriend(user._id)}
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
                                    } else if (
                                      fr.request === 'receiver' &&
                                      fr.friend === user._id
                                    ) {
                                      return (
                                        <div
                                          className="flex flex-row w-full justify-end"
                                          key={i}
                                        >
                                          <button
                                            className="bg-gray-300 rounded-lg p-3"
                                            onClick={() => addFriend(user._id)}
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
                                  } else if (fr.status === 'approval') {
                                    //show him he is friend
                                    return (
                                      <div
                                        className="flex flex-row w-full justify-end"
                                        key={i}
                                      >
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
                                  } else {
                                    return (
                                      <div className="flex flex-row w-full justify-end">
                                        <button
                                          className="bg-white rounded-lg p-3"
                                          onClick={() => addFriend(user._id)}
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
                                    );
                                  }
                                })
                              )
                            ) : (
                              ''
                            )}
                          </div>
                          {/* post content */}
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
                        </div>
                      );
                    });
                  })
                : ''}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
