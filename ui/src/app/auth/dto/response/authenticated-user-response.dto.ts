import {User} from "../../../commons/models/user.model";

export class AuthenticatedUserResponseDto {
    constructor(
        public entity?: User,
    ) {
    }
}