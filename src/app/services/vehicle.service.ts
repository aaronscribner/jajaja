import {Injectable} from '@angular/core';
import {VehicleInfo} from '../models/vehicle-info.model';
import * as vehicleData from '../../assets/db/vehicles.json';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private currentVehicle$: ReplaySubject<VehicleInfo> = new ReplaySubject<VehicleInfo | null>();
  private vehicles: VehicleInfo[];

  constructor() {
    this.vehicles = (vehicleData as any).default;
  }

  public get vehicle(): Observable<VehicleInfo> {
    return this.currentVehicle$;
  }

  public setCurrentVehicleByPlateNumber(plateNumber: string): void {
    const vehicle = this.vehicles.find(x => x.plateNumber === plateNumber);
    this.currentVehicle$.next(vehicle);
  }

  public setCurrentVehicleByVin(vin: string): void {
    console.log(vin);
    const vehicle = this.vehicles.find(x => x.vin === vin);
    this.currentVehicle$.next(vehicle);
  }
}
