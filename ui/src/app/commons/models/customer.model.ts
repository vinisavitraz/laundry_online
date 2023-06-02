export class Customer {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public password?: string,
        public document?: string,
        public phone?: string,
        public cep?: string,
        public street?: string,
        public streetNumber?: string,
        public district?: string,
        public city?: string,
        public state?: string,
        public role?: string,
    ) {
    }
}