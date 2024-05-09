import React, { useEffect, useState } from "react";
import {
  FriendTechSearchResultsInterface,
  friendTechEndpoint,
  TopFriendTechClubs,
} from "@/variables";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import axios from "axios";
import FriendTechTrendingUser from "./subComponets/FriendTechTrendingUser";
import FriendTechClub from "./subComponets/FriendTechClub";
import FriendTechTvlChart from "./subComponets/FriendTechTvlChart";
function FriendMint() {
  const [trendingUsers, setTrendingUsers] =
    useState<FriendTechSearchResultsInterface | null>(null);
  const [topClubs, setTopClubs] = useState<TopFriendTechClubs | null>(null);
  useEffect(() => {
    const query = "https://prod-api.kosetto.com/lists/trending";
    console.log(query);
    axios
      .get(query)
      .then(function (results) {
        console.log(results.data.users);
        setTrendingUsers(results.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("https://prod-api.kosetto.com/lists/top-clubs-by-market-cap")
      .then(function (results) {
        setTopClubs(results.data.clubs);
        console.log(topClubs);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="container">
      <div className="p-14">
        <div className=" flex justify-center">
          <h3 className="text-white text-2xl font-CircularXX text-center">
            Mint your favorite friend.tech profiles as ERC-1155s with FrenMint!
          </h3>
        </div>
        <div className="flex justify-center gap-1 font-CircularXX">
          <h3 className="text-white mt-2">Onchain Summer On god, On god. Powered by</h3>
          <img
            src="https://avatars.githubusercontent.com/u/108554348?s=280&v=4"
            alt=""
            className="w-4 h-4 mt-3"
          />
        </div>
      </div>
      {/* //in friend tech user swap make a follower element displays who followiths with ft ppfp url  with at least 4 images showing then shows how may more followers ex: +1000 or +4 */}
      <div className="border border-slate-500 rounded-xl mt-2 p-7">
        <FriendTechTvlChart />
        <div className="flex justify-end gap-2">
          <h3 className="text-white font-CircularXX text-[10px] mt-2">Powered by</h3>
          <img
            src="https://defillama.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_white_long.74912819.png&w=384&q=75"
            alt=""
            className="w-20 h-7"
          />
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <Card className="text-white border border-slate-500 rounded-xl">
          <div className="">
            <CardHeader>
              <img
                src="https://pbs.twimg.com/profile_banners/1739288918867214336/1713372529/1500x500"
                alt=""
                className="w-80"
              />
              <div className="absolute">
                <div className="flex justify-start">
                  <img
                    src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
                    alt=""
                    className="w-14  mt-[75px]"
                  />
                  <h3 className="text-white mt-[100px] font-bold">GODDOG</h3>
                </div>
              </div>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-white">test</h3>

              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </div>
        </Card>
      </div>
      <div className="mt-10 grid md:grid-cols-2 grid-grid-rows-1 md:gap-3 gap-y-8 ">
        <div className="">
          {trendingUsers !== null ? (
            <>
              <h3 className="text-center text-white font-CircularXX mb-2 text-[20px]">
                Trending users
              </h3>
              <ScrollArea className="h-[500px] w-50 border border-slate-500 rounded-xl">
                <Table className="border border-slate-500 p-4 text-white text-[9px]">
                  <TableHeader>
                    <TableRow className="border border-slate-500">
                      <TableHead>User</TableHead>
                      <TableHead>Price / Share</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Trade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trendingUsers.map(
                      (
                        result: FriendTechSearchResultsInterface,
                        index: number
                      ) => {
                        return (
                          <TableRow
                            key={index}
                            className="border border-slate-500"
                          >
                            <FriendTechTrendingUser result={result} />
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </>
          ) : null}
        </div>
        <div>
          {topClubs !== null ? (
            <>
              <h3 className="text-center text-white font-CircularXX mb-2 text-[20px]">
                Trending clubs
              </h3>
              <ScrollArea className="h-[500px] w-50 border border-slate-500 rounded-xl">
                <Table className="border border-slate-500 p-3 text-white text-[9px]">
                  <TableHeader>
                    <TableRow className="border border-slate-500">
                      <TableHead>Club Name</TableHead>
                      <TableHead>Price / Key</TableHead>
                      <TableHead>Members</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topClubs.map(
                      (result: TopFriendTechClubs, index: number) => {
                        return (
                          <TableRow
                            key={index}
                            className="border border-slate-500"
                          >
                            <FriendTechClub result={result} />
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FriendMint;
