
// Interface for game deal list and detail
// Everything we didn't map will not be in the GameDeal obj that implement this interface eventhough it can be log in console at .pipe(tap(...))
export interface IGameDeal  {
    internalName: string,
    title: string,
    metacriticLink: string,
    dealID: string,
    gameID: number,
    salePrice: number,
    normalPrice: number,
    isOnSale: number,
    savings: number,
    metacriticScore: number,
    steamRatingText: string,
    steamRatingPercent: number,
    steamRatingCount: number,
    steamAppID: string,
    releaseDate: number,
    dealRating: number,
    thumb: string
  }
  export interface IGameDealDetail{
    gameInfo: IGameInfo
  }

  export interface IGameInfo{
    name: "BioShock Infinite",
    steamAppID: "8870",
    salePrice: "7.49",
    retailPrice: "29.99",
    steamRatingText: "Overwhelmingly Positive",
    steamRatingPercent: "95",
    steamRatingCount: "52167",
    metacriticScore: "94",
    metacriticLink: "/game/pc/bioshock-infinite",
    releaseDate: 1364169600,
    publisher: "2K Games",
    steamworks: "1",
    thumb: "https://steamcdn-a.akamaihd.net/steam/apps/8870/capsule_sm_120.jpg?t=1534538071"
  }