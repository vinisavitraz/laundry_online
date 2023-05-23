import { Component } from '@angular/core';

@Component({
  selector: 'app-select-report',
  templateUrl: './select-report.component.html',
  styleUrls: ['./select-report.component.css']
})
export class SelectReportComponent {

  reportName: string;
  showFilter: boolean;

  constructor() {
    this.reportName = '';
    this.showFilter = false;
  }
  public generateReport(): void {

  }
}
