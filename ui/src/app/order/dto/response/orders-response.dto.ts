import {Order} from "../../../commons";

export class OrdersResponseDto {
    constructor(
        public entities?: Order[],
    ) {
    }
}