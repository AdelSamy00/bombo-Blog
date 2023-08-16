import React from 'react';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import './Fonts.css';
import { Link } from 'react-router-dom';
export default function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div>
      <nav>
        <div className="max-w-8xl mx-auto bg-orange-500">
          <div className="flex mx-auto justify-between w-5/6 ">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16 my-5 sm:my-8 font">
              {/* logo */}
              <div>
                <a
                  href="/"
                  className="flex gap-1 font-bold text-white text-2xl items-center "
                >
                  <img src="/blogging.png" className="w-10 h-10 mr-2" alt="" />
                  <span>Bombo Blog</span>
                </a>
              </div>
              {/* primary */}
              <div className="hidden md:flex gap-8 text-white text-xl font">
                <Link to={'/home'}> Home </Link>
                <Link to={'/profile'}> Profile </Link>
                <Link to={'/friends'}> Friends </Link>
                <Link to={'/posts'}> Your posts </Link>
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              {/* Mobile navigation toggle */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6 text-white" />
                </button>
              </div>
            </div>
            <div className="md:flex items-center hidden">
              <button className="font p-2 px-3 bg-white text-orange-500 rounded-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full font bg-gray-100 overflow-hidden flex flex-col md:hidden gap-12  origin-top duration-700 ${
            !toggleMenu ? 'h-0' : 'h-1/2 pt-3'
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider font">
              <Link to={'/home'} className="flex justify-center">
                Home
              </Link>
              <Link to={'/profile'} className="flex justify-center">
                Profile
              </Link>
              <Link to={'/friends'} className="flex justify-center">
                Friends
              </Link>
              <Link to={'/posts'} className="flex justify-center">
                Your Posts
              </Link>
              <button className="p-2 bg-white text-orange-500">Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
