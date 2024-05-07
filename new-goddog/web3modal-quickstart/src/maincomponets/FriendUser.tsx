import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FriendTechSearchResultsInterface,
  friendTechEndpoint,
} from "@/variables";
import { useContractWrite } from "wagmi";
import friendTechABI from "@/abi/FreindTechABI";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uintConverter } from "@/variables";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseEther } from "viem";
function FriendUser() {
  const [alerts, setAlerts] = useState({ title: null, message: null });
  const [targetUser, setTargetUser] =
    useState<FriendTechSearchResultsInterface | null>(null);
  const [shouldWrap, setShouldWrap] = useState(true);
  const [input, setInput] = useState("");

  const [recievedVal, setRecievedVal] = useState("0");
  const [wrapPayAmountFinal, setWrapPayAmountFinal] = useState("");
  const location = useLocation();
  const params = useParams();

  const {
    data: shareBuyResponse,
    isLoading: isBuyingShares,
    isSuccess: boughtShare,
    write: wrap,
  } = useContractWrite({
    address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    abi: friendTechABI,
    functionName: "wrap",
  });

  const {
    write: unWrap,
    data: unWrapData,
    isSuccess: isUnwrapSuccess,
  } = useContractWrite({
    //constract that you use to wrap and unwrap tokens
    address: "0xbeea45F16D512a01f7E2a3785458D4a7089c8514",
    abi: friendTechABI,
    functionName: "unwrap",
  });

  useEffect(() => {
    if (location.state !== null) {
      console.log(location.state);
      setTargetUser(location.state.targetUser);
    } else {
      console.log(location);
      const ca = location.pathname.slice(8, location.pathname.length);
      const query = friendTechEndpoint + `search/address/${ca}`;
      axios
        .get(query)
        .then(function (results) {
          console.log(results);
          setTargetUser(results.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(ca);
    }
  }, []);
  function getWrapPayValue(targetShareAddress: string) {
    const query =
      friendTechEndpoint +
      `share-buy/price/${targetShareAddress}/${recievedVal}`;
    axios
      .get(query)
      .then(function (results) {
        console.log(results.data.price);
        setWrapPayAmountFinal(String(results.data.price));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function wrapToken(targetShareAddress: string) {
    console.log(wrapPayAmountFinal);
    wrap?.({
      args: [targetShareAddress, Number(recievedVal), "0x"],
      value: parseEther(wrapPayAmountFinal),
    });
  }
  function unwrapToken(targetShareAddress: string) {
    unWrap?.({
      args: [targetShareAddress, Number(input)],
    });
  }

  return (
    <div className="container p-16">
      {alerts.title !== null ? (
        <Alert className="text-white bg-black rounded-xl mb-5">
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      ) : null}
      <div className="border border-slate-500 rounded-xl">
        <div className="flex justify-start p-2">
          <img
            src={targetUser?.ftPfpUrl}
            alt=""
            className="rounded-full border border-transparent p-2"
            style={{ width: "10%" }}
          />
          <img
            src="https://dd.dexscreener.com/ds-data/tokens/base/0x0bd4887f7d41b35cd75dff9ffee2856106f86670.png?size=lg&key=ad3594"
            alt=""
            className="rounded-full w-4 h-4 lg:mt-12 md:mt-7 mt-3 border border-slate-500"
          />
          <img
            src="https://www.friend.tech/keysIcon3d.png"
            alt=""
            style={{ maxWidth: "10%" }}
            className="border border-transparent rounded-full p-2 "
          />
        </div>

        <div className="border border-slate-500 border-t-0 mb-2 border-b-0">
          <div className="flex justify-start text-white text-3xl font-bold p-2">
            <h3>{targetUser?.ftName}</h3>
          </div>
          <div className="mt-1 flex justify-start gap-1 text-xs p-2 gap-2">
            <div className="border border-slate-500 text-white p-1 rounded-xl bg-blue-800">
              <span className="font-bold">
                <h3 className="mt-1">ERC-1155</h3>
              </span>
            </div>
            <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[65px] h-[32px] text-xs">
              <img
                src="https://www.friend.tech/keysIcon3d.png"
                alt=""
                style={{ maxWidth: "45%" }}
                className="border border-transparent rounded-full p-1.5"
              />
              <h3 className="mt-2">Keys</h3>
            </div>
            <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[200px] h-[32px] text-xs">
              <img
                src="https://avatars.githubusercontent.com/u/108554348?s=280&v=4"
                alt=""
                style={{ maxWidth: "45%" }}
                className="border border-transparent rounded-full p-2"
              />
              <a
                href={`https://basescan.org/address/${targetUser?.address}`}
                target="_blank"
                className="mt-2 overflow-hidden text-[10px]"
              >
                {targetUser?.address}
              </a>
            </div>
          </div>
          <div className="flex justify-start p-2 gap-2">
            <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[200px] h-[32px] text-xs p-1.5 gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
                <path
                  d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
                <path
                  d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
                <path
                  d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href={`https://www.friend.tech/${targetUser?.address}`}
                target="_blank"
                className="overflow-hidden text-[10px]"
              >
                https://www.friend.tech/{targetUser?.address}
              </a>
            </div>
            <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[200px] h-[32px] text-xs p-1.5 gap-1">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/930/695/original/twitter-logo-twitter-icon-transparent-free-free-png.png"
                alt=""
              />
              <a
                href={`https://www.twitter.com/${targetUser?.twitterUsername}`}
                target="_blank"
                className="overflow-hidden text-[10px]"
              >
                https://www.twitter.com/{targetUser?.twitterUsername}
              </a>
            </div>
          </div>
        </div>
        <div className="border border-slate-500 rounded-xl bg-black p-2">
          <div className="flex justify-between p-2 text-sm font-bold">
            <h3 className="text-white ">Mint & Burn</h3>
            <h3 className="text-white">
              Key Price: {uintConverter(targetUser?.displayPrice || "120202")} Ξ
              /share
            </h3>
          </div>
          <div className="border border-transparent">
            <div className="border rounded-xl bg-stone-850 border-slate-500 p-3">
              <h3 className="text-stone-400 font-bold text-sm mb-2">
                {shouldWrap ? (
                  "You Mint"
                ) : (
                  <div className="flex justify-start gap-1">
                    <img
                      src={targetUser?.ftPfpUrl}
                      alt=""
                      className="w-5 h-5 rounded-full"
                    />
                    <h3>{"You Burn"}</h3>
                  </div>
                )}
              </h3>
              <Input
                type="text"
                className="border border-slate-700 rounded-xl p-8 text-2xl text-stone-400"
                placeholder="0"
                onChange={(e) => {
                  const currentPrice = uintConverter(
                    targetUser?.displayPrice || "6969696969"
                  );
                  console.log(currentPrice);
                  const inputVal = e.target.value;
                  setInput(inputVal);
                  console.log(inputVal);
                  if (shouldWrap) {
                    console.log(
                      String(Math.floor(Number(inputVal) / currentPrice))
                    );
                    setRecievedVal(
                      String(Math.floor(Number(inputVal) / currentPrice))
                    );
                    console.log("wrap true");
                  } else {
                    console.log("wrap false");
                    console.log(String(Number(inputVal) * currentPrice));
                    setRecievedVal(String(Number(inputVal) * currentPrice));
                  }
                }}
              />
              <div className="flex justify-center mb-10">
                <Button
                  className="absolute text-white"
                  onClick={() => {
                    if (shouldWrap) {
                      setShouldWrap(false);
                    } else {
                      setShouldWrap(true);
                    }
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
              <h3 className="text-stone-400 font-bold text-sm mb-2">
                {shouldWrap ? (
                  <div className="flex justify-start gap-1">
                    <img
                      src={targetUser?.ftPfpUrl}
                      alt=""
                      className="w-5 h-5 rounded-full"
                    />
                    <h3>{"Shares Recieved"}</h3>
                  </div>
                ) : (
                  "ETH Recieved"
                )}
              </h3>

              <Input
                type="text"
                className="border border-slate-700 rounded-xl p-8 text-2xl text-stone-400"
                placeholder="0"
                value={recievedVal}
              />

              <div className="flex justify-center mt-2">
                <Button
                  className="border border-slate-500 rounded-xl bg-black text-white hover:bg-white hover:text-black"
                  onClick={async () => {
                    if (shouldWrap) {
                      await getWrapPayValue(targetUser?.address || "");
                      wrapToken(targetUser?.address || "");
                    } else {
                      unwrapToken(targetUser?.address || "");
                    }
                  }}
                >
                  {shouldWrap ? "Mint" : "Burn"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendUser;
