import {Clothing} from "../../../commons";

export class ItemOrderRequestDto {
    constructor(
        public clothing?: Clothing,
        public quantity?: number,
    ) {
    }
}