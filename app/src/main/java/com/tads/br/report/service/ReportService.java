package com.tads.br.report.service;

import com.tads.br.report.entity.*;
import com.tads.br.report.repository.ReportRepositoryInterface;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReportService implements ReportServiceInterface {

    private final ReportRepositoryInterface repository;

    public ReportService(ReportRepositoryInterface repository) {
        this.repository = repository;
    }

    @Override
    public List<ReportRow> getReceiptsContent(String startDate, String endDate) {
        if (startDate == null) {
            startDate = "";
        }

        if (endDate == null) {
            endDate = "";
        }

        System.out.print("getReceiptsContent - service");
        System.out.print(startDate);
        System.out.print(endDate);

        List<ReceiptReportEntity> receipts = this.repository.findReceipts(startDate, endDate);
        DateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy");

        return receipts.stream().map(receiptReportEntity -> {
            ReportRow reportRow = new ReportRow();
            List<ReportColumn> columns = new ArrayList<>();

            columns.add(new ReportColumn("date", dateFormatter.format(receiptReportEntity.getReportDate())));
            columns.add(new ReportColumn("totalOrders", String.valueOf(receiptReportEntity.getTotalOrders())));
            columns.add(new ReportColumn("totalEarned", String.valueOf(receiptReportEntity.getTotalEarned())));

            reportRow.setContent(columns);

            return reportRow;

        }).toList();
    }

    @Override
    public List<ReportRow> getCustomersContent() {
        List<CustomerReportEntity> customers = this.repository.findCustomers();

        return customers.stream().map(customerReportEntity -> {
            ReportRow reportRow = new ReportRow();
            List<ReportColumn> columns = new ArrayList<>();

            columns.add(new ReportColumn("id", String.valueOf(customerReportEntity.getId())));
            columns.add(new ReportColumn("name", customerReportEntity.getName()));
            columns.add(new ReportColumn("email", customerReportEntity.getEmail()));
            columns.add(new ReportColumn("document", customerReportEntity.getDocument()));
            columns.add(new ReportColumn("phone", customerReportEntity.getPhone()));
            columns.add(new ReportColumn("cep", customerReportEntity.getCep()));
            columns.add(new ReportColumn("street", customerReportEntity.getStreet()));
            columns.add(new ReportColumn("streetNumber", customerReportEntity.getStreetNumber()));
            columns.add(new ReportColumn("district", customerReportEntity.getDistrict()));
            columns.add(new ReportColumn("city", customerReportEntity.getCity()));
            columns.add(new ReportColumn("state", customerReportEntity.getState()));

            reportRow.setContent(columns);

            return reportRow;

        }).toList();
    }

    @Override
    public List<ReportRow> getLoyalCustomersContent() {
        List<LoyalCustomerReportEntity> loyalCustomers = this.repository.findLoyalCustomers();

        return loyalCustomers.stream().map(loyalCustomerReportEntity -> {
            ReportRow reportRow = new ReportRow();
            List<ReportColumn> columns = new ArrayList<>();

            columns.add(new ReportColumn("id", String.valueOf(loyalCustomerReportEntity.getId())));
            columns.add(new ReportColumn("name", loyalCustomerReportEntity.getName()));
            columns.add(new ReportColumn("email", loyalCustomerReportEntity.getEmail()));
            columns.add(new ReportColumn("document", loyalCustomerReportEntity.getDocument()));
            columns.add(new ReportColumn("phone", loyalCustomerReportEntity.getPhone()));
            columns.add(new ReportColumn("cep", loyalCustomerReportEntity.getCep()));
            columns.add(new ReportColumn("street", loyalCustomerReportEntity.getStreet()));
            columns.add(new ReportColumn("streetNumber", loyalCustomerReportEntity.getStreetNumber()));
            columns.add(new ReportColumn("district", loyalCustomerReportEntity.getDistrict()));
            columns.add(new ReportColumn("city", loyalCustomerReportEntity.getCity()));
            columns.add(new ReportColumn("state", loyalCustomerReportEntity.getState()));
            columns.add(new ReportColumn("totalOrders", String.valueOf(loyalCustomerReportEntity.getTotalOrders())));
            columns.add(new ReportColumn("totalSpent", String.valueOf(loyalCustomerReportEntity.getTotalSpent())));

            reportRow.setContent(columns);

            return reportRow;

        }).toList();
    }

    @Override
    public List<ReportColumn> getReceiptsReportHeaders() {
        List<ReportColumn> headers = new ArrayList<>();

        headers.add(new ReportColumn("date", "Data"));
        headers.add(new ReportColumn("totalOrders", "Total de pedidos"));
        headers.add(new ReportColumn("totalEarned", "Total de ganhos"));

        return headers;
    }

    @Override
    public List<ReportColumn> getCustomersReportHeaders() {
        List<ReportColumn> headers = new ArrayList<>();

        headers.add(new ReportColumn("id", "ID"));
        headers.add(new ReportColumn("name", "Nome"));
        headers.add(new ReportColumn("email", "Email"));
        headers.add(new ReportColumn("document", "Documento"));
        headers.add(new ReportColumn("phone", "Telefone"));
        headers.add(new ReportColumn("cep", "CEP"));
        headers.add(new ReportColumn("street", "Rua"));
        headers.add(new ReportColumn("streetNumber", "Número da rua"));
        headers.add(new ReportColumn("district", "Bairro"));
        headers.add(new ReportColumn("city", "Cidade"));
        headers.add(new ReportColumn("state", "Estado"));

        return headers;
    }

    @Override
    public List<ReportColumn> getLoyalCustomersReportHeaders() {
        List<ReportColumn> headers = new ArrayList<>();

        headers.add(new ReportColumn("id", "ID"));
        headers.add(new ReportColumn("name", "Nome"));
        headers.add(new ReportColumn("email", "Email"));
        headers.add(new ReportColumn("document", "Documento"));
        headers.add(new ReportColumn("phone", "Telefone"));
        headers.add(new ReportColumn("cep", "CEP"));
        headers.add(new ReportColumn("street", "Rua"));
        headers.add(new ReportColumn("streetNumber", "Número da rua"));
        headers.add(new ReportColumn("district", "Bairro"));
        headers.add(new ReportColumn("city", "Cidade"));
        headers.add(new ReportColumn("state", "Estado"));
        headers.add(new ReportColumn("totalOrders", "Total de pedidos"));
        headers.add(new ReportColumn("totalSpent", "Total gasto"));

        return headers;
    }
}
