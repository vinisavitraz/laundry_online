export class OrderItem {
    constructor(
        public id?: number,
        public name?: string,
        public clothingId?: number,
        public totalQuantity?: number,
        public washPrice?: number,
        public totalWashPrice?: number,
        public totalWashTime?: number,
    ) {
    }
}
