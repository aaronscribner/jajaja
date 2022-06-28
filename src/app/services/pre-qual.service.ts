import {Injectable} from '@angular/core';
import {PreQualCalc} from '../models/pre-qual-calc.model';
import * as lendingCalcs from '../../assets/db/prequal-calc.json';
import {Observable, ReplaySubject} from 'rxjs';

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

  public submitPreQualification(payment: number, income: number): void {
    const customScore = income / payment * 100;
    this.tier.next(this.lendingCalcs.find(x => x.score.min <= customScore && x.score.max <= customScore).tier);

    this.status.next('Something Here');
  }
}
