import React, { useEffect, useState } from "react";
import {
  FriendTechSearchResultsInterface,
  friendTechEndpoint,
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

import axios from "axios";
import FriendTechTrendingUser from "./subComponets/FriendTechTrendingUser";
function FriendMint() {
  const [trendingUsers, setTrendingUsers] =
    useState<FriendTechSearchResultsInterface | null>(null);
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
  }, []);
  return (
    <div className="container">
      <div className="border p-3">
        <div className=" flex justify-center">
          <h3 className="text-white text-2xl font-mono text-center">
            Explore & Mint your favorite Friend.Tech profiles as ERC-1155s
            through FrenMint!
          </h3>
        </div>
        <div className="flex justify-center gap-1 font-mono">
          <h3 className="text-white">Onchain summer powered by</h3>
          <img
            src="https://avatars.githubusercontent.com/u/108554348?s=280&v=4"
            alt=""
            className="w-4 h-4 mt-1.5"
          />
        </div>
      </div>
      <div className=" p-2">
        <h3 className="text-white">hello</h3>
        {trendingUsers !== null ? (
          <>
            <Table className="border p-3 text-white ">
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Trade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trendingUsers.map(
                  (result: FriendTechSearchResultsInterface, index: number) => {
                    return (
                      <TableRow key={index}>
                        <FriendTechTrendingUser result={result} />
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default FriendMint;
