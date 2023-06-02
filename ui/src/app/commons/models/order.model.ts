import {OrderItem} from "./order-item.model";

export class Order {
    constructor(
        public id?: number,
        public status?: string,
        public washPrice?: number,
        public washTime?: number,
        public items?: OrderItem[],
        public customerId?: number,
        public createDate?: Date,
        public paymentDate?: Date,
    ) {
    }
}
