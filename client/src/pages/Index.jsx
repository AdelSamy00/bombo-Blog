import './Fonts.css';
import FriendsNavbar from '../components/FriendsNavbar';
import { Link } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AddPost from '../components/AddPost';
import PostHeader from '../components/PostHeader';
import PostCard from '../components/PostCard';
function Index() {
  const [id, setId] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) navigate('/');
    setProfileImage(user.profileImage);
    setEmail(user.email);
    setId(user._id);
    setFriends(user.friends);
    axios
      .get('/api/post/')
      .then((res) => {
        console.log(posts);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const getAllFriends = async () => {
    axios
      .get(`/api/friends/${id}`)
      .then((res) => {
        //console.log(res);
        setFriends(res.data.friends);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addFriend = async (friendId, e) => {
    e.preventDefault();
    axios
      .post('/api/friends/', {
        friendId,
        id,
      })
      .then(async (res) => {
        //console.log(res);
        await getAllFriends();
        //alert('send Request succcessfully.');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const acceptFriend = async (requestId, e) => {
    e.preventDefault();
    axios
      .put('/api/friends/', { requestId })
      .then(async (res) => {
        console.log(res);
        await getAllFriends();
        alert('You are now his friend.');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelFriend = async (requestId, e) => {
    e.preventDefault();
    axios
      .delete(`/api/friends/${requestId}`)
      .then(async (res) => {
        //console.log(res);
        await getAllFriends();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                  return el.user.map((user, i) => {
                    return (
                      <div className="" key={i}>
                        {/* post header */}
                        <PostHeader
                          user={user}
                          el={el}
                          email={email}
                          addFriend={addFriend}
                          acceptFriend={acceptFriend}
                          cancelFriend={cancelFriend}
                          friends={friends}
                        />
                        {/* post content */}
                        <PostCard el={el} />
                      </div>
                    );
                  });
                })
              : ''}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
