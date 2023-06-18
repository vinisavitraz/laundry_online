package com.tads.br.report.entity;

import java.util.Date;

public class ReceiptReportEntity {
    private Date reportDate;
    private double totalOrders;
    private double totalEarned;

    public ReceiptReportEntity(Date reportDate, double totalOrders, double totalEarned) {
        this.reportDate = reportDate;
        this.totalOrders = totalOrders;
        this.totalEarned = totalEarned;
    }

    public ReceiptReportEntity() {
    }

    public Date getReportDate() {
        return reportDate;
    }

    public void setReportDate(Date reportDate) {
        this.reportDate = reportDate;
    }

    public double getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(double totalOrders) {
        this.totalOrders = totalOrders;
    }

    public double getTotalEarned() {
        return totalEarned;
    }

    public void setTotalEarned(double totalEarned) {
        this.totalEarned = totalEarned;
    }
}
