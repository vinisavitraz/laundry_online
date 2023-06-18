import {ReportColumnResponseDto} from "./report-column-response.dto";

export class ReportRowResponseDto {
    constructor(
        public content?: ReportColumnResponseDto[],
    ) {
    }
}