
export interface User {

    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    balance?: number;
  
    // New push tableName for save game and purchase?
    savedGame?: string
    purchasedGame?: string

    // In case table name switched
    saved_games?: string;
    purchased_games?: string;
    
    // In case table name switched
    gamesArray?: string;
    purchasedArray?: string;
}




