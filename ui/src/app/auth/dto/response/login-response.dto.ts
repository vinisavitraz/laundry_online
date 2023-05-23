import {User} from "../../../commons/models/user.model";

export class LoginResponseDto {
    constructor(
        public user: User | null,
        public errorMessage: string | null = null,
    ) {
    }
}