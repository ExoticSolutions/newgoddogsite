import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { friendTechEndpoint, goddogShareAddress } from "@/variables";
import axios from "axios";
import friendTechABI from "@/abi/FreindTechABI";
import { useContractWrite } from "wagmi";
import { Input } from "@/components/ui/input";
import { parseEther } from "viem";
function HomeCard() {
  const [goddogPrice, setGoddogPrice] = useState(0);
  const [currentValue, setCurrentValue] = useState("");
  const [finalPaymentAmount, setFinalPaymentAmount] = useState("");

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
    const query = friendTechEndpoint + `/share-buy/price/${goddogShareAddress}`;
    console.log(query);
    fetch(query)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGoddogPrice(data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getWrapFinalPayValue() {
    const query =
      friendTechEndpoint +
      `share-buy/price/${goddogShareAddress}/${currentValue}`;
    axios
      .get(query)
      .then(function (results) {
        console.log(String(results.data.price));
        setFinalPaymentAmount(String(results.data.price));
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(function () {
        wrapToken();
      });
  }

  function wrapToken() {
    wrap?.({
      args: [goddogShareAddress, Number(currentValue), "0x"],
      value: parseEther(finalPaymentAmount),
    });
  }
  function unwrapToken() {
    unWrap?.({
      args: [goddogShareAddress, Number(currentValue)],
    });
  }
  return (
    <Card className="border border-slate-500 md:w-[350px] lg:w-[500px] bg-black rounded-xl text-white">
      <CardHeader>
        <CardTitle className="">
          <img
            src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
            alt=""
            className="rounded-full"
            style={{ maxWidth: "40%" }}
          />
        </CardTitle>
        <CardDescription className="text-xl font-mono">
          <h3>Goddog</h3>
          <div className="mt-1 flex justify-start text-[10px]">
            <h3 className="mt-0.5 sm:mt-0.5 md:mt-1.5">friend.tech profile</h3>
            <img
              src="https://freepngimg.com/thumb/twitter/108250-badge-twitter-verified-download-free-image-thumb.png"
              alt=""
              className="w-[8%] md:w-[9%] sm:w-[5%]"
            />
          </div>
          <div className="flex justify-start text-[10px] gap-1">
            <h3>ca:</h3>
            <h3>0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1</h3>
          </div>
          <div className="flex justify-start border border-stone-500 border-t-0 border-l-0 border-r-0">
            <h3 className="text-white text-[10px]">
              Price: {goddogPrice} Ξ /share
            </h3>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <div className="flex justify-center gap-2">
          <Dialog>
            <DialogTrigger>
              <Button className="border border-slate-500 rounded-xl hover:bg-green-500 md:p-2">
                <div className="flex justify-center gap-1">
                  <h3 className="text-white text-xs md:mt-0.5 mt-2">Mint</h3>
                  <img
                    src="https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                    alt=""
                    style={{ maxWidth: "30%" }}
                  />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white border-slate-500">
              <DialogHeader>
                <DialogTitle>
                  <img
                    src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
                    alt=""
                    style={{ maxWidth: "20%" }}
                  />
                  <div className="flex justify-start  font-mono font-light">
                    <img
                      src="https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                      alt=""
                      style={{ maxWidth: "7%" }}
                    />
                    <h3 className="text-[10px] mt-2.5 ">Mint Goddog Shares</h3>
                  </div>
                  <a
                    href="https://www.friend.tech/0x7b202496c103da5bedfe17ac8080b49bd0a333f1"
                    target="_blank"
                    className="flex justify-start text-[10px]  font-mono font-light"
                  >
                    <h3 className="mt-2.5">friend.tech profile</h3>
                    <img
                      src="https://freepngimg.com/thumb/twitter/108250-badge-twitter-verified-download-free-image-thumb.png"
                      alt=""
                      className="w-7"
                    />
                  </a>
                  <div className="flex justify-start">
                    <h3 className="mt-1 text-white text-[10px]  font-mono font-light">
                      Ca: 0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1
                    </h3>
                  </div>
                  <div className="flex justify-start border border-slate-500 mt-3 border-t-0 border-l-0 border-r-0 text-[10px] font-mono font-light">
                    <h3 className="text-white">
                      Price: {goddogPrice} Ξ / share
                    </h3>
                  </div>
                </DialogTitle>
                <DialogDescription className="">
                  <Input
                    type="text"
                    className="border border-slate-500 bg-black text-white rounded-xl mt-2"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setCurrentValue(e.target.value);
                    }}
                  />
                  <div className="flex justify-center">
                    <Button
                      className="border border-slate-500 rounded-xl mt-2 h-10 bg-black hover:bg-white hover:text-black"
                      onClick={() => {
                        getWrapFinalPayValue();
                      }}
                    >
                      <span className="flex justify-center">
                        <img
                          src="https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                          alt=""
                          style={{ maxWidth: "7%" }}
                        />
                        <h3 className="font-mono font-bold mt-1">Mint</h3>
                      </span>
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button className="border border-slate-500 rounded-xl hover:bg-green-500">
                <div className="flex justify-center gap-1">
                  <h3 className="text-xs">Chart</h3>
                  <img
                    src="https://media3.giphy.com/media/hZE5xoaM0Oxw4xiqH7/giphy.gif?cid=82a1493b8d9p1o6zrl0qwsz7ve7kglvu0015yeopmy895rvt&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt=""
                    style={{ maxWidth: "20%" }}
                  />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Button className="border border-slate-500 rounded-xl hover:bg-red-500">
                <div className="flex justify-center">
                  <h3 className="text-white mt-0.5 text-xs">Burn</h3>
                  <img
                    src="https://media3.giphy.com/media/J2awouDsf23R2vo2p5/giphy.gif?cid=6c09b95271qkr9h7zeqhzcchzf0g93pzapi9qzlx1f8ha35c&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=e"
                    alt=""
                    style={{ maxWidth: "30%" }}
                  />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white border-slate-500">
              <DialogHeader>
                <DialogTitle>
                  <img
                    src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
                    alt=""
                    style={{ maxWidth: "20%" }}
                  />
                  <div className="flex justify-start  font-mono font-light">
                    <img
                      src="https://i.pinimg.com/originals/49/02/54/4902548424a02117b7913c17d2e379ff.gif"
                      alt=""
                      style={{ maxWidth: "7%" }}
                    />
                    <h3 className="text-[10px] mt-2.5 ">Mint Goddog Shares</h3>
                  </div>
                  <a
                    href="https://www.friend.tech/0x7b202496c103da5bedfe17ac8080b49bd0a333f1"
                    target="_blank"
                    className="flex justify-start text-[10px]  font-mono font-light"
                  >
                    <h3 className="mt-2.5">friend.tech profile</h3>
                    <img
                      src="https://freepngimg.com/thumb/twitter/108250-badge-twitter-verified-download-free-image-thumb.png"
                      alt=""
                      className="w-7"
                    />
                  </a>
                  <div className="flex justify-start">
                    <h3 className="mt-1 text-white text-[10px]  font-mono font-light">
                      Ca: 0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1
                    </h3>
                  </div>
                  <div className="flex justify-start border border-slate-500 mt-3 border-t-0 border-l-0 border-r-0 text-[10px] font-mono font-light">
                    <h3 className="text-white">
                      Price: {goddogPrice} Ξ / share
                    </h3>
                  </div>
                </DialogTitle>
                <DialogDescription className="">
                  <Input
                    type="text"
                    className="border border-slate-500 bg-black text-white rounded-xl mt-2"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setCurrentValue(e.target.value);
                    }}
                  />
                  <div className="flex justify-center">
                    <Button
                      className="border border-slate-500 rounded-xl mt-2 h-10 bg-black hover:bg-white hover:text-black"
                      onClick={() => {
                        unwrapToken();
                      }}
                    >
                      <span className="flex justify-center">
                        <h3 className="font-mono font-bold mt-1">Burn</h3>
                        <img
                          src="https://media3.giphy.com/media/J2awouDsf23R2vo2p5/giphy.gif?cid=6c09b95271qkr9h7zeqhzcchzf0g93pzapi9qzlx1f8ha35c&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=e"
                          alt=""
                          style={{ maxWidth: "6%" }}
                        />
                      </span>
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}

export default HomeCard;
