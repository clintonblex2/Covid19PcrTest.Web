import { TestResultTypes } from './testResultTypes';

export interface TestResultVm {
  testLab: string;
  testLocation: string;
  patientName: string;
  testDate: Date;
  testResult: string;
  resultType: TestResultTypes;
  bookingReference: string;
}
