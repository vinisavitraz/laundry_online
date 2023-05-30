package com.tads.br.report.service;

import com.tads.br.report.repository.ReportRepositoryInterface;
import org.springframework.stereotype.Service;

@Service
public class ReportService implements ReportServiceInterface {

    private final ReportRepositoryInterface repository;

    public ReportService(ReportRepositoryInterface repository) {
        this.repository = repository;
    }

}
