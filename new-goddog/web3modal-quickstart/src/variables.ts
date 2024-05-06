export const friendTechEndpoint: string = "http://127.0.0.1:8080/";
export const goddogShareAddress: string =
  "0x7b202496C103DA5BEDFE17aC8080B49Bd0a333f1";
export interface FriendTechSearchResultsInterface {
  address: string;
  displayPrice: string;
  followerCount: number;
  followingCount: number;
  ftName: string;
  ftPfpUrl: string;
  ftUsername: string;
  holderCount: number;
  holdingCount: number;
  id: number;
  lastMessageTime: string;
  lastOnline: string;
  lifetimeFeesCollectedInWei: string;
  netBuy: string;
  rank: string;
  shareSupply: number;
  twitterUsername: string;
  userBio: string;
  watchListCount: number;
  isActive: boolean;
}

export function uintConverter(uintTarget: string) {
  return Number(uintTarget) / 10 ** 18;
}
