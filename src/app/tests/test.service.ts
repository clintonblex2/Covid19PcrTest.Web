import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../shared/models/ApiResponse';
import { ApiService } from '../shared/services/Api.services';
import { BookingCapacityVm } from './models/bookingCapacityVm';
import { BookingVm } from './models/bookingVm';
import { LocationVm } from './models/locationVm';
import { TestResultVm } from './models/testResultVm';
import { VaccineTypesVm } from './models/vaccineTypesVm';

@Injectable({
  providedIn: 'root',
})
export class TestService extends ApiService {
  baseUrl = `${environment.baseUrl}/api/v1/Patient`;
  backOfficeUrl = `${environment.baseUrl}/api/v1/Admin`;
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  getBookings(query: any) {
    return this.GetDataWithFilter<PaginatedResult<BookingVm[]>>(
      query,
      `${this.backOfficeUrl}/GetBookedCovidPcrTest`
    );
  }
  scheduleTest(model: any) {
    return this.post<BookingVm>(model, `${this.baseUrl}/bookCovidPcrTest`);
  }
  cancelBooking(model: any) {
    return this.post<BookingVm>(
      model,
      `${this.baseUrl}/cancelBookedCovidPcrTest`
    );
  }
  getLabLocationsAndTestDays() {
    return this.GetAll<LocationVm[]>(
      `${this.backOfficeUrl}/GetLocationsWithTestLabs`
    );
  }
  getVaccineTypes() {
    return this.GetAll<VaccineTypesVm[]>(
      `${this.backOfficeUrl}/FetchVaccineTypes`
    );
  }
  addTestResult(model: any) {
    return this.post<BookingVm>(
      model,
      `${this.backOfficeUrl}/completeBookedTest`
    );
  }
  getTestResults(query: any) {
    return this.GetDataWithFilter<PaginatedResult<TestResultVm[]>>(
      query,
      `${this.backOfficeUrl}/getCovidPcrTestResult`
    );
  }
  viewTestResult(model: any) {
    return this.post<TestResultVm>(model, `${this.baseUrl}/covidPcrTestResult`);
  }
  getBookingCapacity(query: any) {
    return this.GetDataWithFilter<PaginatedResult<BookingCapacityVm[]>>(
      query,
      `${this.backOfficeUrl}/AvailableTestDays`
    );
  }
  getLocationsWithLabs() {
    return this.GetAll<LocationVm[]>(
      `${this.backOfficeUrl}/getLocationsWithLabs`
    );
  }
  allocateSpace(model: any) {
    return this.post<any>(
      model,
      `${this.backOfficeUrl}/GetLocationsWithTestLabs`
    );
  }
  addMoreSpace(model: any) {
    return this.post<number>(model, `${this.backOfficeUrl}/allocateMoreSpace`);
  }
}
