import React from "react";
import { FriendTechSearchResultsInterface, uintConverter } from "@/variables";
import { TableCell } from "@/components/ui/table";
import { Link } from "react-router-dom";
//if u get error for the prop just declare in interfact and put type any
//all thats left is to get club information to display it seperatly
//also do a set timeout with loading animation to prevent images from rendering while calling api so everything is ready when rendered
function FriendTechTrendingUser({ result }: FriendTechSearchResultsInterface) {
  console.log(result);
  return (
    <>
      <TableCell className="">
        <Link
          to={`/friend/${result?.address}`}
          className="flex justify-start gap-2"
        >
          <img src={result?.ftPfpUrl} alt="" className="rounded-full w-9 h-9" />
          <h3 className="text-white mt-3 font-mono">{result?.ftUsername}</h3>
        </Link>
      </TableCell>
      <TableCell className="">
        <div className="flex justify-start gap-1">
          <h3 className="text-white">{uintConverter(result?.displayPrice)}</h3>
          <h3 className="text-white">Ξ</h3>
        </div>
      </TableCell>{" "}
      <TableCell className="">
        <div className="flex justify-start gap-1">
          <h3 className="text-white">{uintConverter(result?.volume)} </h3>
          <h3 className="text-white">Ξ</h3>
        </div>
      </TableCell>{" "}
      <TableCell className="">
        <div className="flex justify-start">
          <h3 className="text-white">{result?.ftUsername}</h3>
        </div>
      </TableCell>
    </>
  );
}

export default FriendTechTrendingUser;
