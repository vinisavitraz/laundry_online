import {Customer} from "../../../commons/models/customer.model";

export class RegisterResponseDto {
    constructor(
        public customer: Customer | null,
        public errorMessage: string | null = null,
    ) {
    }
}