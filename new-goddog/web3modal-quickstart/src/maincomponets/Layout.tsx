import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
function Layout() {
  return (
    <div className="grid grid-rows-1">
      <div className="border border-transparent h-[60px]">
        <Navigation />
      </div>
      <div className="">
        <Outlet />
      </div>
      <footer className="border border-slate-500 p-3 mt-5">
        <div className="flex justify-between gap-2">
          <img
            src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
            alt=""
            className="w-[5%]"
          />
          <h3 className="text-white font-CIRCULARXX text-[10px] mt-3">
            Goddog @2024
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
