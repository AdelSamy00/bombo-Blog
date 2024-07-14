import { useState, useEffect, React } from 'react';
import FriendsNavbar from '../components/FriendsNavbar';
import './Fonts.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Profile() {
  const [id, setId] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [posts, setPosts] = useState(['']);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fullName = user.username.split(' ');
    setFirstName(fullName[0]);
    if (fullName[1]) {
      setLastName(fullName[1]);
    }
    setUsername(user.username);
    setBirthDate(user.birthDate);
    setGender(user.gender);
    setProfileImage(user.profileImage);
    setId(user._id);
    setPosts(user.posts);
  }, []);
  return (
    <div>
      <section>
        <div className="flex justify-end">
          <FriendsNavbar />
          <div className="flex flex-col  bg-white rounded-md w-full md:w-5/6 min-h-screen relative px-10 pt-10">
            {/* profile Settings */}
            <div className="flex flex-col lg:flex-row w-full justify-start items-start gap-5">
              <img
                src={profileImage}
                className="w-[300px] h-[300px] sm:ml-32"
                alt=""
              />
              <div className="flex flex-col justify-center items-center lg:items-start  w-full ">
                <div className="flex flex-col lg:flex-row items-center justify-between mt-10 ">
                  <div className="flex flex-row items-center  mt-5 lg:mr-5">
                    <h3 className="mr-5 ">Frist Name:</h3>
                    <input
                      type="text"
                      className="w-32 text-center rounded-xl text-black p-2"
                      disabled
                      value={firstName}
                    />
                  </div>
                  <div className="flex flex-row items-center mt-5">
                    <h3 className="mr-5">Last Name:</h3>
                    <input
                      type="text"
                      className="w-32 text-center rounded-xl text-black p-2"
                      disabled
                      value={lastName}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center mt-5">
                  <h3 className="mr-5">BirthDate:</h3>
                  <input
                    type="text"
                    className="w-32 text-center rounded-xl text-black p-2"
                    disabled
                    value={birthDate}
                  />
                </div>
                <div className="flex flex-col lg:flex-row items-center  w-full">
                  <div className="flex flex-row items-center  mt-5 lg:mr-32">
                    <h3 className="mr-5">Gender:</h3>
                    <input
                      type="text"
                      className="w-32 text-center rounded-xl text-black p-2"
                      disabled
                      value={gender}
                    />
                  </div>
                  <div className="flex flex-row items-center  mt-5 lg:mr-5 ">
                    <Link
                      to={'/editprofile'}
                      className="hidden sm:flex sm:text-orange-500 sm:rounded-md sm:px-5 sm:py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    <Link
                      to={'/editprofile'}
                      className="sm:hidden bg-orange-500 text-white rounded-md px-5 py-2"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            {/* Your posts */}
            <div className="">
              <h3 className="flex flex-col justify-center items-center font text-5xl text-orange-500 pb-10">
                Your Posts
              </h3>
              <div className="flex flex-col sm:px-20 gap-7 pb-5">
                {/* post 1 */}
                {posts.length > 0
                  ? posts.map((el, i) => {
                      return (
                        <div className="relative" key={i}>
                          {/* post header */}
                          <div className="flex flex-row items-center gap-3 p-5  rounded-t-xl bg-gray-400">
                            <img
                              src={profileImage}
                              className="w-10 h-10 mr-2"
                              alt=""
                            />
                            <div className="font2 flex flex-col items-start w-full">
                              <p>{username}</p>
                              <p className="text-xs text-gray-800">{el.date}</p>
                            </div>
                            <div className="flex flex-row w-full justify-end">
                              <div
                                className={`absolute right-[12%] md:right-[5%]  font bg-gray-100 overflow-hidden  flex flex-col rounded-lg transition-all duration-700 ${
                                  !toggleMenu ? 'w-0 h-0' : 'w-1/6 h-fit pt-3'
                                }`}
                              >
                                <div className="px-4">
                                  <div className="flex flex-col gap-1 font-bold tracking-wider font text-orange-500">
                                    <Link
                                      to={'/home'}
                                      className="flex justify-center"
                                    >
                                      Eidt
                                    </Link>
                                    <hr />
                                    <Link
                                      to={'/profile'}
                                      className="flex justify-center py-2"
                                    >
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => setToggleMenu(!toggleMenu)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {/* post content */}
                          <div className="flex flex-col  gap-3 p-5 md:pl-10 rounded-b-xl bg-gray-300">
                            {/* post desc */}
                            <p>{el.body}</p>
                            {/* post photo */}
                            <div className="flex items-center justify-center">
                              <img
                                src={el.postImage}
                                className="  md:w-[900px] md:h-[630px]  rounded-md mr-2"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
