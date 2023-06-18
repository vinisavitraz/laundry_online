export class CreateCustomerRequestDto {
    constructor(
        public name?: string,
        public email?: string,
        public document?: string,
        public phone?: string,
        public cep?: string,
        public street?: string,
        public streetNumber?: string,
        public district?: string,
        public city?: string,
        public state?: string,
    ) {
    }
}