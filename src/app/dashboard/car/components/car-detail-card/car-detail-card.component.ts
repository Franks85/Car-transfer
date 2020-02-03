import { Car } from './../../../models/car.model';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-car-detail-card',
  templateUrl: './car-detail-card.component.html',
  styleUrls: ['./car-detail-card.component.scss']
})
export class CarDetailCardComponent implements OnInit {
  @Input() car$: Observable<Car>;
  @Output() carAdd = new Subject<void>();
  @Output() carDelete = new Subject<void>();
  @Output() carUpdate = new Subject<Car>();
  constructor() { }

  ngOnInit() {
  }

  onCarDelete() {
    this.carDelete.next();
  }

  onCarUpdate(car: Car) {
    this.carUpdate.next(car);
  }

  onCarAdd() {
    this.carAdd.next();
  }

}
