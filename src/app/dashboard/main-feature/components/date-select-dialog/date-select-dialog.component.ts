import { DayInfo, DataDialog } from './../../../models/main.models';
import { NotificationService } from './../../../../ui/services/notification.service';
import { FeatureStorageService } from './../../../services/main-feature/feature-storage.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import { FeatureService } from 'src/app/dashboard/services/main-feature/feature.service';

@Component({
  selector: 'app-date-select-dialog',
  templateUrl: './date-select-dialog.component.html',
  styleUrls: ['./date-select-dialog.component.scss']
})
export class DateSelectDialogComponent implements OnInit {
  error: string = null;
  dateSelected: string;
  editMode = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
    public dialogRef: MatDialogRef<DateSelectDialogComponent>,
    public featureService: FeatureService,
    private featureStorageSvc: FeatureStorageService,
    private notificationSvc: NotificationService
  ) {}
  ngOnInit() {
    this.dateSelected = moment(this.data.selectedDate).format(
      'dddd, D MMMM YYYY'
    );
    if (this.featureService.availableDateEdit.value) {
      this.editMode = true;
      const oldValues = this.data.savedDatesInfo.filter(
        d => moment.unix(d.timestamp).toString() === this.data.selectedDate.toString()
      )[0];
      this.featureService.userOptKey.next(oldValues.key)
      this.featureService.populateForm(oldValues);
    }
  }

  onSubmit() {
    if (this.featureService.form.valid) {
      const { id, selectedDate } = this.data;
      const dayInfo: DayInfo = this.featureService.form.value;
      const userOpt = this.featureService.createObjToDb(selectedDate, dayInfo);
      if (this.editMode) {
        const key = this.featureService.userOptKey.value;
        this.featureStorageSvc.updateDates(userOpt, id, key).then(
          () => {
            this.notificationSvc.success('Modifiche salvate!');
            this.onDialogClose();
          },
          errMsg => {
            this.error = errMsg;
          }
        );
      } else {
        this.featureStorageSvc.saveDates(userOpt, id).then(
          () => {
            this.notificationSvc.success('Dati salvati!');
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
    this.featureService.availableDateEdit.next(false);
    this.featureService.form.reset();
    this.dialogRef.close();
  }

  onCancel() {
    this.featureService.form.reset();
  }
}
