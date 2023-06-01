import {Employee} from "../../../commons/models/employee.model";

export class EmployeeResponseDto {
    constructor(
        public entity?: Employee,
    ) {
    }
}