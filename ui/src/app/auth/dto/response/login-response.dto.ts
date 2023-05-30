import {Token} from "../../../commons/models/token.model";

export class LoginResponseDto {
    constructor(
        public token: Token,
        public userRole: string,
    ) {
    }
}