import { Component, OnInit } from '@angular/core';
import { CardInfo, cardDetail } from './cards-detail/cards-detail';

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss']
})
export class ServicesSectionComponent implements OnInit {
  cardInfoList: CardInfo[];
  constructor() {
    this.cardInfoList = cardDetail;
  }

  ngOnInit() {}
}
