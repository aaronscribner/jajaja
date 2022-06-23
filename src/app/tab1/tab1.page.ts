import { Component } from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  public submit(): void {
    this.vehicleService.setCurrentVehicleByPlateNumber('RUBBLE');
    this.router.navigate(['/tabs/tab2']);
  }
}
