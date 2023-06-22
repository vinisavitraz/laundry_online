export class CreateEmployeeRequestDto {
    constructor(
        public name?: string,
        public email?: string,
        public password?: string,
        public birthDate?: string,
    ) {
    }
}