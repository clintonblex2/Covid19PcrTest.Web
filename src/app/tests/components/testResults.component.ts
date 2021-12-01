import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TestResultTypes } from '../models/testResultTypes';
import { TestResultVm } from '../models/testResultVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/testResults.html',
  providers: [DatePipe],
})
export class TestResultsComponent implements OnInit {
  testResults: TestResultVm[] = [];
  resultTypes = TestResultTypes;
  bsModalRef: BsModalRef;
  page = 1;
  pageSize = 10;
  startDate = new Date();
  endDate = new Date();
  totalCount: number;
  query: any = {
    page: this.page,
    pageSize: this.pageSize,
    from: '',
    to: '',
  };
  constructor(
    private testService: TestService,
    private modalService: BsModalService,
    private datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.populateTestResults();
  }

  onPageChange(page: any) {
    this.query.page = page;
    this.populateTestResults();
  }
  onFilterChange() {
    this.populateTestResults();
  }
  resetFilter() {
    this.query = {
      page: this.page,
      pageSize: this.pageSize,
      from: '',
      to: '',
    };
    this.startDate = new Date();
    this.endDate = new Date();
    this.populateTestResults();
  }
  openFilterModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }
  private populateTestResults() {
    this.transFormDate();
    this.testService.getTestResults(this.query).subscribe((res) => {
      this.testResults = res.result.data;
      this.totalCount = res.result.totalPages;
    });
  }

  private transFormDate() {
    this.query.from =
      this.datepipe.transform(this.startDate, 'yyyy/MM/dd') || '';
    this.query.to = this.datepipe.transform(this.endDate, 'yyyy/MM/dd') || '';
  }
}
