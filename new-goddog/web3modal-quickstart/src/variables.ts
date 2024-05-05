export const friendTechEndpoint: string = "https://prod-api.kosetto.com/";

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
