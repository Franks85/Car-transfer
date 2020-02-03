import { NotificationService } from './../../../../ui/services/notification.service';
import { CarStorageService } from './../../../services/car/car-storage.service';
import { CarService } from './../../../services/car/car.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { manufactererOpts, carModelOpts, carsYearOpts } from './car-select-opts';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  manufacterer: string[];
  carModel: string[];
  carsYear: string[];
  error: string = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public carService: CarService,
    private carStoreService: CarStorageService,
    public dialogRef: MatDialogRef<CarFormComponent>,
    private notificationService: NotificationService
  ) {
    this.manufacterer = manufactererOpts;
    this.carModel = carModelOpts;
    this.carsYear = carsYearOpts;
  }

  ngOnInit() {}

  onSubmit() {
    if (this.carService.form.valid) {
      const car = this.carService.form.value;
      if (
        this.data.editMode &&
        this.carService.checkFormValuesChanges(this.data.car, car)
      ) {
        this.notificationService.warn('Nessuna modifica applicata!');
        this.onDialogClose();
      } else {
        this.carStoreService.saveCar(car, this.data.id).then(
          () => {
            this.notificationService.success('Auto salvata!');
            this.onDialogClose();
          },
          errMsg => {
            this.error = errMsg;
          }
        );
      }
    }
  }

  onDialogClose() {
    this.carService.form.reset();
    this.carService.inizializedFormGroup();
    this.dialogRef.close();
  }

  onCancel() {
    this.carService.form.reset();
  }
}
