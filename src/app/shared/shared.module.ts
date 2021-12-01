import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { KeysPipe } from './pipes/enum.pipe';
import { ReadMoreComponent } from './components/readmore.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShortNumberPipe } from './pipes/ShortNumberPipe';

//import { TextInputComponent } from './components/text.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/test-input.component';
import { ConfirmDialogComponent } from './components/confirm.dialog.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationComponent } from './components/pagination.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    KeysPipe,
    ReadMoreComponent,
    SideBarComponent,
    TextInputComponent,
    PaginationComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    KeysPipe,
    ReadMoreComponent,
    ReactiveFormsModule,
    ModalModule,
    FormsModule,
    RouterModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    SideBarComponent,
    PaginationComponent,
    ToastrModule,
    TextInputComponent,
    ConfirmDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
