import {Employee} from "../../../commons/models/employee.model";

export class UpdateEmployeeRequestDto {
    constructor(
        public entity?: Employee,
    ) {
    }
}