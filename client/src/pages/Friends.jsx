import React, { useEffect } from 'react';
import './Fonts.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FriendCard from '../components/FriendCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SetUser } from '../redux/UserSlice';
export default function Friends() {
  const { user } = useSelector((state) => state.user);
  const id = user?._id;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [friends, setFriends] = useState(user?.friends);
  const [friendsRequst, setFriendsRequest] = useState([]);
  const dispatch = useDispatch();
  const getFriendsRequest = async () => {
    axios
      .get(`/api/friends/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        //console.log(res);
        setFriendsRequest(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFriendsRequest();
  }, []);
  const getAllFriends = async () => {
    axios
      .get(`/api/friends/${id}`)
      .then((res) => {
        //console.log(res);
        setFriends(res.data.friends);
        dispatch(SetUser({ ...user, friends: res.data.friends }));
        getFriendsRequest();
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
      .put(
        '/api/friends/',
        { requestId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
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
        await getFriendsRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <section>
        <div className="flex justify-center w-full pb-5">
          <div className="flex flex-col  bg-white rounded-md w-full h-full md:w-5/6 min-h-screen  px-10 pt-10">
            {/* Your Frinds */}
            <h3 className="flex flex-col justify-center items-center font text-5xl text-orange-500 pb-10">
              Your Friends
            </h3>
            <div className=" flex items-center md:items-start flex-col flex-wrap md:flex-row gap-10 md:gap-24 max-w-screen-lg">
              {friends.length > 0 ? (
                friends.map((el, i) => {
                  return <FriendCard key={i} user={el} request={false} />;
                })
              ) : (
                <div className="flex text-center items-center w-full  h-[100px] bg-gray-300 mb-4">
                  <p className=" text-3xl w-full">
                    You dont have any Friends yet
                  </p>
                </div>
              )}
            </div>
            <h3 className="flex flex-col justify-center items-center font text-5xl text-orange-500 pb-10">
              Your Friends Requests
            </h3>
            <div className=" flex items-center md:items-start flex-col flex-wrap md:flex-row gap-10 md:gap-24 max-w-screen-lg">
              {friendsRequst?.length > 0 ? (
                friendsRequst.map((el, i) => {
                  return (
                    <FriendCard
                      key={i}
                      isRequest={true}
                      request={el}
                      acceptFriend={acceptFriend}
                      cancelFriend={cancelFriend}
                    />
                  );
                })
              ) : (
                <div className="flex text-center items-center w-full  h-[100px] bg-gray-300">
                  <p className=" text-3xl w-full">No Friends Requsts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
