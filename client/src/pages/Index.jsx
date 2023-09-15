import Header from './Header';
import './Fonts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import FriendsNavbar from './FriendsNavbar';
import { Link } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Index() {
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/profile')
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        setProfileImage(user.profileImage);
      })
      .catch((err) => {
        navigate('/');
      });
  }, []);
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
              <img src={profileImage} className="w-10 h-10" alt="" />
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
              <div className="">
                {/* post header */}
                <div className="flex flex-row items-center gap-3 p-5  rounded-t-xl bg-gray-400">
                  <img src="/blogging.png" className="w-10 h-10 mr-2" alt="" />
                  <div className="font2 flex flex-col items-start">
                    <p>Adel Samy</p>
                    <p className="text-xs text-gray-800">5/12/2024</p>
                  </div>
                </div>
                {/* post content */}
                <div className="flex flex-col  gap-3 p-5 md:pl-10 rounded-b-xl bg-gray-300">
                  {/* post desc */}
                  <p>
                    Hello everyone , I’m so very happy to make this application
                  </p>
                  {/* post photo */}
                  <div className="flex items-center justify-center">
                    <img
                      src="/blogging.png"
                      className=" md:w-[400px] md:h-[400px]  mr-2"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/* post 2 */}
              <div className="">
                {/* post header */}
                <div className="flex flex-row items-center gap-3 p-5  rounded-t-xl bg-gray-400">
                  <img src="/blogging.png" className="w-10 h-10 mr-2" alt="" />
                  <div className="font2 flex flex-col items-start">
                    <p>Adel Samy</p>
                    <p className="text-xs text-gray-800">5/12/2024</p>
                  </div>
                </div>
                {/* post content */}
                <div className="flex flex-col  gap-3 p-5 md:pl-10 rounded-b-xl bg-gray-300">
                  {/* post desc */}
                  <p>
                    Hello everyone , I’m so very happy to make this application
                  </p>
                  {/* post photo */}
                  <div className="flex items-center justify-center">
                    <img
                      src="/blogging.png"
                      className=" md:w-[400px] md:h-[400px]  mr-2"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
