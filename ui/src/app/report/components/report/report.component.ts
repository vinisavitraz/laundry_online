import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {ReportsEnum} from "../../../commons/enums/reports.enum";
import {ReportService} from "../../services/report.service";
import {ReceiptsRequestDto} from "../../dto/request/receipts-request.dto";
import jsPDF from 'jspdf';
import {ReportResponseDto} from "../../dto/response/report-response.dto";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  @ViewChild('content') content!: ElementRef;

  reportName: string;
  reportTitle: string;
  showFilter: boolean;
  startDate?: string;
  endDate?: string;
  reportResponseDto?: ReportResponseDto;

  constructor(private reportService: ReportService, private changeDetector : ChangeDetectorRef) {
    this.reportName = '';
    this.reportTitle = '';
    this.showFilter = false;
  }

  public selectReport(value: any): void {
    this.showFilter = false;
    this.reportName = '';

    switch (value.target.value) {
      case ReportsEnum.RECEIPTS:
        this.showFilter = true;
        this.reportName = ReportsEnum.RECEIPTS;
        break;
      case ReportsEnum.ALL_CUSTOMERS:
        this.reportName = ReportsEnum.ALL_CUSTOMERS;
        break;
      case ReportsEnum.LOYAL_CUSTOMERS:
        this.reportName = ReportsEnum.LOYAL_CUSTOMERS;
        break;
    }
  }

  public generateReport(): void {
    switch (this.reportName) {
      case ReportsEnum.RECEIPTS:
        this.generateReceiptsReport();
        break;
      case ReportsEnum.ALL_CUSTOMERS:
        this.generateAllCustomersReport();
        break;
      case ReportsEnum.LOYAL_CUSTOMERS:
        this.generateLoyalCustomersReport();
        break;
      default:
        alert('Selecione um relatório!');
        break;
    }
  }

  private generateReceiptsReport(): void {
    const receiptsRequestDto: ReceiptsRequestDto = new ReceiptsRequestDto(this.startDate, this.endDate);

    this.reportService.generateReportReceipts(receiptsRequestDto).subscribe(content => {
      if (content == null) {
        alert('Falha ao gerar relatório!');
        return;
      }

      if (receiptsRequestDto.startDate === undefined && receiptsRequestDto.endDate === undefined) {
        this.reportTitle = 'Relatório de receitas por período';
      } else {
        const startDate: string = receiptsRequestDto.startDate ?? '';
        const endDate: string = receiptsRequestDto.endDate ?? '';

        this.reportTitle = 'Relatório de receitas por período - Data Inicial: ' + startDate + ' | Data Final: ' + endDate;
      }

      this.reportResponseDto = content;
      this.openPDF('receitas');
    });
  }

  private generateAllCustomersReport(): void {
    this.reportService.generateReportCustomers().subscribe(content => {
      if (content == null) {
        alert('Falha ao gerar relatório!');
        return;
      }

      this.reportTitle = 'Relatório de clientes';
      this.reportResponseDto = content;
      this.openPDF('clientes');
    });
  }

  private generateLoyalCustomersReport(): void {
    this.reportService.generateReportLoyalCustomers().subscribe(content => {
      if (content == null) {
        alert('Falha ao gerar relatório!');
        return;
      }

      this.reportTitle = 'Relatório de melhores clientes';
      this.reportResponseDto = content;
      this.openPDF('melhores_clientes');
    });
  }

  public openPDF(reportFileName: string): void {
    this.changeDetector.detectChanges();

    const doc = new jsPDF('l', 'px','a4',true);

    doc.html(this.content.nativeElement, {
      callback: function (doc) {
        doc.save(reportFileName + ".pdf");
      }
    });
  }
}
