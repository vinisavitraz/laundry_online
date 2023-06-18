import {Customer} from "../../../commons/models/customer.model";

export class CreateCustomerRequestDto {
    constructor(
        public entity?: Customer,
    ) {
    }
}