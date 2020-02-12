import { Router } from '@angular/router';
import { Component, OnInit, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-feature-nav-btn',
  templateUrl: './feature-nav-btn.component.html',
  styleUrls: ['./feature-nav-btn.component.scss']
})
export class FeatureNavBtnComponent implements OnInit {
  @Input() btnText: string;
  @Input() feature: string;
  @Input() userId: string;
  @Input() color = 'primary';
  constructor(private router: Router) {}

  ngOnInit() {}

  onFeatureButtonClick(feature: string, userId: string) {
    return this.router.navigate(['dashboard', 'user', userId, feature]);
  }
}
