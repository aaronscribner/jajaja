import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() {}

  public async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }
}
