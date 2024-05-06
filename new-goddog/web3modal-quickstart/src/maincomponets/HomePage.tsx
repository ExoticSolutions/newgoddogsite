import { Button } from "@/components/ui/button";
import HomeCard from "./HomeCard";
function HomePage() {
  return (
    <div>
      <div
        className="grid grid-rows-2 p-10"
        style={{
          backgroundImage: "url()",
          backgroundSize: "cover",
        }}
      >
        <div className="mt-10">
          <h3 className="text-white flex justify-center font-bold font-mono text-center text-2xl">
            Trade thousands of socialfi users seamlessly
          </h3>
          <h3 className="text-white font-light font-mono text-center flex justify-center mt-3 md:text-lg sm:text-xs">
            Seamlessly mint and burn friend.tech shares using revolutionary
            ERC-1155 token model allowing you to interact with the friend.tech
            protocol seamlessly
          </h3>
        </div>
        <div className="flex justify-center mt-5">
          <Button className="text-white border border-stone-900 bg-blue-700 rounded-full md:w-[200px] hover:bg-lime-300 font-mono">
            Mint & Burn
          </Button>
        </div>
      </div>
      <div className="border p-10">
        <div className="grid md:grid-cols-2 gap-2 ">
          <div className="border">
            <div className="flex justify-center">
              <h3 className="text-white md:text-2xl font-mono font-bold text-center">
                Guide to minting & burning shares
              </h3>
            </div>
            <ul className="mt-3 font-lighter text-md p-4">
              <li className="text-white">1. Open the explore tab</li>
              <li className="text-white mt-1">
                2. Search for desired user to mint or burn
              </li>
              <li className="text-white mt-1">
                3. Follow native wallet instructions to complete transactipn
              </li>
            </ul>
            <h3 className="text-white text-center text-xs mb-3">
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
          <div className="border md:flex md: justify-center">
            <HomeCard />
          </div>
        </div>
      </div>
      <footer className="border p-3">
        <div className="flex justify-between gap-2">
          <img
            src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
            alt=""
            className="w-[5%]"
          />
          <h3 className="text-white font-mono text-[10px] mt-3">
            Goddog @2024
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
