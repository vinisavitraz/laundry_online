import {Clothing} from "../../../commons";

export class CreateClothingRequestDto {
    constructor(
        public entity?: Clothing,
    ) {
    }
}