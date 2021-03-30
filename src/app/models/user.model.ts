export interface User {

    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    balance?: number;

    // In case table name switched
    saved_games?: string;
    purchased_games?: string;
    
    // In case table name switched
    gamesArray?: string;
    purchasedArray?: string;
}



