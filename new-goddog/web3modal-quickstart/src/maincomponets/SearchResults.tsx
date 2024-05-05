import React from "react";
import { FriendTechSearchResultsInterface, uintConverter } from "@/variables";
import { ScrollArea } from "@/components/ui/scroll-area";

function SearchResults({
  searchResults,
  isActive,
}: FriendTechSearchResultsInterface[]) {
  //fix this to activley change on search when thing does not exist we still get the previous api repsonse
  //might need to use use effect to fix this in searchbar.tsx and make the hook depend on a variable change such as results
  return (
    <div className="absolute ms-5">
      {isActive ? (
        <>
          {searchResults ? (
            <>
              {searchResults.length > 1 ? (
                <>
                  <ScrollArea className="sm:ms-auto lg:ms-20 border rounded-lg bg-stone-200 h-72 md:w-[300px] lg:w-[500px]">
                    {searchResults.map(
                      (
                        result: FriendTechSearchResultsInterface,
                        index: number
                      ) => {
                        return (
                          <a
                            href=""
                            className="border border-black p-2 grid grid-cols-3"
                            key={index}
                          >
                            <div>
                              <img
                                src={result?.ftPfpUrl}
                                alt=""
                                style={{ maxWidth: "40%" }}
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex justify-start mt-1.5">
                              <h3>{result?.ftName}</h3>
                            </div>
                            <div className="flex justify-end gap-1 mt-1.5">
                              <h3>Price: </h3>
                              <h3>{uintConverter(result?.displayPrice)}</h3>
                            </div>
                          </a>
                        );
                      }
                    )}
                  </ScrollArea>
                </>
              ) : (
                <div className="ms-auto border rounded-lg bg-stone-200 w-[300px]">
                  <a
                    href=""
                    className="border border-black p-2 grid grid-cols-3"
                  >
                    <div>
                      <img
                        src={searchResults?.ftPfpUrl}
                        alt=""
                        style={{ maxWidth: "40%" }}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex justify-start mt-1.5">
                      <h3>{searchResults?.ftName}</h3>
                    </div>
                    <div className="flex justify-end gap-1 mt-1.5">
                      <h3>Price: </h3>
                      <h3>{uintConverter(searchResults?.displayPrice)}</h3>
                    </div>
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="ms-auto border rounded-lg bg-stone-200 w-[300px]">
              <h3 className="text-green">No results found</h3>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default SearchResults;
