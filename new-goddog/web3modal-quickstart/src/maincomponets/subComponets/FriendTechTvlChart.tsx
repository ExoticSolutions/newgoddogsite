import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FriendTechTvl } from "@/variables";
import axios from "axios";
function FriendTechTvlChart() {
  const [tvlData, setTvlData] = useState<FriendTechTvl | null>(null);
  useEffect(() => {
    axios
      .get("https://api.llama.fi/protocol/friend.tech")
      .then(function (results) {
        //convert date timestamps to regular dates slice the date string to only show month, day and year
        //also make a equation to shorten tvl to tens ex 35.6 million dollars
        //price /10000000 ex
        const tvlData = results.data.chainTvls.Base.tvl;
        console.log(tvlData);
        for (const data in tvlData) {
          const currentDate = tvlData[data].date;
          const formattedDate = Date(currentDate).slice(0, 15);
          tvlData[data].date = formattedDate;
          console.log(tvlData[data]);
        }
        console.log(tvlData);
        setTvlData(tvlData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-start gap-1">
        <img
          src="https://forums.frontier.co.uk/attachments/1000012145-png.391294/"
          alt=""
          className="w-6 h-6"
        />
        <h3 className="text-white font-mono">Friend.Tech TVl</h3>
      </div>
      <div className="flex justify-center p-5 text-xs">
        <LineChart width={600} height={300} data={tvlData}>
          <Line
            type="monotone"
            dataKey="totalLiquidityUSD"
            stroke="blue"
            fill="gray"
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey={"date"} />
          <YAxis dataKey={"totalLiquidityUSD"} />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}

export default FriendTechTvlChart;
