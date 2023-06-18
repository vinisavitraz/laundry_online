package com.tads.br.report.dto.response;

import com.tads.br.report.entity.ReportColumn;
import com.tads.br.report.entity.ReportRow;

import java.util.List;

public class CustomersReportResponseDto {
    private List<ReportColumn> header;
    private List<ReportRow> content;

    public CustomersReportResponseDto(List<ReportColumn> header, List<ReportRow> content) {
        this.header = header;
        this.content = content;
    }

    public CustomersReportResponseDto() {
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
