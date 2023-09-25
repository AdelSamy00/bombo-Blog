import { useState, useEffect, React } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Fonts.css';
const FriendsNavbar = () => {
  const [id, setId] = useState('');
  const [approvalFriends, setApprovalFriends] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/profile')
      .then((res) => {
        const user = res.data.user;
        setId(user._id);
        axios.get(`/allApprovalFriends/${user._id}`).then((res) => {
          console.log(res);
          setApprovalFriends(res.data.friends);
        });
      })
      .catch((err) => {
        navigate('/');
      });
  }, []);
  return (
    <>
      <div className="hidden fixed z-50  left-0 top-[105px] md:flex md:flex-col bg-gray-200 rounded-md w-1/6 h-[83vh] overflow-y-scroll">
        <h2 className="font text-3xl pt-3 text-center">Friends</h2>
        {approvalFriends.length > 0
          ? approvalFriends.map((fr, i) => {
              if (fr.sender._id !== id) {
                return (
                  <div
                    key={i}
                    className="pt-5 flex gap-2 font-bold items-center pl-5 "
                  >
                    <img
                      src={fr.sender.profileImage}
                      className="w-10 h-10"
                      alt=""
                    />
                    <span className="font2 text-orange-500 text-xl">
                      {fr.sender.username}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    key={i}
                    className="pt-5 flex gap-2 font-bold items-center pl-5 "
                  >
                    <img
                      src={fr.receiver.profileImage}
                      className="w-10 h-10"
                      alt=""
                    />
                    <span className="font2 text-orange-500 text-xl">
                      {fr.receiver.username}
                    </span>
                  </div>
                );
              }
            })
          : ''}

        {/* <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
          <img src="/unknown.png" className="w-10 h-10" alt="" />
          <span className="font2 text-orange-500 text-xl">Omar</span>
        </div>
        <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
          <img src="/unknown.png" className="w-10 h-10" alt="" />
          <span className="font2 text-orange-500 text-xl">Youssef</span>
        </div>
        <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
          <img src="/unknown.png" className="w-10 h-10" alt="" />
          <span className="font2 text-orange-500 text-xl">Shadi</span>
        </div> */}
      </div>
    </>
  );
};

export default FriendsNavbar;
