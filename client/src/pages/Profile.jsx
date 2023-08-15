import React from 'react';
import Header from './Header';
import FriendsNavbar from './FriendsNavbar';

export default function Profile() {
  return (
    <div>
      <header className="sticky top-0 z-30 w-full">
        <Header />
      </header>
      <section>
        <div className="flex">
          <FriendsNavbar />
          <div className="flex flex-col  bg-white rounded-md w-full md:w-5/6 min-h-screen relative px-10 pt-10">
            {/* profile Settings */}
            <div className="flex flex-col lg:flex-row w-full justify-start items-start gap-5">
              <img
                src="/blogging.png"
                className="w-[300px] h-[300px] sm:ml-32"
                alt=""
              />
              <div className="flex flex-col justify-center items-center lg:items-start  w-full ">
                <div className="flex flex-col lg:flex-row items-center justify-between mt-10 ">
                  <div className="flex flex-row items-center  mt-5 lg:mr-5">
                    <h3 className="mr-5 ">Frist Name:</h3>
                    <input
                      type="text"
                      className="w-32 text-center rounded-xl text-black p-2"
                      disabled
                      value="Adel"
                    />
                  </div>
                  <div className="flex flex-row items-center mt-5">
                    <h3 className="mr-5">Last Name:</h3>
                    <input
                      type="text"
                      className="w-32 text-center rounded-xl text-black p-2"
                      disabled
                      value="Samy"
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center mt-5">
                  <h3 className="mr-5">BirthDate:</h3>
                  <input
                    type="text"
                    className="w-32 text-center rounded-xl text-black p-2"
                    disabled
                    value="15/5/2000"
                  />
                </div>
                <div className="flex flex-row items-center justify-center mt-5">
                  <h3 className="mr-5">Gender:</h3>
                  <input
                    type="text"
                    className="w-32 text-center rounded-xl text-black p-2"
                    disabled
                    value="Male"
                  />
                </div>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
        </div>
      </section>
    </div>
  );
}
