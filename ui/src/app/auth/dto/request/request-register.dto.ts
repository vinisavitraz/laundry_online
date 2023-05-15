export class RequestRegisterDto {
    constructor(
        public email?: string,
        public name?: string,
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