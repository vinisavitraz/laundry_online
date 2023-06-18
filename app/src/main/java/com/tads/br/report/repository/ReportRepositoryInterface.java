package com.tads.br.report.repository;

import com.tads.br.report.entity.CustomerReportEntity;
import com.tads.br.report.entity.LoyalCustomerReportEntity;
import com.tads.br.report.entity.ReceiptReportEntity;

import java.util.List;

public interface ReportRepositoryInterface {

    List<ReceiptReportEntity> findReceipts(String startDate, String endDate);

    List<CustomerReportEntity> findCustomers();

    List<LoyalCustomerReportEntity> findLoyalCustomers();

}
