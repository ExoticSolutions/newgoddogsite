/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchResults from "./SearchResults";
import {
  friendTechEndpoint,
  FriendTechSearchResultsInterface,
  ClubSearchResults,
  uintConverter,
  FriendTechUserSearch,
  FriendTechContractSearch,
} from "@/variables";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { Link } from "react-router-dom";
function SearchBar() {
  const [input, setInput] = useState("");
  const [tabActivate, setTabActivate] = useState(false);
  const [tabSelected, setTabSelected] = useState("");
  const [clubSearchResults, setClubSearchResults] =
    useState<ClubSearchResults | null>(null);
  const [userSearchResults, setUserSearchResults] =
    useState<FriendTechUserSearch | null>(null);
  const [contractSearchResults, setContractSearchResults] =
    useState<FriendTechContractSearch | null>(null);
  const [displaySearchTab, setDisplaySearchTab] = useState(true);

  //fix this and seach results componet so we dont have to use the python api

  useEffect(() => {
    if (/\s/.test(input)) {
      setInput(input.replace(/\s/g, "%20"));
    }
    handleSearch();

    console.log(input);
  }, [input]);
  useEffect(() => {
    switch (tabSelected) {
      case "clubs":
        setContractSearchResults(null);
        setUserSearchResults(null);
        break;
      case "users":
        setClubSearchResults(null);
        setContractSearchResults(null);
      case "contract":
        setClubSearchResults(null);
        setUserSearchResults(null);
    }
  }, [tabSelected]);

  function handleSearch() {
    switch (tabSelected) {
      case "clubs":
        searchClubs();
        break;
      case "users":
        searchUsers();
        break;
      case "contract":
        searchContract();
        break;
    }
  }
  function searchClubs() {
    axios
      .get(`https://prod-api.kosetto.com/search-clubs?query=${input}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      })
      .then(function (results) {
        setClubSearchResults(results.data.clubs);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function searchUsers() {
    console.log(input);
    axios
      .get(`https://prod-api.kosetto.com/v2/search/users?username=${input}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
        },
      })
      .then(function (results) {
        console.log(results.data.users);
        setUserSearchResults(results.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function searchContract() {
    axios
      .get(
        `
      https://prod-api.kosetto.com/users/${input}`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE1MDM5OTAwLCJleHAiOjE3MTc2MzE5MDB9.LfBn7S7_F0FTZfwg0NhNy8ZQPXG0zFpfqds-ikv-_n4",
          },
        }
      )
      .then(function (results) {
        setContractSearchResults(results.data);
      })
      .catch(function (error) {
        setContractSearchResults(null);
        console.log(error);
      });
  }

  return (
    <div>
      <div className="flex justify-space-between gap-5 lg:ms-20 items:center">
        <a href="" type="button" className="mt-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="white"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <Input
          type="text"
          className={`
          bg-stone-800 
          border-slate-100 
          rounded-full 
          md:h-[20px]  
          lg:h-[20px] 
          md:w-[300px] 
          lg:w-[300px] 
          text-white
          flex
          justify-center
          items-center
          px-3
        `}
          onClick={() => {
            console.log("Clicked");
            setTabActivate(true);
            setDisplaySearchTab(true);
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      {tabActivate ? (
        <>
          {displaySearchTab ? (
            <Tabs
              defaultValue="account"
              className={`
            
            text-white 
            border border-slate-500 
            rounded-xl 
            block 
            bg-black 
            p-2 
           
          `}
            >
              <TabsList className="">
                <div className="">
                  <TabsTrigger
                    value="clubs"
                    className="text-white hover:border hover:border-slate-500 rounded-xl"
                    onClick={() => {
                      setTabSelected("clubs");
                    }}
                  >
                    Clubs
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="text-white hover:border hover:border-slate-500 rounded-xl"
                    onClick={() => {
                      setTabSelected("users");
                    }}
                  >
                    Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="contract"
                    className="text-white hover:border hover:border-slate-500 rounded-xl"
                    onClick={() => {
                      setTabSelected("contract");
                    }}
                  >
                    Contract
                  </TabsTrigger>
                  <TabsTrigger
                    value=""
                    className="text-white hover:border hover:border-slate-500 rounded-xl"
                    onClick={() => {
                      setDisplaySearchTab(false);
                    }}
                  >
                    <img
                      src="https://www.friend.tech/closeIcon.svg"
                      alt="Close"
                      className="w-2 h-2 hover:opacity-90 transition duration-200"
                    />
                  </TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="clubs">
                {/* <h3 className="flex justify-start">
        {clubSearchResults !== null ? "Results" : "Search by club"}
      </h3> */}
                <ScrollArea className="sm:ms-auto lg:ms-20 border border-transparent bg-black w-full h-[140px] text-white text-xs">
                  {clubSearchResults !== null &&
                  tabSelected === "clubs" &&
                  clubSearchResults.length > 0 ? (
                    <div className="grid grid-flow-row">
                      {clubSearchResults.map(
                        (item: ClubSearchResults, index: number) => {
                          return (
                            <Link
                              to={`/club/${item?.clubId}`}
                              className="border border-slate-500 p-2"
                              key={index}
                            >
                              <div className="grid grid-cols-3 gap-1 text-white">
                                <div>
                                  <img
                                    src={item?.clubPfpUrl}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                  />
                                </div>
                                <div>{item?.clubName}</div>
                                <div className="flex justify-center">
                                  {uintConverter(item?.pointsPrice).toFixed(2)}
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center p-10">
                      <h3 className="text-white">No Results Found</h3>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="users">
                <h3 className="text-center">Search by user</h3>
                <ScrollArea className="sm:ms-auto lg:ms-20 border border-transparent bg-black w-full h-[140px] text-white text-xs">
                  {userSearchResults !== null ? (
                    <div className="grid grid-flow-row">
                      {userSearchResults.map(
                        (item: FriendTechUserSearch, index: number) => {
                          return (
                            <div
                              className="border border-slate-500 p-2"
                              key={index}
                            >
                              <Link
                                to={`/friend/${item?.address}`}
                                className="grid grid-cols-3 gap-1 text-white"
                                onClick={() => {
                                  setDisplaySearchTab(false);
                                }}
                              >
                                <div>
                                  <img
                                    src={item?.ftPfpUrl}
                                    alt=""
                                    className="w-8 h-8 rounded-full"
                                  />
                                </div>
                                <div className="text-white">
                                  {item?.ftUsername}
                                </div>
                                <div className="flex justify-center">
                                  {uintConverter(item?.displayPrice)}
                                </div>
                              </Link>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center p-10">
                      <h3 className="text-white">No Results Found</h3>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="contract">
                <h3 className="text-center">Search by contract</h3>
                {contractSearchResults ? (
                  <ScrollArea className="sm:ms-auto lg:ms-20 border border-transparent bg-black w-full h-[140px] text-white text-xs">
                    <div className="grid grid-flow-row">
                      <div className="border border-slate-500 p-2">
                        <Link
                          to={`/friend/${contractSearchResults?.address}`}
                          className="grid grid-cols-3 gap-1 text-white"
                          onClick={() => {
                            setDisplaySearchTab(false);
                          }}
                        >
                          <div>
                            <img
                              src={contractSearchResults?.ftPfpUrl}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                          <div className="text-white">
                            {contractSearchResults?.ftUsername}
                          </div>
                          <div className="flex justify-center">
                            {uintConverter(contractSearchResults?.displayPrice)}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex justify-center p-10">
                    <h3 className="text-white">No Results Found</h3>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : null}
        </>
      ) : null}
      {/* <SearchResults searchResults={results} isActive={isInputActive} /> */}
    </div>
  );
}

export default SearchBar;
