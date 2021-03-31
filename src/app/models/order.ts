import { orderUser } from './orderUser';
export interface order {
    orderid?: Number,
    gameId?: Number;
    gamePrice?: Number;
    quantity?: Number;
    orderUser: Object;
}