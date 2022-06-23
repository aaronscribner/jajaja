import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../services/vehicle.service";
import {VehicleInfo} from "../models/vehicle-info.model";
import {PreQualService} from "../services/pre-qual.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private vehicle: VehicleInfo;

  constructor(
    private vehicleService: VehicleService,
    private prequalService: PreQualService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.vehicleService.currentVehicle().subscribe(x => this.vehicle = x);
  }

  public submit(): void{
    this.prequalService.submitPreQualification(100, 7000);
    this.router.navigate(['/tabs/tab3']);
  }
}
