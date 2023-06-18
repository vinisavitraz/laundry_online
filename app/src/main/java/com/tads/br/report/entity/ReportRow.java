package com.tads.br.report.entity;

import java.util.List;

public class ReportRow {
    private List<ReportColumn> content;

    public ReportRow(List<ReportColumn> content) {
        this.content = content;
    }

    public ReportRow() {
    }

    public List<ReportColumn> getContent() {
        return content;
    }

    public void setContent(List<ReportColumn> content) {
        this.content = content;
    }
}
