import {Injectable} from '@angular/core';
import {PreQualCalc} from '../models/pre-qual-calc.model';
import * as lendingCalcs from '../../assets/db/prequal-calc.json';
import {Observable, ReplaySubject} from 'rxjs';
import { VehicleInfo } from '../models/vehicle-info.model';

@Injectable({
  providedIn: 'root'
})
export class PreQualService {
  private tier: ReplaySubject<string> = new ReplaySubject<string>();
  private status: ReplaySubject<string> = new ReplaySubject<string>();
  private lendingCalcs: PreQualCalc[];

  constructor() {
    this.lendingCalcs = (lendingCalcs as any).default;
  }

  public get lendingTier$(): Observable<string> {
    return this.tier;
  }

  public get qualificationStatus$(): Observable<string> {
    return this.status;
  }

  public submitPreQualification(income: number, payment: number, vehicleData: VehicleInfo): void {
    const customScore = Math.floor(Math.random() * (400-210) + 210);
    const lendingCalculation = this.lendingCalcs.find(x => x.score.min <= customScore && x.score.max >= customScore);
    this.tier.next(lendingCalculation.tier);
    const paymentToIncome = payment / income * 100;
    const loanToValue =  vehicleData.payoff / vehicleData.value * 100;
    const approvedOrDeclined = paymentToIncome <= lendingCalculation.ptiLimit && loanToValue <= lendingCalculation.ltvLimit;
    this.status.next(approvedOrDeclined? 'Approved' : 'Declined');
  }
}
