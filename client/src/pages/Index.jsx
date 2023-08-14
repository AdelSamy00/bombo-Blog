import Header from './Header';
import './Fonts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
function Index() {
  return (
    <div>
      <header className="sticky top-0 z-30 w-full">
        <Header />
      </header>

      {/* <section className="grid h-screen place-items-center bg-white">
        <div className="">zxczxczxc</div>
      </section> */}
      <section>
        <div className="flex">
          <div className="hidden md:flex md:flex-col bg-gray-200 rounded-md w-1/6 min-h-screen relative">
            <h2 className="font text-3xl pt-3 text-center">Friends</h2>
            <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font2 text-orange-500 text-xl">Adel Samy</span>
            </div>
            <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font2 text-orange-500 text-xl">Bomboo </span>
            </div>
          </div>
          {/* secendery div --> posts */}
          <div className="flex flex-col bg-white rounded-md w-full md:w-5/6 min-h-screen relative px-10 pt-10">
            {/* add post */}
            <div className="flex flex-row justify-center items-center pb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <button className="font2 ml-3 p-3 rounded-2xl bg-gray-300">
                What's in your mind? Go a head and write post.
              </button>
              <button className="hidden sm:flex font2 ml-3 p-3 rounded-2xl bg-orange-500 text-white">
                New Post
              </button>
            </div>
            {/* posts */}
            <div className="flex flex-col sm:px-20 gap-7">
              {/* post 1 */}
              <div className="">
                {/* post header */}
                <div className="flex flex-row items-center gap-3 p-5  rounded-t-xl bg-gray-400">
                  <img src="/blogging.png" className="w-10 h-10 mr-2" alt="" />
                  <div className="font2 flex flex-col items-start">
                    <p>Adel Samy</p>
                    <p className="text-xs text-gray-800">5/12/2024</p>
                  </div>
                </div>
                {/* post content */}
                <div className="flex flex-col  gap-3 p-5 md:pl-10 rounded-b-xl bg-gray-300">
                  {/* post desc */}
                  <p>
                    Hello everyone , I’m so very happy to make this application
                  </p>
                  {/* post photo */}
                  <div className="flex items-center justify-center">
                    <img
                      src="/blogging.png"
                      className=" w-[400px] h-[300px]  mr-2"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              {/* post 2 */}
              <div className="">
                {/* post header */}
                <div className="flex flex-row items-center gap-3 p-5  rounded-t-xl bg-gray-400">
                  <img src="/blogging.png" className="w-10 h-10 mr-2" alt="" />
                  <div className="font2 flex flex-col items-start">
                    <p>Adel Samy</p>
                    <p className="text-xs text-gray-800">5/12/2024</p>
                  </div>
                </div>
                {/* post content */}
                <div className="flex flex-col  gap-3 p-5 md:pl-10 rounded-b-xl bg-gray-300">
                  {/* post desc */}
                  <p>
                    Hello everyone , I’m so very happy to make this application
                  </p>
                  {/* post photo */}
                  <div className="flex items-center justify-center">
                    <img
                      src="/blogging.png"
                      className=" w-[400px] h-[300px]  mr-2"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
