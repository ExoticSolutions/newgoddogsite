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
    </div>
  );
}

export default Layout;
