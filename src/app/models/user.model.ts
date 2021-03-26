export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    balance: number;
    gamesArray: string;
    purchasedArray: string;

    constructor(id: number, username: string, password: string, firstName: string, lastName: string, balance: number, gamesArray: string, purchasedArray: string){
        this.id=id;
        this.username=username;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.balance=balance;
        this.gamesArray=gamesArray;
        this.purchasedArray=purchasedArray;
    }

}



