import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {PreQualService} from '../services/pre-qual.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  public lendingTier$: Observable<string>;
  public qualificationStatus$: Observable<string>;

  constructor(private preQualService: PreQualService) {
  }

  public ngOnInit(): void {
    this.lendingTier$ = this.preQualService.lendingTier$;
    this.qualificationStatus$ = this.preQualService.qualificationStatus$;
  }
}
