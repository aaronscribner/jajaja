import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Tesseract } from 'tesseract.ts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public faCamera = faCamera;
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private photoService: PhotoService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      plate: [''],
      vin: ['']
    });
  }

  public submit(): void {
    this.vehicleService.setCurrentVehicleByPlateNumber('RUBBLE');
    this.router.navigate(['/tabs/tab2']);
  }

  public takeLicensePlatePhoto(): void {
    this.photoService.takePhoto().then((imageData) => {
      this.ocr(`data:image/jpeg;base64,${imageData.base64String}`).then((data: string) => {
        this.vehicleService.setCurrentVehicleByPlateNumber(data);
        this.formGroup.get('plate').setValue(data);
      });
    });
  }

  public takeVinPhoto(): void {
    this.photoService.takePhoto().then((imageData) => {
      this.ocr(`data:image/jpeg;base64,${imageData.base64String}`).then((data: string) => {
        this.vehicleService.setCurrentVehicleByVin(data);
        this.formGroup.get('vin').setValue(data);
      });
    });
  }

  public ocr(photo: any): Promise<string> {
    return new Promise(resolve => {
      Tesseract.recognize(photo).then((result: Tesseract.Page) => {
        return new Promise(ocrResolve => resolve(result.text));
      });
    });
  }
}
