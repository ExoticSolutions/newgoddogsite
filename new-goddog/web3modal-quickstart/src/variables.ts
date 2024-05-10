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
  isActive: any;
  result: any;
  map: any;
  searchResults: any;
}

export interface FriendTechUserSearch {
  address: string;
  ftPfpUrl: string;
  ftUsername: string;
  ftName: string;
  displayPrice: string;
  map: any;
}

export interface ClubSearchResults {
  clubId: string;
  clubName: string;
  clubPfpUrl: string;
  pointsPrice: string;
  map: any;
  length: any;
}

export interface TopFriendTechClubs {
  clubId: string;
  clubName: string;
  clubPfpUrl: string;
  clubDescription: string;
  pointsPrice: string;
  membersCount: number;
  map: any;
  result: any;
}
export interface FriendTechTvl {
  id: string;
  name: string;
  address: string;
  symbol: string;
  url: string;
  description: string;
  chain: string;
  logo: string;
  audits: string;
  audit_note: string;
  gecko_id: string;
  cmcId: string;
  category: string;
  chains: string[];
  module: string;
  twitter: string;
  forkedFrom: any;
  oracles: any;
  listedAt: string;
  chainsTvls: any;
  Base: any;
  tvl: any;
  date: string;
  totalLiquidity: any;
  data: any;
}
export interface FriendTechContractSearch {
  id: number;
  address: string;
  twitterUsername: string;
  twitterName: string;
  twitterPfpUrl: string;
  twitterUserId: string;
  ftUsername: string;
  ftName: string;
  ftPfpUrl: string;
  lastOnline: string;
  lastMessageTime: number;
  holderCount: number;
  holdingCount: number;
  watchListCount: number;
  followerCount: number;
  follwingCount: number;
  shareSupply: number;
  displayPrice: string;
  netBuy: string;
  lifetimeFeesCollectedInWei: string;
  userBio: string;
  rank: number;
}

export interface FriendTechFollowers {
  address: string;
  pfpUrl: string;
  userName: string;
  name: string;
  ftUsername: string;
  ftName: string;
  ftPfpUrl: string;
  userBio: string;
  isFollowing: boolean;
  map: any;
  item: any;
  length: number;
}

export interface SpecificClub {
  clubId: string;
  clubName: string;
  clubPfpUrl: string;
  clubDescription: string;
  membersCount: number;
  createdAt: number;
  coefficient: string;
  lastMessageTime: string;
  creator: {
    id: number;
    address: string;
    twitterUsername: any;
    twitterPfpUrl: string;
    twitterUserId: any;
    ftUserName: string;
    ftName: string;
    ftPfpUrl: string;
  };
  map: any;
}

export interface FriendTechUserActivity {
  date: string;
  price: number;
  dissectedPriceActivity: {
    date: string;
    price: number;
  };
}

export function dissectPriceActivity(data: any, sharesCa: string) {
  console.log(sharesCa);
  let dissectedPriceActivity = [];
  for (const activity in data) {
    if (
      data[activity].subject.address === sharesCa &&
      data[activity].ethAmount !== "0"
    ) {
      console.log(data[activity]);
      const sharesBought = Number(data[activity].shareAmount);
      const currentDate: string = String(
        Date(data[activity].createdAt).slice(0, 15)
      );
      const buyAmount = uintConverter(data[activity].ethAmount);
      const priceAtEvent = buyAmount / sharesBought;
      dissectedPriceActivity.push({
        date: currentDate,
        price: priceAtEvent,
      });
    }
  }

  return dissectedPriceActivity;
}

export function goodPriceActivate() {
  return "1 goddog = 2 eth";
}

export function uintConverter(uintTarget: string) {
  return Number(uintTarget) / 10 ** 18;
}
