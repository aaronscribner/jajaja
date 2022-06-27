import { Component } from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {Router} from '@angular/router';
import {PhotoService} from '../services/photo.service';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Tesseract } from 'tesseract.ts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public faCamera = faCamera;
  private selectedImage: string;
  public LicensePlate:string = "";
  public VIN:string = "";

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
    this.photoService.takePhoto().then((imageData) => {
        this.recognizePhoto( `data:image/jpeg;base64,${imageData.base64String}`, "LicensePlate");
    });
  }

  public takeVinPhoto() {
    // TODO: OCR the VIN, update the form
    this.photoService.takePhoto().then((imageData) => {        
        this.recognizePhoto( `data:image/jpeg;base64,${imageData.base64String}`, "VIN");
    });
  }

  public recognizePhoto(photo, fieldType) {
     Tesseract.recognize(photo).then((result) => {
        if(fieldType === "LicensePlate")
        {
            this.LicensePlate = result.text;
        }
        else
        {
            this.VIN = result.text;
        }
     });
   }
}
