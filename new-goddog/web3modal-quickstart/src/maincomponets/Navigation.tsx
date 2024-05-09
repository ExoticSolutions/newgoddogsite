import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Navigation() {
  // <w3m-button />
  // <w3m-network-button />
  return (
    <div
      className="flex justify-between p-2 font-light"
      style={{ fontSize: "13px" }}
    >
      <div className="flex justify-start gap-2">
        <a href="/">
          <img
            src="https://dd.dexscreener.com/ds-data/tokens/base/0xddf7d080c82b8048baae54e376a3406572429b4e.png?size=lg&key=18ea46"
            alt=""
            className="lg:w-18 md:w-10 sm:w-8 w-10"
          />
        </a>

        <a
          href="https://app.uniswap.org/swap?outputCurrency=0xDDf7d080C82b8048BAAe54e376a3406572429b4e&chain=base"
          target="_blank"
          className="text-white mt-2"
        >
          Buy
        </a>

        <h3 className="text-white mt-2">Nfts</h3>
        <Link to={"/friendmint"} className="text-white mt-2">
          FriendMint
        </Link>
        <NavigationMenu className="text-white ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-[10px]"></NavigationMenuTrigger>
              <NavigationMenuContent className="bg-black p-2 border border-slate-500 grid grid-flow-row">
                <Dialog>
                  <DialogTrigger className="text-[11px]">
                    Launchpad
                  </DialogTrigger>
                  <DialogContent className="flex justify-center border border-slate-500 bg-black">
                    <iframe
                      src="https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/erc1155.html?contract=0x1678D488543Ca0534dE51cFe90eD935ECbEC0CDC&chain=%7B%22name%22%3A%22Base%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F8453.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22base%22%2C%22chainId%22%3A8453%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22base%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmW5Vn15HeRkScMfPcW12ZdZcC2yUASpu6eCsECRdEmjjj%2Fbase-512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=d28ab18baa9d45096fc60b44e95d9b5d&tokenId=0&theme=dark&primaryColor=purple"
                      width="520px"
                      height="600px"
                      style={{ maxWidth: "100%" }}
                    ></iframe>
                  </DialogContent>
                </Dialog>
                <NavigationMenuLink className="mt-1 text-[11px]">
                  <a
                    href="https://medium.com/@goddog_official/dear-goddog-community-part-1-de641e8fb846"
                    target="_blank"
                  >
                    Medium
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink className="mt-1">
                  <div className="flex justify-start text-[10px]">
                    <a
                      href="https://interchain.axelar.dev/base/0xDDf7d080C82b8048BAAe54e376a3406572429b4e"
                      target="_blank"
                    >
                      Interchain
                    </a>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <div className="flex justify-start gap-1 text-[11px] mt-1">
                    <a href="">WarpCast</a>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="mt-1.5 hidden md:block sm:hidden relative">
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
