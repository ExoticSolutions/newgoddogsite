import React from "react";
import { TopFriendTechClubs, uintConverter } from "@/variables";
import { TableCell } from "@/components/ui/table";
import { Link } from "react-router-dom";
function FriendTechClub({ result }: TopFriendTechClubs) {
  return (
    <>
      <TableCell>
        <Link
          to={`/club/${result?.clubId}`}
          className="flex justify-start gap-2"
        >
          <img
            src={result?.clubPfpUrl}
            alt=""
            className="rounded-full w-9 h-9"
          />
          <h3 className="text-white mt-2 font-CircularXX">
            {result?.clubName}
          </h3>
        </Link>
      </TableCell>
      <TableCell>
        <div className="flex justify-start gap-1">
          <h3 className="text-white">
            {uintConverter(result?.pointsPrice).toFixed(2)}
          </h3>
          <img
            src="https://www.friend.tech/keysIcon3d.png"
            alt=""
            className="w-4 h-4"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-center">{result?.membersCount}</div>
      </TableCell>
    </>
  );
}

export default FriendTechClub;
