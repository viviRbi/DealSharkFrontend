
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
  /*
  {
    "internalName": "MONSTERSLAYERS",
    "title": "Monster Slayers",
    "metacriticLink": "/game/pc/monster-slayers",
    "dealID": "efnekCfOb2PEuQKTA0pkNNle%2FulyRP4j9fx0E5vdncQ%3D",
    "storeID": "3",
    "gameID": "167601",
    "salePrice": "2.43",
    "normalPrice": "8.99",
    "isOnSale": "1",
    "savings": "72.969967",
    "metacriticScore": "86",
    "steamRatingText": "Very Positive",
    "steamRatingPercent": "88",
    "steamRatingCount": "313",
    "steamAppID": "496620",
    "releaseDate": 1534291200,
    "lastChange": 1535037686,
    "dealRating": "10.0",
    "thumb": "https://steamcdn-a.akamaihd.net/steam/apps/496620/capsule_sm_120.jpg?t=1533784859"
  },
  */