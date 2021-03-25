export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    balance: number;

    constructor(id: number, username: string, password: string, firstName: string, lastName: string, balance: number){
        this.id=id;
        this.username=username;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.balance=balance;
    }

}



