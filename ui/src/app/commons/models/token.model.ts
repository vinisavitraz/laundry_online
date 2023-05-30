export class Token {
    constructor(
        public token?: string,
        public expiresAt?: Date,
        public userId?: number,
    ) {
    }
}
