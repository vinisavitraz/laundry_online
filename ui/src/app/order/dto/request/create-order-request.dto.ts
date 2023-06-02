import {OrderItem} from "../../../commons/models/order-item.model";
import {Order} from "../../../commons";

export class CreateOrderRequestDto {
    constructor(
        public entity?: Order,
        public items?: OrderItem[],
    ) {
    }
}