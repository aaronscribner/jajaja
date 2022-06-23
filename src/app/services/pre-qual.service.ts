import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrequalService {
  private lendingTier: string;

  constructor() {
  }

  public submitPreQualification(payment: number, income: number, mileage: number) {

  }
}
