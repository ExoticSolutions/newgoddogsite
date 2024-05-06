import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FriendTechSearchResultsInterface } from "@/variables";
function FriendUser() {
  const [targetUser, setTargetUser] =
    useState<FriendTechSearchResultsInterface | null>(null);
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    console.log(location.state);
    setTargetUser(location.state.targetUser);
  }, []);
  return (
    <div className="border container p-16">
      <div className="flex justify-start border">
        <img
          src={targetUser?.ftPfpUrl}
          alt=""
          className="rounded-full border border-transparent p-2"
          style={{ width: "10%" }}
        />
        <img
          src="https://dd.dexscreener.com/ds-data/tokens/base/0x0bd4887f7d41b35cd75dff9ffee2856106f86670.png?size=lg&key=ad3594"
          alt=""
          className="rounded-full w-6 h-6 mt-5 border border-slate-500"
        />
        <img
          src="https://www.friend.tech/keysIcon3d.png"
          alt=""
          style={{ maxWidth: "10%" }}
          className="border border-transparent rounded-full p-2 "
        />
      </div>
      <div className="mt-1 flex justify-start border gap-1 text-xs p-2">
        <div className="border border-slate-500 text-white p-1 rounded-xl bg-blue-700">
          <span className="font-bold">
            <h3 className="mt-1">ERC-1155</h3>
          </span>
        </div>
        <div className="flex justify-center border border-slate-500 text-white rounded-xl bg-stone-800 w-20 text-xs">
          <img
            src="https://www.friend.tech/keysIcon3d.png"
            alt=""
            style={{ maxWidth: "45%" }}
            className="border border-transparent rounded-full p-2"
          />
          <h3 className="mt-2">Keys</h3>
        </div>
        <div className="flex justify-center border border-slate-500 text-white rounded-xl bg-stone-800 w-[200px] h-10 text-xs">
          <img
            src="https://avatars.githubusercontent.com/u/108554348?s=280&v=4"
            alt=""
            style={{ maxWidth: "45%" }}
            className="border border-transparent rounded-full p-2"
          />
          <h3 className="mt-2 overflow-hidden">{targetUser?.address}</h3>
        </div>
      </div>
    </div>
  );
}

export default FriendUser;
