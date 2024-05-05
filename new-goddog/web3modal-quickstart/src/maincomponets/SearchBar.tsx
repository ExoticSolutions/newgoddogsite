import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchResults from "./SearchResults";
import {
  friendTechEndpoint,
  FriendTechSearchResultsInterface,
} from "@/variables";
import axios from "axios";
function SearchBar() {
  const [value, setValue] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [results, setResults] =
    useState<FriendTechSearchResultsInterface | null>(null);

  useEffect(() => {
    console.log(value);
    if (value.length > 0) {
      handleSearch();
      setIsInputActive(true);
    } else {
      setIsInputActive(false);
    }
  }, [value]);

  const handleChange = (value: string) => {
    setValue(value);
    handleSearch();
  };

  const handleSearch = () => {
    if (value.length > 0 && value.toLowerCase().includes("0x")) {
      fetch(`http://127.0.0.1:8080/search/address/${value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setResults(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (value.length > 0) {
      axios
        .get(`http://127.0.0.1:8080/search/twitter/${value}`)
        .then((results) => {
          const searchResponse = results.data.users;
          console.log(searchResponse);
          const filteredResults = filterSearchResults(searchResponse);
          console.log(filteredResults);

          setResults(filteredResults);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const filterSearchResults = (
    searchResponse: FriendTechSearchResultsInterface[]
  ) => {
    console.log(searchResponse);
    const filteredResponse: FriendTechSearchResultsInterface[] =
      searchResponse.filter((result: FriendTechSearchResultsInterface) => {
        return result.twitterUsername.includes(value);
      });
    console.log(filteredResponse);

    return filteredResponse;
  };

  return (
    <div>
      <div className="flex justify-center gap-1 lg:ms-20 ">
        <a href="" type="button" className="mt-0.5">
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
          className="bg-stone-800 border-slate-500 rounded-full md:h-[20px]  lg:h-[20px] md:w-[300px] lg:w-[500px] text-white"
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === "enter") {
              handleSearch();
            }
          }}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </div>
      <SearchResults searchResults={results} isActive={isInputActive} />
    </div>
  );
}

export default SearchBar;
