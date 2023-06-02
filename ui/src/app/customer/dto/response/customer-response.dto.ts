import {Customer} from "../../../commons/models/customer.model";

export class CustomerResponseDto {
    constructor(
        public entity?: Customer,
    ) {
    }
}