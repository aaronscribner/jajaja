import {Injectable} from '@angular/core';
import {VehicleInfo} from '../models/vehicle-info.model';
import {Observable, ReplaySubject} from 'rxjs';
import * as vehicleData from '../../assets/db/vehicles.json';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private currentVehicle$: ReplaySubject<VehicleInfo> = new ReplaySubject<VehicleInfo | null>();
  private vehicles: VehicleInfo[];

  constructor() {
    this.vehicles = (vehicleData as any).default;
    console.table(this.vehicles);
  }

  public setCurrentVehicleByPlateNumber(plateNumber: string): void {
    const vehicle = this.vehicles.find(x => x.plateNumber === plateNumber);
    console.log(plateNumber);
    this.currentVehicle$.next(vehicle);
  }

  public setCurrentVehicleByVin(vin: string): void {
    this.currentVehicle$.next(this.vehicles.find(x => x.vin === vin));
  }

  public currentVehicle(): Observable<VehicleInfo> {
    return this.currentVehicle$;
  }
}
