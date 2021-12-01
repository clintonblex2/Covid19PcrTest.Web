import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LabVm } from '../models/lab.vm';
import { LocationVm } from '../models/locationVm';
import { TestDayVm } from '../models/testDayVm';
import { VaccineTypesVm } from '../models/vaccineTypesVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/scheduleTest.html',
})
export class ScheduleTestComponent implements OnInit {
  form: FormGroup;
  locations: LocationVm[] = [];
  labs: LabVm[] = [];
  testDays: TestDayVm[] = [];
  testTypes: VaccineTypesVm[] = [];
  date = new Date();
  constructor(private testService: TestService, private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      appointmentDayId: new FormControl('', [Validators.required]),
      vaccineTypeId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      labId: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.testService.getLabLocationsAndTestDays().subscribe((res) => {
      this.locations = res.result;
    });
    this.testService.getVaccineTypes().subscribe((res) => {
      this.testTypes = res.result;
    });
  }
  getLabs() {
    let locationId = +this.form.get('locationId')?.value;
    let location = this.locations.find((x) => x.id === locationId);
    this.labs = location.availableTestLabs;
  }
  getTestDays() {
    let labId = +this.form.get('labId')?.value;
    let lab = this.labs.find((x) => x.id === labId);
    this.testDays = lab.availableTestDays;
  }
  scheduleTest() {
    // console.log('DateOFBrith', this.date);
    // this.form.get('dateOfBirth').setValue(this.date);
    this.testService.scheduleTest(this.form.value).subscribe((res) => {
      this.router.navigate(['../test/bookings']);
    });
  }
}
