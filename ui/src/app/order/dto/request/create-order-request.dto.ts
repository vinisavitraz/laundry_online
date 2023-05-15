import {ItemOrderRequestDto} from "./item-order-request.dto";

export class CreateOrderRequestDto {
    constructor(
        public items?: ItemOrderRequestDto[],
        public customerId?: number,
    ) {
    }
}