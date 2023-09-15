import './Fonts.css';
const FriendsNavbar = () => {
  return (
    <>
      <div className="hidden fixed z-50  left-0 top-[105px] md:flex md:flex-col bg-gray-200 rounded-md w-1/6 h-[83vh] overflow-y-scroll">
        <h2 className="font text-3xl pt-3 text-center">Friends</h2>
        <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
          <img src="/unknown.png" className="w-10 h-10" alt="" />
          <span className="font2 text-orange-500 text-xl">Adel Samy</span>
        </div>
        <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
          <img src="/unknown.png" className="w-10 h-10" alt="" />
          <span className="font2 text-orange-500 text-xl">Omar</span>
        </div>
        <div className="pt-5 flex gap-2 font-bold items-center pl-5 ">
          <img src="/unknown.png" className="w-10 h-10" alt="" />
          <span className="font2 text-orange-500 text-xl">Youssef</span>
        </div>
      </div>
    </>
  );
};

export default FriendsNavbar;
