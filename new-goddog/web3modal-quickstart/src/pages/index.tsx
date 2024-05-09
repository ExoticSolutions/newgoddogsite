import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@/maincomponets/Layout";
import HomePage from "@/maincomponets/HomePage";
import FriendUser from "@/maincomponets/FriendUser";
import FriendMint from "@/maincomponets/FriendMint";

export default function Home() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/friend/:address" element={<FriendUser />} />
            <Route path="/friendmint" element={<FriendMint />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}


//also add another feature to search by twitter user on search bar
// plan for tm finish search bar before moving on make sure it works fine
//then we move on to making thw home page content//after that work on navigating search results NEXT_PUBLIC_PROJECT_ID//build the /friend/Laddress path componet
