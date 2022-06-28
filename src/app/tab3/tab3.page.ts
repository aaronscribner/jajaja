import {Component, OnInit} from '@angular/core';
import {PreQualService} from '../services/pre-qual.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  private lendingTier: string;

  constructor(private preQualService: PreQualService) {}

  public ngOnInit(): void {
    this.preQualService.lendingTier().subscribe(x => this.lendingTier = x);
  }
}
