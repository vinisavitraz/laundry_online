export class OrderItem {
    constructor(
        public id?: number,
        public clothingId?: number,
        public totalQuantity?: number,
        public totalWashPrice?: number,
        public totalWashTime?: number,
    ) {
    }
}
