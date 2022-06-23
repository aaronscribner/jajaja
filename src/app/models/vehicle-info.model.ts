import {Registrant} from './registrant.model';

export class VehicleInfo{
  public id: string;
  public plateNumber: string;
  public make: string;
  public model: string;
  public year: string;
  public vin: string;
  public payoff: string;
  public registrant: Registrant;
}
