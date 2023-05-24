import {Clothing} from "../../../commons";

export class ClothingsResponseDto {
    constructor(
        public entities?: Clothing[],
    ) {
    }
}