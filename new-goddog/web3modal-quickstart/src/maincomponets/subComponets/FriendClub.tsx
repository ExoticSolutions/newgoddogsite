import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SpecificClub, uintConverter } from "@/variables";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
function FriendClub() {
  const [clubMainInfo, setClubMainInfo] = useState<SpecificClub | null>(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [clubActivity, setClubActivity] = useState([]);
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`https://prod-api.kosetto.com/clubs/${params.id}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      })
      .then(function (results) {
        console.log(results.data);
        setClubMainInfo(results.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://prod-api.kosetto.com/clubs/${params.id}/members`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      })
      .then(function (results) {
        console.log(results.data.users);
        setClubMembers(results.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://prod-api.kosetto.com/clubs/${params.id}/activity`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      })
      .then(function (results) {
        console.log(results.data.events);
        setClubActivity(results.data.events);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="container p-16">
      {clubMainInfo ? (
        <div className="border border-slate-500 rounded-xl">
          <div className=" flex justify-start text-white">
            <div className="gap-1">
              <div className="">
                <img
                  src={clubMainInfo?.clubPfpUrl}
                  alt=""
                  className="w-32 h-32 rounded-full p-5 mt-1"
                />
              </div>
              <div className=" p-5">
                <h3 className="text-white text-[30px] overflow-hidden font-bold">
                  {clubMainInfo?.clubName}
                </h3>
                <div className="flex justify-start gap-2">
                  <h3 className="text-white text-[12px] mt-2">members:</h3>
                  {clubMembers.map((item: any, index: number) => {
                    if (index < 3) {
                      return (
                        <img
                          src={item?.ftPfpUrl}
                          alt=""
                          className="w-8 h-8 rounded-full"
                          key={index}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                  <h3 className="text-white text-[12px] mt-1">
                    + {clubMainInfo ? clubMainInfo?.membersCount : null} friends
                  </h3>
                </div>
                <div className="flex justify-start">
                  <a href="">
                    <div className="flex justify-start mt-2 gap-2">
                      <h3 className="text-[12px] mt-2">
                        Creator: {clubMainInfo?.creator.ftName}
                      </h3>
                      <img
                        src={clubMainInfo?.creator.ftPfpUrl}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </a>
                </div>

                <a
                  href={`https://www.friend.tech/clubs/${clubMainInfo?.clubId}`}
                  className="text-white"
                >
                  <div className="flex justify-start gap-1 text-stone-400">
                    <h3># {clubMainInfo?.clubId}</h3>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-1"
                    >
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className=" ms-2">
            <div className="mt-1 flex justify-start gap-1 text-xs p-2 gap-2">
              <div className="border border-slate-500 text-white p-1 rounded-xl bg-blue-800">
                <span className="font-bold">
                  <h3 className="mt-1">Friend.Tech Club</h3>
                </span>
              </div>
              <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[65px] h-[32px] text-xs">
                <img
                  src="https://www.friend.tech/keysIcon3d.png"
                  alt=""
                  style={{ maxWidth: "45%" }}
                  className="border border-transparent rounded-full p-1.5"
                />
                <h3 className="mt-2">Keys</h3>
              </div>
              <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[200px] h-[32px] text-xs">
                <img
                  src="https://avatars.githubusercontent.com/u/108554348?s=280&v=4"
                  alt=""
                  style={{ maxWidth: "45%" }}
                  className="border border-transparent rounded-full p-2"
                />
                <a
                  href={`https://basescan.org/address/${clubMainInfo?.creator.address}`}
                  target="_blank"
                  className="mt-2 overflow-hidden text-[10px]"
                >
                  {clubMainInfo?.creator.address}
                </a>
              </div>
            </div>
            <div className="flex justify-start p-2 gap-2">
              <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[200px] h-[32px] text-xs p-1.5 gap-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <a
                  href={`https://www.friend.tech/${clubMainInfo?.creator.address}`}
                  target="_blank"
                  className="overflow-hidden text-[10px]"
                >
                  https://www.friend.tech/{clubMainInfo?.creator.address}
                </a>
              </div>
              <div className="flex justify-center border border-slate-500 text-blue-500 rounded-xl bg-stone-800 w-[200px] h-[32px] text-xs p-1.5 gap-1">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/018/930/695/original/twitter-logo-twitter-icon-transparent-free-free-png.png"
                  alt=""
                />
                <a
                  href={`https://www.twitter.com/${clubMainInfo?.creator.twitterUsername}`}
                  target="_blank"
                  className="overflow-hidden text-[10px]"
                >
                  https://www.twitter.com/
                  {clubMainInfo?.creator.twitterUsername}
                </a>
              </div>
            </div>
          </div>
          <div className="border border-slate-500 p-2 mt-2">
            <h3 className="text-white">Recent Activity:</h3>
            {clubActivity ? (
              <ScrollArea className="h-[350px]">
                <Table>
                  <TableHeader className="text-white">
                    <TableRow>
                      <TableHead>User:</TableHead>
                      <TableHead>Amount:</TableHead>
                      <TableHead>Price:</TableHead>
                      <TableHead className="text-center">Date:</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clubActivity.map((item: any, index: number) => {
                      return (
                        <TableRow
                          key={index}
                          className="border border-slate-500 p-2"
                        >
                          <TableCell>
                            <img
                              src={item?.trader.ftPfpUrl}
                              alt=""
                              className="w-16 h-16 rounded-full"
                            />
                          </TableCell>
                          <TableCell className="text-white text-[18px] flex justify-start gap-2 ms-5 mt-5 text-green-500">
                            {item?.keysAmount}
                          </TableCell>
                          <TableCell className="text-white text-[12px] ms-5 mt-2 text-blue-500">
                            <div className="flex justify-start gap-2">
                              <img
                                src="https://www.friend.tech/friendLogo.png"
                                alt=""
                                className="w-5 h-5"
                              />
                              {uintConverter(item?.pointsAmount).toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-white text-[10px] ms-5 mt-2 text-green-500">
                            {Date(item?.createdAt).slice(0, 16)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FriendClub;

// [
//   {
//     trader: {
//       userId: '0xdb6ac2c8866e03d454e20a0256fa56e78b6003d0',
//       address: '0xdb6ac2c8866e03d454e20a0256fa56e78b6003d0',
//       ftUsername: 'criptomaniac_',
//       ftName: 'MNC 𝕏® 🪄✺',
//       ftPfpUrl:
//         'https://d3egfmvgqzu76k.cloudfront.net/twitterPfps/0xdb6ac2c8866e03d454e20a0256fa56e78b6003d0.jpg?Expires=1815304443&Key-Pair-Id=K11ON08J8XW8N0&Signature=HNw6~g~JVRjPEBB2-LNDNhYggSv2p~QfXmufEkh9BQZ8dEhJ1b~I0RwEaooI2GiOjLxSJxcjcqdU0V7DrLi8F4GF41dU9j9NLafwVy3OnQCgxV~8TRSlauI1dG2qVkk-mp19RB1YwCuQo6aSnfQLGutQJa23ZXCbgtCB8Blfek2VPRkgveI3pHjhSzQOxofgMBN0dB6yaVUGtLkv9ORIe3UjjtQhNFGmmKhs23oPNBgjE6LAZ9oVoGXxmfjtI0lW924h0x5Cxk8ZAKv6MvjlTcN9oMkYZTAH~tJmS2ZcpTkylFi~82LMb7wSQmQWp~C4Aftkn4Dt1MpqF3Xs9qiIZw__'
//     },
//     keysAmount: '1',
//     pointsAmount: '873000000000000000',
//     isBuy: false,
//     createdAt: 1714938532479,
//     transactionIndex: 43,
//     blockNumber: 14074591
//   },
//   {
//     trader: {
//       userId: '0xdb6ac2c8866e03d454e20a0256fa56e78b6003d0',
//       address: '0xdb6ac2c8866e03d454e20a0256fa56e78b6003d0',
//       ftUsername: 'criptomaniac_',
//       ftName: 'MNC 𝕏® 🪄✺',
//       ftPfpUrl:
//         'https://d3egfmvgqzu76k.cloudfront.net/twitterPfps/0xdb6ac2c8866e03d454e20a0256fa56e78b6003d0.jpg?Expires=1815304443&Key-Pair-Id=K11ON08J8XW8N0&Signature=HNw6~g~JVRjPEBB2-LNDNhYggSv2p~QfXmufEkh9BQZ8dEhJ1b~I0RwEaooI2GiOjLxSJxcjcqdU0V7DrLi8F4GF41dU9j9NLafwVy3OnQCgxV~8TRSlauI1dG2qVkk-mp19RB1YwCuQo6aSnfQLGutQJa23ZXCbgtCB8Blfek2VPRkgveI3pHjhSzQOxofgMBN0dB6yaVUGtLkv9ORIe3UjjtQhNFGmmKhs23oPNBgjE6LAZ9oVoGXxmfjtI0lW924h0x5Cxk8ZAKv6MvjlTcN9oMkYZTAH~tJmS2ZcpTkylFi~82LMb7wSQmQWp~C4Aftkn4Dt1MpqF3Xs9qiIZw__'
//     },
//     keysAmount: '1',
//     pointsAmount: '927000000000000000',
//     isBuy: true,
//     createdAt: 1714936436762,
//     transactionIndex: 40,
//     blockNumber: 14073544
//   },
//   {
//     trader: {
//       userId: '0xaf1874d1ab35a12b6cc41a256cf4379f0dbf9d87',
//       address: '0xaf1874d1ab35a12b6cc41a256cf4379f0dbf9d87',
//       ftUsername: 'president_trump',
//       ftName: 'President Trump',
//       ftPfpUrl:
//         'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0xaf1874d1ab35a12b6cc41a256cf4379f0dbf9d87/41463003jpt0ejt4k2?Expires=1815304443&Key-Pair-Id=K11ON08J8XW8N0&Signature=Rk5zj8O7vxQe2YBYOkt4FoZUqigwwXKUz0UMo5qe~Feau42Gfd-lbE-SsY1JJ9s6O2aD0IiEx7rwNyWEQmIv9OLYfcYAGSvrbOtuFHMtey2SPlJBrWqrjmmnO6KqAs-EW9~3PleKFiHZ5v8mTW2HtFc98g4FF3NVzAUkeHCWvqtXYHAXQ6fADOjxXAY5H~OswLfRi0bJy-IFoS4y-wI7TBPN6mbcU5x0yHZgYzhPI6FTTHMRrUA9MDBC6-gfokqDtMGFAsCbOJ1KhTUDvn~gLPiAZJWxlkKdZzLrU1QGquq3MO6S-~4nWu3Ktd8HBdab75uQIl~M9FTJFCR52wfdng__'
//     },
//     keysAmount: '1',
//     pointsAmount: '873000000000000000',
//     isBuy: false,
//     createdAt: 1714930892508,
//     transactionIndex: 40,
//     blockNumber: 14070771
//   },
//   {
//     trader: {
//       userId: '0xaf1874d1ab35a12b6cc41a256cf4379f0dbf9d87',
//       address: '0xaf1874d1ab35a12b6cc41a256cf4379f0dbf9d87',
//       ftUsername: 'president_trump',
//       ftName: 'President Trump',
//       ftPfpUrl:
//         'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0xaf1874d1ab35a12b6cc41a256cf4379f0dbf9d87/41463003jpt0ejt4k2?Expires=1815304443&Key-Pair-Id=K11ON08J8XW8N0&Signature=Rk5zj8O7vxQe2YBYOkt4FoZUqigwwXKUz0UMo5qe~Feau42Gfd-lbE-SsY1JJ9s6O2aD0IiEx7rwNyWEQmIv9OLYfcYAGSvrbOtuFHMtey2SPlJBrWqrjmmnO6KqAs-EW9~3PleKFiHZ5v8mTW2HtFc98g4FF3NVzAUkeHCWvqtXYHAXQ6fADOjxXAY5H~OswLfRi0bJy-IFoS4y-wI7TBPN6mbcU5x0yHZgYzhPI6FTTHMRrUA9MDBC6-gfokqDtMGFAsCbOJ1KhTUDvn~gLPiAZJWxlkKdZzLrU1QGquq3MO6S-~4nWu3Ktd8HBdab75uQIl~M9FTJFCR52wfdng__'
//     },
//     keysAmount: '3',
//     pointsAmount: '1442000000000000000',
//     isBuy: true,
//     createdAt: 1714928524545,
//     transactionIndex: 24,
//     blockNumber: 14069587
//   },

// {
//   clubId: '136975',
//   clubName: 'Ansem degen',
//   clubPfpUrl:
//     'https://ft-clubs-public-prod.s3.amazonaws.com/club-pfps/0x6620b6b6da2f8f01f156c5bc6167b4bb5166a50f-23101680-uil5j9ssdx9',
//   clubDescription: null,
//   membersCount: 1,
//   createdAt: 1715062798057,
//   coefficient: '10',
//   lastMessageTime: null,
//   creator: {
//     id: 100979,
//     address: '0x6620b6b6da2f8f01f156c5bc6167b4bb5166a50f',
//     twitterUsername: null,
//     twitterName: null,
//     twitterPfpUrl:
//       'https://d3egfmvgqzu76k.cloudfront.net/twitterPfps/0x6620b6b6da2f8f01f156c5bc6167b4bb5166a50f.jpg?Expires=1815271328&Key-Pair-Id=K11ON08J8XW8N0&Signature=VO21v4RpMcZuHwQwqvlOOchC2pGpaJmeKZVwDD7cgo0agK-Hq56ZKYSKSHQPtnYBnS~AqzCKI9fGI~ixsqnNWIpJVI48Te5lrJOM~73sj9yxo2zJbVGAQBbBh9W9O~UPWbCfLrMRV1Ym52dylGrYKg7mLRzhpkXWtcyLqxtzxEV~cy8QhTJ4bWsd5ILEVesr2ZDE7rXWGT0bSU-TA5XTcQg8HvBi8R9Zw33Ivh1Lc6NrevHqM0L63PD58bJ~02-Vu4uLeMkKTf-iBZhMnb~pzSgFrRtLhSivMzVHncHWzISO7ZbjWHQYueTMz3lp1QRdQuBLoVpWDLq5v8GZdcTzbg__',
//     twitterUserId: null,
//     ftUsername: 'Korex06',
//     ftName: 'Korex',
//     ftPfpUrl:
//       'https://d3egfmvgqzu76k.cloudfront.net/pfp-images/0x6620b6b6da2f8f01f156c5bc6167b4bb5166a50f/365100932uf2d9c4vn?Expires=1815271328&Key-Pair-Id=K11ON08J8XW8N0&Signature=aC1xQwFzPmk6zrWuXXYyBI2QHds10P3I5rA4OxyPKuh5tSHYByJn-Q43lTpqr4dSAlMpvxqYDpAcVxZvcOBcmgp-Y59WPH2pAC~fPP9CBPbJbEJ70QdV-IKckRpsySVBGnuiv9ypTLIpBLxn~0Z4cG2U07lfFupow5iITcnlHIuyOdFZX-m~Q61GqS7AyQTJkxk4oo18kqSwjwcRNtTNOfkoja2rRqvV-D~mj9S4dGtEnvEm9DWywkEjeOyeK4YOqObIeR8e5jDwxaxRRto0incBh9Z3eiKFzOsFWkvx-Xf6hGnonZdW-Fzw7jUVcF5MDq9TO~qPDmxVtbMecLy87w__'
//   }
// }
