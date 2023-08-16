import React from 'react';
import Header from './Header';
import FriendsNavbar from './FriendsNavbar';
import './Fonts.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Friends() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div>
      <header className="sticky top-0 z-30 w-full">
        <Header />
      </header>
      <section>
        <div className="flex justify-center w-full pb-5">
          <div className="flex flex-col  bg-white rounded-md w-full h-full md:w-5/6 min-h-screen  px-10 pt-10">
            {/* Your Frinds */}
            <h3 className="flex flex-col justify-center items-center font text-5xl text-orange-500 pb-10">
              Your Friends
            </h3>
            <div className=" flex items-center md:items-start flex-col flex-wrap md:flex-row gap-10 md:gap-24 max-w-screen-lg">
              {/* friend 1 */}
              <div className="flex flex-col sm:px-10 gap-3 rounded-lg bg-gray-300 w-64 h-72 md:h-64">
                <img
                  src="/blogging.png"
                  className=" px-2 sm:px-0 w-[200] h-[200px] mt-3 "
                  alt=""
                />
                <h3 className="font2 text-orange-500 text-2xl text-center pb-3 pt-4 md:pb-0 md:pt-0">
                  Adel Samy
                </h3>
              </div>
              {/* friend 2 */}
              <div className="flex flex-col sm:px-10 gap-3 rounded-lg bg-gray-300 w-64 h-72 md:h-64 pb-5">
                <img
                  src="/blogging.png"
                  className=" px-2 sm:px-0 w-[200] h-[200px] mt-3 "
                  alt=""
                />
                <h3 className="font2 text-orange-500 text-2xl text-center pb-3 pt-4 md:pb-0 md:pt-0">
                  Youssef
                </h3>
              </div>
              <div className="flex flex-col sm:px-10 gap-3 rounded-lg bg-gray-300 w-64 h-72 md:h-64 pb-5">
                <img
                  src="/blogging.png"
                  className=" px-2 sm:px-0 w-[200] h-[200px] mt-3 "
                  alt=""
                />
                <h3 className="font2 text-orange-500 text-2xl text-center pb-3 pt-4 md:pb-0 md:pt-0">
                  Youssef
                </h3>
              </div>
              <div className="flex flex-col sm:px-10 gap-3 rounded-lg bg-gray-300 w-64 h-72 md:h-64 pb-5">
                <img
                  src="/blogging.png"
                  className=" px-2 sm:px-0 w-[200] h-[200px] mt-3 "
                  alt=""
                />
                <h3 className="font2 text-orange-500 text-2xl text-center pb-3 pt-4 md:pb-0 md:pt-0">
                  Youssef
                </h3>
              </div>
              <div className="flex flex-col sm:px-10 gap-3 rounded-lg bg-gray-300 w-64 h-72 md:h-64 pb-5">
                <img
                  src="/blogging.png"
                  className=" px-2 sm:px-0 w-[200] h-[200px] mt-3 "
                  alt=""
                />
                <h3 className="font2 text-orange-500 text-2xl text-center pb-3 pt-4 md:pb-0 md:pt-0">
                  Youssef
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
