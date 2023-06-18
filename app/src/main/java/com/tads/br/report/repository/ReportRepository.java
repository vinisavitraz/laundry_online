package com.tads.br.report.repository;

import com.tads.br.report.entity.CustomerReportEntity;
import com.tads.br.report.entity.LoyalCustomerReportEntity;
import com.tads.br.report.entity.ReceiptReportEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReportRepository implements ReportRepositoryInterface {

    private final JdbcTemplate jdbcTemplate;

    private static final String QUERY_FIND_RECEIPTS = "SELECT DATE(createdate) AS reportDate, COUNT(o.id) AS totalOrders, SUM(o.washprice) AS totalEarned FROM orders o WHERE o.status = 'finished' GROUP BY reportDate ORDER BY reportDate";
    private static final String QUERY_FIND_RECEIPTS_WITH_START_DATE = "SELECT DATE(createdate) AS reportDate, COUNT(o.id) AS totalOrders, SUM(o.washprice) AS totalEarned FROM orders o WHERE o.status = 'finished' AND DATE(createdate) >= DATE(?) GROUP BY reportDate ORDER BY reportDate";
    private static final String QUERY_FIND_RECEIPTS_WITH_END_DATE = "SELECT DATE(createdate) AS reportDate, COUNT(o.id) AS totalOrders, SUM(o.washprice) AS totalEarned FROM orders o WHERE o.status = 'finished' AND DATE(createdate) <= DATE(?) GROUP BY reportDate ORDER BY reportDate";
    private static final String QUERY_FIND_RECEIPTS_WITH_PERIOD = "SELECT DATE(createdate) AS reportDate, COUNT(o.id) AS totalOrders, SUM(o.washprice) AS totalEarned FROM orders o WHERE o.status = 'finished' AND DATE(createdate) BETWEEN DATE(?) AND DATE(?) GROUP BY reportDate ORDER BY reportDate";
    private static final String QUERY_FIND_CUSTOMERS = "SELECT id, name, email, document, phone, cep, street, streetnumber, district, city, state FROM users WHERE role = 'customer'";
    private static final String QUERY_FIND_LOYAL_CUSTOMERS = "SELECT u.id, u.name, u.email, u.document, u.phone, u.cep, u.street, u.streetnumber, u.district, u.city, u.state, COUNT(o.id) as totalOrders, SUM(o.washprice) as totalSpent FROM orders o LEFT JOIN users u on o.customerid = u.id GROUP BY u.id ORDER BY totalOrders DESC LIMIT 3";

    public ReportRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<ReceiptReportEntity> findReceipts(String startDate, String endDate) {
        if (startDate.isEmpty() && endDate.isEmpty()) {
            return jdbcTemplate.query(ReportRepository.QUERY_FIND_RECEIPTS, BeanPropertyRowMapper.newInstance(ReceiptReportEntity.class));
        }

        if (endDate.isEmpty()) {
            return jdbcTemplate.query(ReportRepository.QUERY_FIND_RECEIPTS_WITH_START_DATE, BeanPropertyRowMapper.newInstance(ReceiptReportEntity.class), startDate);
        }

        if (startDate.isEmpty()) {
            return jdbcTemplate.query(ReportRepository.QUERY_FIND_RECEIPTS_WITH_END_DATE, BeanPropertyRowMapper.newInstance(ReceiptReportEntity.class), endDate);
        }

        return jdbcTemplate.query(ReportRepository.QUERY_FIND_RECEIPTS_WITH_PERIOD, BeanPropertyRowMapper.newInstance(ReceiptReportEntity.class), startDate, endDate);
    }

    @Override
    public List<CustomerReportEntity> findCustomers() {
        return jdbcTemplate.query(ReportRepository.QUERY_FIND_CUSTOMERS, BeanPropertyRowMapper.newInstance(CustomerReportEntity.class));
    }

    @Override
    public List<LoyalCustomerReportEntity> findLoyalCustomers() {
        return jdbcTemplate.query(ReportRepository.QUERY_FIND_LOYAL_CUSTOMERS, BeanPropertyRowMapper.newInstance(LoyalCustomerReportEntity.class));
    }

}
