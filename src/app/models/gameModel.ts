
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
    dealId?: String,
    name: string,
    gameID: number,
    steamAppID: number,
    salePrice: number,
    retailPrice: number,
    steamRatingText: string,
    steamRatingPercent: number,
    steamRatingCount: number,
    metacriticScore: number,
    metacriticLink: number,
    releaseDate: 1364169600,
    publisher: string,
    steamworks: number,
    thumb: string
  }