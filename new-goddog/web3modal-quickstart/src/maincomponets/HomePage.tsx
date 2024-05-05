import React from "react";
import { Button } from "@/components/ui/button";
function HomePage() {
  return (
    <div
      className="grid grid-rows-2 p-10"
      style={{
        backgroundImage:
          "url(https://upload.wikimedia.org/wikipedia/commons/1/17/Digital_rain_animation_small_letters_clear.gif)",
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
        <Button className="text-black border border-slate-500 bg-lime-400 rounded-full md:w-[200px] hover:bg-lime-300">
          Mint & Burn
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
