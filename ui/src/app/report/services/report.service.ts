import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL, DEFAULT_HEADERS} from "../../commons/constants/app-client.constants";
import {ReportResponseDto} from "../dto/response/report-response.dto";
import {ReceiptsRequestDto} from "../dto/request/receipts-request.dto";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
      private httpClient: HttpClient,
  ) { }

  public generateReportReceipts(receiptsRequestDto: ReceiptsRequestDto): Observable<ReportResponseDto> {
    return this.httpClient.post<ReportResponseDto>(
        BASE_URL + '/reports/receipts',
        receiptsRequestDto,
        DEFAULT_HEADERS
    );
  }

  public generateReportCustomers(): Observable<ReportResponseDto> {
    return this.httpClient.post<ReportResponseDto>(
        BASE_URL + '/reports/customers', DEFAULT_HEADERS
    );
  }

  public generateReportLoyalCustomers(): Observable<ReportResponseDto> {
    return this.httpClient.post<ReportResponseDto>(
        BASE_URL + '/reports/loyal-customers', DEFAULT_HEADERS
    );
  }
}
