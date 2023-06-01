import {Employee} from "../../../commons/models/employee.model";

export class EmployeesResponseDto {
    constructor(
        public entities?: Employee[],
    ) {
    }
}