import {Clothing} from "../../../commons";

export class UpdateClothingRequestDto {
    constructor(
        public entity?: Clothing,
    ) {
    }
}