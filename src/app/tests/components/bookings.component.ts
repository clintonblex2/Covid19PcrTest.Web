import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { BookingStatus } from '../models/bookingStatus';
import { BookingVm } from '../models/bookingVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/bookings.html',
  providers: [DatePipe],
})
export class BookingsComponent implements OnInit {
  bookings: BookingVm[] = [];
  booking: BookingVm;
  bookingStatus = BookingStatus;
  form: FormGroup;
  modalRef?: BsModalRef;
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
    private confirmService: ConfirmService,
    private datepipe: DatePipe
  ) {
    this.form = new FormGroup({
      resultType: new FormControl('', [Validators.required]),
      remarks: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.populateBookings();
  }

  openAddTestModal(template: TemplateRef<any>, booking: BookingVm) {
    this.modalRef = this.modalService.show(template);
    this.booking = booking;
  }
  addTest() {
    let addTest = {
      bookingReference: this.booking.bookingReference,
      testResultType: +this.form.get('resultType')?.value,
      additionalInfo: this.form.get('remarks')?.value,
    };
    this.testService.addTestResult(addTest).subscribe((res) => {
      this.updateBooking(res.result);
      this.modalRef.hide();
      this.form.reset();
      this.form.markAsPristine();
    });
  }
  cancelBooking(booking: BookingVm) {
    this.booking = booking;
    this.confirmService.confirm().subscribe((result) => {
      if (result) {
        this.testService
          .cancelBooking({
            bookingReference: booking.bookingReference,
            phoneNumber: booking.phoneNumber,
          })
          .subscribe((res) => {
            this.updateBooking(res.result);
          });
      }
    });
  }
  updateBooking(booking: BookingVm) {
    let findIndex = this.bookings.findIndex(
      (x) => x.bookingReference === this.booking.bookingReference
    );
    this.bookings[findIndex] = booking;
  }

  onPageChange(page: any) {
    this.query.page = page;
    this.populateBookings();
  }
  onFilterChange() {
    this.populateBookings();
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
    this.populateBookings();
  }
  openFilterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  private populateBookings() {
    this.transFormDate();
    this.testService.getBookings(this.query).subscribe((res) => {
      this.bookings = res.result.data;
      this.totalCount = res.result.totalPages;
    });
  }

  private transFormDate() {
    this.query.from =
      this.datepipe.transform(this.startDate, 'yyyy/MM/dd') || '';
    this.query.to = this.datepipe.transform(this.endDate, 'yyyy/MM/dd') || '';
  }
}
