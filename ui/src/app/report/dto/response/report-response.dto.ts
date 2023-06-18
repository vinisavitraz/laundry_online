import {ReportColumnResponseDto} from "./report-column-response.dto";
import {ReportRowResponseDto} from "./report-row-response.dto";

export class ReportResponseDto {
    constructor(
        public header?: ReportColumnResponseDto[],
        public content?: ReportRowResponseDto[],
    ) {
    }
}