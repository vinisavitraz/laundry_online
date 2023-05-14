export class Order {
    constructor(
        public id?: number,
        public status?: string,
        public washPrice?: number,
        public washTime?: number,
    ) {
    }
}
