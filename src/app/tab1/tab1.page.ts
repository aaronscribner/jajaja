import { Component } from '@angular/core';
import {VehicleService} from '../services/vehicle.service';
import {Router} from '@angular/router';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    selectedImage: string;
    imageText: string;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
  ) {}

  public submit(): void {
    this.vehicleService.setCurrentVehicleByPlateNumber('RUBBLE');
    this.router.navigate(['/tabs/tab2']);
  }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Use Library',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          }, {
            text: 'Capture Image',
            handler: () => {
              this.getPicture(this.camera.PictureSourceType.CAMERA);
            }
          }, {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true
      }).then((imageData) => {
        this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      });
  }

  recognizeImage() {
    Tesseract.recognize(this.selectedImage).then(function(result) 
    {
        alert(result.data.text);
    })
  }
}
