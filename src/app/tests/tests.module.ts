import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookingCapacityComponent } from './components/booking.capacity.component';
import { BookingsComponent } from './components/bookings.component';
import { ScheduleTestComponent } from './components/scheduleTest.component';
import { TestResultsComponent } from './components/testResults.component';
import { ViewTestResultComponent } from './components/viewResult.component';

const routes: Routes = [
  {
    path: '',
    component: TestResultsComponent,
    pathMatch: 'full',
  },
  {
    path: 'viewresult',
    component: ViewTestResultComponent,
    pathMatch: 'full',
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    pathMatch: 'full',
  },
  {
    path: 'schedule',
    component: ScheduleTestComponent,
    pathMatch: 'full',
  },
  {
    path: 'bookingcapacity',
    component: BookingCapacityComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],

  declarations: [
    BookingsComponent,
    ScheduleTestComponent,
    BookingCapacityComponent,
    TestResultsComponent,
    ViewTestResultComponent,
  ],
})
export class TestsModule {}
