import React from "react";
import { FriendTechSearchResultsInterface, uintConverter } from "@/variables";
import { TableCell } from "@/components/ui/table";
//if u get error for the prop just declare in interfact and put type any
function FriendTechTrendingUser({ result }: FriendTechSearchResultsInterface) {
  console.log(result);
  return (
    <>
      <TableCell className="">
        <div className="flex justify-start gap-2">
          <img src={result?.ftPfpUrl} alt="" className="rounded-full w-7" />
          <h3 className="text-white mt-1 font-mono">{result?.ftUsername}</h3>
        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex justify-start">
          <h3 className="text-white">
            {uintConverter(result?.displayPrice)} Ξ /share
          </h3>
        </div>
      </TableCell>{" "}
      <TableCell className="">
        <div className="flex justify-start">
          <h3 className="text-white">{uintConverter(result?.volume)} Ξ</h3>
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
