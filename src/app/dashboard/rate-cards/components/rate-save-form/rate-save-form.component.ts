import { NotificationService } from './../../../../ui/services/notification.service';
import { RateStorageService } from './../../../services/rate-cards/rate-storage.service';
import { RateService } from './../../../services/rate-cards/rate.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-rate-save-form',
  templateUrl: './rate-save-form.component.html',
  styleUrls: ['./rate-save-form.component.scss']
})
export class RateSaveFormComponent implements OnInit {
  error: string = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<RateSaveFormComponent>,
    public rateService: RateService,
    private rateStorageService: RateStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  onSubmit() {
    const name = this.rateService.saveForm.value.name;
    const { newRate, names, id } = this.data;
    const rateToDb = this.rateService.rateToDbCreate(newRate, name);
    if (this.rateService.saveForm.valid) {
      if (names.indexOf(name) !== -1) {
        this.error = 'Esiste già un tariffario con questo nome';
      } else {
        this.rateStorageService
          .saveRate(rateToDb, id)
          .then(
            () => {
              this.notificationService.success('Tariffario salvato!');
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
    this.rateService.saveForm.reset();
    this.dialogRef.close();
  }
}
