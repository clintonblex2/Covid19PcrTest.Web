import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: '../views/confirm.dialog.html',
})
export class ConfirmDialogComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef) {}
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;
  ngOnInit(): void {}

  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }
  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }
}
