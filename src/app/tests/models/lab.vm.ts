import { TestDayVm } from './testDayVm';

export interface LabVm {
  id: number;
  name: string;
  availableTestDays: TestDayVm[];
}
