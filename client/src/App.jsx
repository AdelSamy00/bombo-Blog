import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Friends from './pages/Friends';
import AddPost from './pages/AddPost';
import EditProfile from './pages/EditProfile';
import Header from './components/Header.jsx';
import { useSelector } from 'react-redux';
function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials = true;

  const { user } = useSelector((state) => state?.user);
  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
