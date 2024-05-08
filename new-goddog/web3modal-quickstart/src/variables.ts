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
