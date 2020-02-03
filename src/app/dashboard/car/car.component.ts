import { CarFormComponent } from './components/car-form/car-form.component';
import { AuthService } from './../../core/services/auth.service';
import { NotificationService } from './../../ui/services/notification.service';
import { DialogService } from './../../ui/services/dialog.service';
import { CarStorageService } from './../services/car/car-storage.service';
import { CarService } from './../services/car/car.service';
import { Car } from './../models/car.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  car$: Observable<Car>;
  userId: string;
  error: string = null;
  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private carStorageService: CarStorageService,
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.user.value.id;
    this.car$ = this.carStorageService.fetchCar(this.userId);
  }

  onCarAdd() {
    this.carService.inizializedFormGroup();
    this.dialog.open(CarFormComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: { editMode: false, id: this.userId }
    });
  }

  onCarDelete() {
    this.dialogService
      .openConfirmDialog('Sei sicuro di eliminare questa auto?')
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.carStorageService.deleteCar(this.userId).then(
            () => {
              this.notificationService.warn('Auto eliminata correttamente!');
            },
            errMsg => {
              this.error = errMsg;
            }
          );
        }
      });
  }

  onCarUpdate(car: Car) {
    const { casa, modello, targa, anno } = car;
    this.carService.populateForm({ casa, modello, targa, anno });
    this.dialog.open(CarFormComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: { car, editMode: true, id: this.userId }
    });
  }
}
