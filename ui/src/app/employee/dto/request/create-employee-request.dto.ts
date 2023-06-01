import {Employee} from "../../../commons/models/employee.model";

export class CreateEmployeeRequestDto {
    constructor(
        public entity?: Employee,
    ) {
    }
}