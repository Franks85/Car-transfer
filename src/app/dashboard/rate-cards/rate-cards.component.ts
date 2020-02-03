import { RateSaveFormComponent } from './components/rate-save-form/rate-save-form.component';
import { compareArrays } from './../utils/utility';
import { emptyRateList } from './util/table-start';
import { NotificationService } from './../../ui/services/notification.service';
import { DialogService } from './../../ui/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { RateService } from './../services/rate-cards/rate.service';
import { RateStorageService } from './../services/rate-cards/rate-storage.service';
import { AuthService } from './../../core/services/auth.service';
import { RateTable, Rate } from './../models/rates.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-rate-cards',
  templateUrl: './rate-cards.component.html',
  styleUrls: ['./rate-cards.component.scss']
})
export class RateCardsComponent implements OnInit, OnDestroy {
  userId: string;
  error: string = null;
  tableName = '';
  editMode = false;
  rateNames = [];
  rateListSub$: Subscription;
  rateList: RateTable[];
  displayedColumns: string[] = ['km', 'euro', 'active'];
  dataSource: MatTableDataSource<Rate>;
  constructor(
    private authService: AuthService,
    private rateStorageService: RateStorageService,
    public rateService: RateService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.rateService.initializeTableForm();
    this.userId = this.authService.user.value.id;
    this.rateListSub$ = this.rateStorageService
      .fetchRates(this.userId)
      .subscribe(
        rate => {
          if (rate.length) {
            this.rateList = rate;
            const rateNameList = rate.map(t => t.name);
            this.rateNames = rateNameList;
          }
        },
        err => {
          this.error = err;
        }
      );
  }

  onRateSelect(opt: string) {
    this.rateService.initializeTableForm();
    this.editMode = true;
    this.tableName = opt;
    const rateSelected = this.rateList.filter(r => r.name === opt);
    const rateSelectedValues = rateSelected.map(r => r.value);
    // change property order
    const rateDataTable: Rate[] = rateSelectedValues[0].map((i: Rate) => {
      return { km: i.km, euro: i.euro, active: i.active };
    });
    this.dataSource = new MatTableDataSource<Rate>(rateDataTable);
    this.rateService.setTableFormRows(rateDataTable);
  }

  onRateSave() {
    this.rateService.validatorMatchOnActiveStatus(this.rateService.tableForm);
    this.rateService.tableForm.updateValueAndValidity();
    if (this.rateService.tableForm.valid) {
      const currentFormArray: Rate[] = this.rateService.tableForm.value.rows;
      const newRateArray: Rate[] = emptyRateList.map((el, i) => {
        const km = el.km;
        const values = currentFormArray[i];
        return { km, ...values };
      });

      if (this.editMode) {
        this.dialogService
          .openConfirmDialog('Salvare le modifiche?')
          .afterClosed()
          .subscribe(res => {
            if (res) {
              const rateSelected = this.rateList.filter(
                r => r.name === this.tableName
              );
              const itemKey = rateSelected.map(r => r.key)[0];
              const rateToDb: RateTable = this.rateService.rateToDbCreate(
                newRateArray,
                this.tableName
              );
              const rateSelectedValues = rateSelected.map(t => t.value);
              const isRateEqual = compareArrays(
                newRateArray,
                rateSelectedValues[0]
              );
              if (isRateEqual) {
                this.notificationService.warn(
                  `Nessuna modifica applicata al tariffario: ${this.tableName}`
                );
              } else {
                this.rateStorageService
                  .updateRate(rateToDb, this.userId, itemKey)
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
        this.dialog.open(RateSaveFormComponent, {
          disableClose: true,
          autoFocus: true,
          width: '400px',
          data: {
            newRate: newRateArray,
            names: this.rateNames,
            id: this.userId
          }
        });
        this.dataSource = null;
        this.tableName = '';
      }
    }
  }

  onNewTarifCreate() {
    this.rateService.tableForm.reset();
    this.rateService.initializeTableForm();
    this.dataSource = null;
    this.editMode = false;
    this.tableName = 'Nuovo tariffario';
    this.rateService.setTableFormRows(emptyRateList);
    this.dataSource = new MatTableDataSource<Rate>(emptyRateList);
  }

  ngOnDestroy() {
    this.rateListSub$.unsubscribe();
  }
}
