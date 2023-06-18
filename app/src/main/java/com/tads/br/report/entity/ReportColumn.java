package com.tads.br.report.entity;

public class ReportColumn {
    private String key;
    private String value;

    public ReportColumn(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public ReportColumn() {
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
