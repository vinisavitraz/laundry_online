package com.tads.br.report.dto.request;

public class ReceiptsReportRequestDto {
    private String startDate;
    private String endDate;

    public ReceiptsReportRequestDto(String startDate, String endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public ReceiptsReportRequestDto() {
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
