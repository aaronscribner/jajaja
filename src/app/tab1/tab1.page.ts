import { Component } from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {Router} from '@angular/router';
import {PhotoService} from '../services/photo.service';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public faCamera = faCamera;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private photoService: PhotoService
  ) {}

  public submit(): void {
    this.vehicleService.setCurrentVehicleByPlateNumber('RUBBLE');
    this.router.navigate(['/tabs/tab2']);
  }

  public takeLicensePlatePhoto() {
    // TODO: OCR the plate, update the form
    this.photoService.takePhoto();
  }

  public takeVinPhoto() {
    // TODO: OCR the VIN, update the form
    this.photoService.takePhoto();
  }
}
