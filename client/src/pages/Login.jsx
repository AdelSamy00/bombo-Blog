import { useState, React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/user/login', { email, password })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          alert('login successfully');
          navigate('/home');
        }
      })
      .catch((err, res) => {
        console.log(err);
        if (err.status == 401) {
          alert('pleases check your password or email again');
        } else {
          alert('there arenot found any user');
        }
      });
  };
  return (
    <div>
      <div className="grid h-screen place-items-center bg-gray-200">
        <p className="font-bold text-2xl mt-16 text-orange-500">Bombo Blog</p>
        <div className="mb-24 max-w-full bg-orange-500 overflow-hidden border rounded-lg ">
          <form className="relative flex flex-col text-center pt-9 pl-4 pr-7 gap-4 ">
            <span className="font-bold text-2xl text-white">Login</span>
            <div className="overflow-hidden rounded-lg bg-white w-full mt-4 mb-4 mr-2 ml-2">
              <input
                type="email"
                value={email}
                className="outline-none h-10 w-full text-sm bg-none border-0 border-b pt-2 pb-2 pl-4 pr-4"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                className="outline-none h-10 w-full text-sm bg-none border-0 border-b pt-2 pb-2 pl-4 pr-4"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={(e) => submitHandler(e)}
              className="flex items-center justify-center  bg-blue-600 text-white text-base font-semibold cursor-pointer border-0 rounded-3xl pt-3 pb-3 pl-4 pr-4
                                transition hover:bg-blue-800 mb-5"
            >
              Login
            </button>
          </form>
          <div className="p-4 text-sm bg-white shadow-black  flex flex-col items-center">
            <p className="text-orange-600">
              don't Have an account?{' '}
              <Link
                className="font-bold text-blue-600 transition ease-linear hover:text-blue-600 hover:underline"
                to="/register"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
