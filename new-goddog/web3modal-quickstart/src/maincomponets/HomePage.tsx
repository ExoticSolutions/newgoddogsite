import { Button } from "@/components/ui/button";
import HomeCard from "./HomeCard";
import { Link, NavLink } from "react-router-dom";
function HomePage() {
  return (
    <div>
      {/* <div className="absolute bg-gradient-to-r from-stone-900 w-full lg:h-[355px] md:h-[415px]  h-[604px]"></div> */}

      <div
        className="grid grid-rows-2 p-10"
        style={{
          backgroundImage:
            "url(https://64.media.tumblr.com/24f7eda8d9e8660ed2e74b20b18e2559/tumblr_nv2fdyCF5y1tile93o1_500.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mt-10">
          <h3 className="text-white flex justify-center font-bold font-mono text-center text-2xl">
            Trade thousands of socialfi users seamlessly
          </h3>
          <h3 className="text-white font-light font-mono text-center flex justify-center mt-3 md:text-lg sm:text-xs">
            Seamlessly mint and burn friend.tech shares using revolutionary
            ERC-1155 token model allowing you to interact with the friend.tech
            protocol seamlessly without signing up
          </h3>
        </div>
        <div className="flex justify-center mt-5">
          <Button className="text-white border border-stone-900 bg-blue-700 rounded-full md:w-[200px] hover:bg-lime-300 font-mono">
            Mint & Burn
          </Button>
        </div>
      </div>

      <div className="border border-slate-500 p-10">
        <div className="flex justify-center gap-2 mb-5 ">
          <img
            src="https://www.icegif.com/wp-content/uploads/2023/01/icegif-130.gif"
            alt=""
            className="w-10 h-10"
          />
          <h3 className="text-white text-center font-mono underline text-[30px]">
            Mission
          </h3>
          <img
            src="https://www.icegif.com/wp-content/uploads/2023/01/icegif-130.gif"
            alt=""
            className="w-10 h-10"
          />
        </div>

        <h3 className="text-white text-center font-mono">
          Empowering users with seamless access to decentralized finance, Goddog
          fosters a frictionless, secure, and inclusive ecosystem where
          individuals can engage in social DeFi activities effortlessly across
          multiple blockchains.
        </h3>
      </div>

      <div className="border border-slate-500 p-10">
        <div className="grid md:grid-cols-2 gap-2 ">
          <div className=" p-2">
            <div className="flex justify-center">
              <h3 className="text-white md:text-2xl font-mono font-bold text-center mt-1">
                Guide to minting & burning shares
              </h3>
            </div>
            <ul className="mt-3 font-lighter font-mono text-sm p-5">
              <li className="text-white">1. Open the FriendMint tab</li>
              <li className="text-white mt-3">
                2. Search for desired user to mint or burn
              </li>
              <li className="text-white mt-3">
                3. Follow native wallet instructions to complete transactipn
              </li>
            </ul>
            <h3 className="text-white text-center font-mono text-xs mb-3">
              congrats you are now a freindMint expert!
            </h3>
            <div className="flex justify-center">
              <img
                src="https://wallpapers.com/images/hd/big-brained-pepe-frog-png-0s9ajzv7xy9j0jdu.jpg"
                alt=""
                style={{ maxWidth: "20%" }}
              />
            </div>
          </div>
          <div className=" md:flex md: justify-center">
            <HomeCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
