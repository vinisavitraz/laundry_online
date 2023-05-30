import {AddressInfoResponseDto} from "./address-info-response.dto";

export class CepResponseDto {
    constructor(
        public address?: AddressInfoResponseDto,
    ) {
    }
}