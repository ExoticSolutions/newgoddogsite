import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/maincomponets/Layout";
import HomePage from "@/maincomponets/HomePage";
import FriendUser from "@/maincomponets/FriendUser";
export default function Home() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/friend/:address" element={<FriendUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

//also add another feature to search by twitter user on search bar
// plan for tm finish search bar before moving on make sure it works fine
//then we move on to making thw home page content//after that work on navigating search results NEXT_PUBLIC_PROJECT_ID//build the /friend/Laddress path componet
