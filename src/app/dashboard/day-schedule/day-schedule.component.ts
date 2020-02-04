import { RateStorageService } from './../services/rate-cards/rate-storage.service';
import { DaySaveFormComponent } from './components/day-save-form/day-save-form.component';
import { compareArrays } from './../utils/utility';
import { emptyDayTable } from './util/day-new-table';
import { NotificationService } from './../../ui/services/notification.service';
import { DialogService } from './../../ui/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RateService } from './../services/rate-cards/rate.service';
import { DayStorageService } from './../services/day-schedule/day-storage.service';
import { DayService } from './../services/day-schedule/day.service';
import { AuthService } from './../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { DayTable, Day } from './../models/day-schedule.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnInit, OnDestroy {
  userId: string;
  error: string = null;
  dayList: DayTable[];
  daysSub$: Subscription;
  rateSub$: Subscription;
  rateNames: string[] = [];
  noRateSaved = false;
  tableName = '';
  editMode = false;
  dataSource: MatTableDataSource<Day> = null;
  displayedColumns: string[] = ['hour', 'active', 'tarif'];
  constructor(
    private authService: AuthService,
    public dayService: DayService,
    private dayStorageService: DayStorageService,
    public rateService: RateService,
    private rateStorageService: RateStorageService,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    this.dayService.initializeTableForm();
    this.userId = this.authService.user.value.id;
    this.rateSub$ = this.rateStorageService
      .fetchRates(this.userId)
      .subscribe(rate => {
        if (rate.length) {
          this.rateNames = rate.map(r => r.name);
        }  else {
          this.noRateSaved = true;
        }
      });
    this.daysSub$ = this.dayStorageService.fetchDays(this.userId).subscribe(
      day => {
        if (day.length) {
          this.dayList = day;
          const dayNameList = day.map(d => d.name);
          this.dayService.dayNameList.next(dayNameList);
        }
      },
      err => {
        this.error = err;
      }
    );
  }

  onDayScheduleCreate() {
    this.dayService.tableForm.reset();
    this.dayService.initializeTableForm();
    this.editMode = false;
    this.tableName = 'Nuovo: Orari / giornata';
    this.dataSource = new MatTableDataSource<Day>(emptyDayTable);
    this.dayService.setTableFormRows(emptyDayTable);
  }

  onTariffPageClick() {
    this.router.navigate(['dashboard', 'user', this.userId, 'rates']);
  }

  onDaySave() {
    this.dayService.validatorMatchOnActiveStatus(this.dayService.tableForm);
    this.dayService.tableForm.updateValueAndValidity();
    if (this.dayService.tableForm.valid) {
      const currentFormArray: Day[] = this.dayService.tableForm.value.rows;
      const newDayArray = emptyDayTable.map((d, i) => {
        const hour = d.hour;
        const values = currentFormArray[i];
        return { hour, ...values };
      });
      if (this.editMode) {
        const dayToDb: DayTable = this.dayService.dayToDbCreate(
          newDayArray,
          this.tableName
        );
        this.dialogService
          .openConfirmDialog('Salvare le modifiche?')
          .afterClosed()
          .subscribe(res => {
            if (res) {
              const daySelected = this.dayList.filter(
                d => d.name === this.tableName
              );
              const itemKey = daySelected.map(d => d.key)[0];
              const daySelectedValues = daySelected.map(d => d.value);
              const isdayEqual = compareArrays(
                newDayArray,
                daySelectedValues[0]
              );
              if (isdayEqual) {
                this.notificationService.warn(
                  `Nessuna modifica applicata alla giornata: ${this.tableName}`
                );
              } else {
                this.dayStorageService
                  .updateDay(dayToDb, this.userId, itemKey)
                  .then(
                    () => {
                      this.notificationService.success(
                        'Modifiche salvate correttamente!'
                      );
                    },
                    errMsg => {
                      this.error = errMsg;
                    }
                  );
              }
            }
          });
      } else {
        const daysName = this.dayService.dayNameList.value;
        this.dialog.open(DaySaveFormComponent, {
          disableClose: true,
          autoFocus: true,
          width: '400px',
          data: {
            newDay: newDayArray,
            names: daysName,
            id: this.userId
          }
        });
        this.dataSource = null;
        this.tableName = '';
      }
    }
  }

  onDaySelect(opt: string) {
    this.dayService.initializeTableForm();
    this.editMode = true;
    this.tableName = opt;
    const daySelected = this.dayList.filter(t => t.name === opt);
    const daySelectedValues = daySelected.map(t => t.value);
    // change property order
    const dayDataTable: Day[] = daySelectedValues[0].map((i: Day) => {
      return { hour: i.hour, active: i.active, tarif: i.tarif };
    });
    this.dataSource = new MatTableDataSource<Day>(dayDataTable);
    this.dayService.setTableFormRows(dayDataTable);
  }

  ngOnDestroy() {
    this.daysSub$.unsubscribe();
    this.rateSub$.unsubscribe();
  }
}
