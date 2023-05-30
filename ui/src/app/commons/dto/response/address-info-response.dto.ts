export class AddressInfoResponseDto {
    constructor(
        public cep?: string,
        public street?: string,
        public streetNumber?: string,
        public district?: string,
        public city?: string,
        public state?: string,
    ) {
    }
}
