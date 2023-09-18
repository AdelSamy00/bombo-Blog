import Header from './Header';
import './Fonts.css';
import FriendsNavbar from './FriendsNavbar';
import { Link } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Index() {
  const [profileImage, setProfileImage] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/profile')
      .then((res) => {
        //console.log(res);
        const user = res.data.user;
        setProfileImage(user.profileImage);
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
              {posts.length > 0
                ? posts.map((el, i) => {
                    return el.user.map((user, i) => {
                      return (
                        <div className="" key={i}>
                          {/* post header */}
                          <div className="flex flex-row items-center gap-3 p-5  rounded-t-xl bg-gray-400">
                            <img
                              src={user.profileImage}
                              className="w-10 h-10 mr-2"
                              alt=""
                            />
                            <div className="font2 flex flex-col items-start">
                              <p>{user.username}</p>
                              <p className="text-xs text-gray-800">{el.date}</p>
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
