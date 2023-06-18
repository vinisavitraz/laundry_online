package com.tads.br.report.service;

import com.tads.br.report.entity.ReportColumn;
import com.tads.br.report.entity.ReportRow;

import java.util.Date;
import java.util.List;

public interface ReportServiceInterface {

    List<ReportRow> getReceiptsContent(String startDate, String endDate);

    List<ReportRow> getCustomersContent();

    List<ReportRow> getLoyalCustomersContent();

    List<ReportColumn> getReceiptsReportHeaders();

    List<ReportColumn> getCustomersReportHeaders();

    List<ReportColumn> getLoyalCustomersReportHeaders();

}
