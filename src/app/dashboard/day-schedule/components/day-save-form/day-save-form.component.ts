import { NotificationService } from './../../../../ui/services/notification.service';
import { DayStorageService } from './../../../services/day-schedule/day-storage.service';
import { DayService } from './../../../services/day-schedule/day.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-day-save-form',
  templateUrl: './day-save-form.component.html',
  styleUrls: ['./day-save-form.component.scss']
})
export class DaySaveFormComponent implements OnInit {
  error: string = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DaySaveFormComponent>,
    public dayService: DayService,
    private dayStorageService: DayStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    const name = this.dayService.saveForm.value.name;
    const { newDay, names, id } = this.data;
    const dayToDb = this.dayService.dayToDbCreate(newDay, name);
    if (this.dayService.saveForm.valid) {
      if (names.indexOf(name) !== -1) {
        this.error = 'Esiste già una giornata/orari con questo nome';
      } else {
        this.dayStorageService
          .saveDay(dayToDb, id)
          .then(
            () => {
              this.notificationService.success('Giornata salvata!');
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
    this.dayService.saveForm.reset();
    this.dialogRef.close();
  }
}
