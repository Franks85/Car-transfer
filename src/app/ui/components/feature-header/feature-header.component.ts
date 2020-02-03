import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
