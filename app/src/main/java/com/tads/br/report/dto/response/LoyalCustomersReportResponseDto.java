package com.tads.br.report.dto.response;

import com.tads.br.report.entity.ReportColumn;
import com.tads.br.report.entity.ReportRow;

import java.util.List;

public class LoyalCustomersReportResponseDto {
    private List<ReportColumn> header;
    private List<ReportRow> content;

    public LoyalCustomersReportResponseDto(List<ReportColumn> header, List<ReportRow> content) {
        this.header = header;
        this.content = content;
    }

    public LoyalCustomersReportResponseDto() {
    }

    public List<ReportColumn> getHeader() {
        return header;
    }

    public void setHeader(List<ReportColumn> header) {
        this.header = header;
    }

    public List<ReportRow> getContent() {
        return content;
    }

    public void setContent(List<ReportRow> content) {
        this.content = content;
    }
}
