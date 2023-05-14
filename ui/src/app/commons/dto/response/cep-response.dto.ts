import {AddressInfo} from "../../models/address-info.model";

export class CepResponseDto {
    constructor(
        public address?: AddressInfo,
    ) {
    }
}