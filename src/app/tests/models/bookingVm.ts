import { BookingStatus } from './bookingStatus';
import { TestResultVm } from './testResultVm';

export interface BookingVm {
  bookingReference: string;
  testDate: Date;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  vaccineType: string;
  testLab: string;
  age: number;
  testLocation: string;
  bookingStatus: string;
  testResult: TestResultVm;
}
