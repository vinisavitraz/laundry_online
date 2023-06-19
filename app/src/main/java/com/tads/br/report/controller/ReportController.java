package com.tads.br.report.controller;

import com.tads.br.report.dto.request.ReceiptsReportRequestDto;
import com.tads.br.report.dto.response.CustomersReportResponseDto;
import com.tads.br.report.dto.response.LoyalCustomersReportResponseDto;
import com.tads.br.report.dto.response.ReceiptsReportResponseDto;
import com.tads.br.report.entity.ReportColumn;
import com.tads.br.report.entity.ReportRow;
import com.tads.br.report.service.ReportServiceInterface;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReportController {

    private final ReportServiceInterface service;

    public ReportController(ReportServiceInterface service) {
        this.service = service;
    }

    @PostMapping("/reports/receipts")
    @ResponseBody
    public ReceiptsReportResponseDto getReceipts(@RequestBody ReceiptsReportRequestDto receiptsReportRequestDto) {
        List<ReportColumn> headers = this.service.getReceiptsReportHeaders();

        List<ReportRow> rows = this.service.getReceiptsContent(receiptsReportRequestDto.getStartDate(), receiptsReportRequestDto.getEndDate());

        return new ReceiptsReportResponseDto(headers, rows);
    }

    @PostMapping("/reports/customers")
    @ResponseBody
    public CustomersReportResponseDto getCustomers() {
        List<ReportColumn> headers = this.service.getCustomersReportHeaders();
        List<ReportRow> rows = this.service.getCustomersContent();

        return new CustomersReportResponseDto(headers, rows);
    }

    @PostMapping("/reports/loyal-customers")
    @ResponseBody
    public LoyalCustomersReportResponseDto getLoyalCustomers() {
        List<ReportColumn> headers = this.service.getLoyalCustomersReportHeaders();
        List<ReportRow> rows = this.service.getLoyalCustomersContent();

        return new LoyalCustomersReportResponseDto(headers, rows);
    }

}
