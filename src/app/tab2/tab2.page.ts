import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { VehicleInfo } from '../models/vehicle-info.model';
import { PreQualService } from '../services/pre-qual.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private preQualService: PreQualService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      income: ['', Validators.required],
      payment: ['', Validators.required],
      payoff: ['', Validators.required]
    });
    console.log('init tab2');

    this.vehicleService.vehicle.subscribe((vehicleInfo: VehicleInfo) => {
      console.log(vehicleInfo);
      this.populateVehicleData(vehicleInfo);
    });
  }

  public submit(): void{
    this.preQualService.submitPreQualification(100, 7000);
    this.router.navigate(['/tabs/tab3']);
  }

  private populateVehicleData(vehicleInfo: VehicleInfo): void {
    this.formGroup.get('name').setValue(vehicleInfo?.registrant?.name);
    this.formGroup.get('address').setValue(vehicleInfo?.registrant?.address);
    this.formGroup.get('payoff').setValue(vehicleInfo?.payoff);
  }
}
