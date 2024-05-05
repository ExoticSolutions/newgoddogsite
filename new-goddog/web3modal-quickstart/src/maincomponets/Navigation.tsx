import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
function Navigation() {
  // <w3m-button />
  // <w3m-network-button />
  return (
    <div
      className="flex justify-between p-2 font-light"
      style={{ fontSize: "13px" }}
    >
      <div className="flex justify-start gap-3">
        <img
          src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
          alt=""
          className="lg:w-18 md:w-10 sm:w-8 w-10"
        />
        <h3 className="text-white mt-2">Swap</h3>
        <h3 className="text-white mt-2">Explore</h3>
        <h3 className="text-white mt-2">Nfts</h3>
      </div>
      <div className="mt-1.5 hidden md:block sm:hidden">
        <SearchBar />
      </div>
      <div>
        <h3>hello</h3>
      </div>
      <div className="">
        <w3m-button balance="hide" size="sm" />
      </div>
    </div>
  );
}

export default Navigation;
