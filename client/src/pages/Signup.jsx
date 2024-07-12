import axios from 'axios';
import { useState, React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const getTime = () => {
    const timestamp = new Date().getTime();
    const date = new Date(timestamp);
    return date.toLocaleDateString('sv');
  };
  const [birthDate, setBirthDate] = useState(getTime());
  const showPassword = (e) => {
    e.preventDefault();
    let element = document.querySelector('#password');
    if (element.type === 'password') {
      element.type = 'text';
      setVisible(1);
    } else {
      element.type = 'password';
      setVisible(0);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post('/api/user/register', {
        username,
        email,
        password,
        birthDate,
        gender,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          alert('user created.');
          navigate('/home');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('there found anthor user using this email');
      });
  };
  return (
    <div>
      <div className="grid h-screen w-full place-items-center bg-gray-200">
        <div className="max-w-full bg-orange-500 overflow-hidden border rounded-lg text-white">
          <form className="relative flex flex-col text-center pt-5 pl-4 pr-7 gap-4 ">
            <span className="font-bold text-2xl ">Sign up</span>
            <span className="text-base text-gray-100">
              Create a free account with your email.
            </span>
            {/* <div className="overflow-hidden rounded-lg bg-white w-full mt-4 mb-4 mr-2 ml-2"> */}
            <div className=" p-4 border-solid border border-neutral-300 rounded-md text-left ">
              <label htmlFor="fullname">Full Name: </label>
              <input
                value={username}
                id="fullname"
                type="text"
                className="rounded-lg outline-none h-10 w-full text-black text-sm bg-none border-0 border-b pt-2 pb-2 pl-4 pr-4"
                placeholder="Full Name"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                value={email}
                className="rounded-lg outline-none h-10 w-full text-black text-sm bg-none border-0 border-b pt-2 pb-2 pl-4 pr-4"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password: </label>
              <div className="flex flex-row bg-white rounded-lg ">
                <input
                  value={password}
                  type="password"
                  id="password"
                  className="rounded-lg outline-none h-10 w-full text-black text-sm bg-none border-0 border-b pt-2 pb-2 pl-4 pr-4"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={showPassword}
                  className="text-black text-center mr-4"
                >
                  {visible === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-orange-600 border-l-2 pl-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-orange-600 border-l-2 pl-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="sm:flex sm:flex-row items-center">
                <div className="">
                  <label htmlFor="birthdate">BirthDate:</label>
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={birthDate}
                    className="block w-full  sm:w-56 rounded-md p-2  mb-2 mt-2 border focus:ring-2 focus:outline-none text-black"
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="sm:ml-20">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    name="gender"
                    id="gender"
                    defaultValue={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full sm:w-56 rounded-md p-2 mb-2 mt-2 border focus:ring-2 focus:outline-none text-black"
                  >
                    <option value="male" className="text-center">
                      M
                    </option>
                    <option value="female" className="text-center">
                      F
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => submitHandler(e)}
              className="flex items-center justify-center sm:w-1/4 sm:ml-56 bg-blue-600 text-white text-base font-semibold cursor-pointer border-0 rounded-3xl sm:rounded-xl pt-3 pb-3 pl-4 pr-4 transition hover:bg-blue-800 mb-5"
            >
              Sign up
            </button>
          </form>
          <div className="p-4 text-sm bg-white shadow-black  flex flex-col items-center">
            <p className="text-orange-600">
              Have an account?
              <Link
                className="font-bold text-blue-600 transition ease-linear hover:text-blue-600 hover:underline"
                to="/"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
