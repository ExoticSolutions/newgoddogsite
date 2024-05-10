import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart, // Add this line
  Area, // Add this line
  ReferenceLine,
} from "recharts";
import { FriendTechTvl } from "@/variables";
import axios from "axios";

function FriendTechTvlChart() {
  const [tvlData, setTvlData] = useState<FriendTechTvl | null>(null);

  useEffect(() => {
    axios
      .get("https://api.llama.fi/protocol/friend.tech")
      .then(function (results) {
        const tvlData = results.data.chainTvls.Base.tvl;
        for (const data in tvlData) {
          const currentDate = new Date(tvlData[data].date * 1000); // Assuming the date is a Unix timestamp
          const formattedDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
          tvlData[data].date = formattedDate;
        }
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
          src="https://www.friend.tech/ftLogo.svg"
          alt=""
          className="w-6 h-6"
        />
        <h3 className="text-white font-CircularX font-bold">friend.tech</h3>
      </div>
      <div className="flex justify-center p-5 text-xs">
        <AreaChart
          width={900}
          height={400}
          data={tvlData}
          margin={{ top: 30, right: 0, left: 50, bottom: 0 }}
        >
          <Area
            type="natural"
            dataKey="totalLiquidityUSD"
            stroke="white"
            fill="#0d6efd"
            name="Total Liquidity (USD)"
          />
          <CartesianGrid stroke="#6c757d" />
          <XAxis dataKey={"date"} />
          <YAxis
            dataKey={"totalLiquidityUSD"}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            domain={["auto"]}
          />
          <Tooltip
            content={({ payload, label }) =>
              payload &&
              payload.length > 0 && (
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p>
                    <strong>Date:</strong> {label}
                  </p>
                  <p>
                    <strong>Total Liquidity USD:</strong> $
                    {new Intl.NumberFormat("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(payload[0].value)}
                  </p>
                </div>
              )
            }
          />
          <ReferenceLine
            x="2024-05-03"
            stroke="red"
            strokeWidth={2}
            label={{ value: "V2 Launch", position: "top", fill: "red" }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: "30px", color: "white" }}
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default FriendTechTvlChart;
