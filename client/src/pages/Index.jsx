import './Fonts.css';
import FriendsNavbar from '../components/FriendsNavbar';
import { Link } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AddPost from '../components/AddPost';
import PostHeader from '../components/PostHeader';
import PostCard from '../components/PostCard';
import { SetUser } from '../redux/UserSlice';
function Index() {
  const [id, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) navigate('/');
    setProfileImage(user.profileImage);
    setEmail(user.email);
    setId(user._id);
    setFriends(user.friends);
    axios
      .get('/api/post/', { params: { token: user?.token } })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section>
      <div className="flex justify-end">
        <FriendsNavbar />
        {/* secendery div --> posts */}
        <div className="flex flex-col bg-white rounded-md w-full md:w-5/6 min-h-screen relative px-10 pt-10">
          {/* add post */}
          <AddPost profileImage={profileImage} />
          {/* posts */}

          <div className="flex flex-col sm:px-20 gap-7">
            {posts.length > 0
              ? posts.map((el, i) => {
                  const isFriend = friends.some(
                    (friend) => friend._id === el.user._id
                  );
                  return (
                    <div className="" key={i}>
                      {/* post header */}
                      <PostHeader
                        user={el.user}
                        post={el}
                        email={email}
                        isFriend={isFriend}
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
    </section>
  );
}

export default Index;
