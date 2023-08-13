import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
