import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {VehicleInfo} from "../models/vehicle-info.model";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private vehicle: VehicleInfo;

  constructor(private vehicleService: VehicleService) {}

  public ngOnInit() {
    this.vehicleService.currentVehicle().subscribe(x => this.vehicle = x);
  }

  public submit(): void{
    console.table(this.vehicle);
  }
}
