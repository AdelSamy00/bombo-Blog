import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Friends from './pages/Friends';
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
