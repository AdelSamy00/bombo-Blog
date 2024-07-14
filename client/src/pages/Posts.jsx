import React, { useEffect } from 'react';
import FriendsNavbar from '../components/FriendsNavbar';
import './Fonts.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostEditHeader from '../components/PostEditHeader';
import PostCard from '../components/PostCard';

export default function Posts() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [posts, setPosts] = useState(['']);
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    setUsername(user?.username);
    setProfileImage(user?.profileImage);
    setPosts(user?.posts);
  }, []);
  return (
    <div>
      <section>
        <div className="flex justify-end">
          <FriendsNavbar />
          <div className="flex flex-col  bg-white rounded-md w-full md:w-5/6 min-h-screen relative px-10 pt-10">
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
                          <PostEditHeader
                            el={el}
                            username={username}
                            profileImage={profileImage}
                            toggleMenu={toggleMenu}
                            setToggleMenu={setToggleMenu}
                          />
                          {/* post content */}
                          <PostCard el={el} />
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
