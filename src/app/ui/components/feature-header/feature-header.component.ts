import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { FeatureService } from 'src/app/dashboard/services/main-feature/feature.service';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hideBackBtn = false;
  userId: string;
  constructor(
    private authService: AuthService,
    private mainFeatureSvc: FeatureService
  ) {}

  ngOnInit() {
    this.userId = this.authService.user.value.id;
  }

  onBackClick() {
    this.mainFeatureSvc.navigateToFeature('main', this.userId);
  }
}
