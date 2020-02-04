import { BehaviorSubject } from 'rxjs';
import { Day, DayTable } from './../../models/day-schedule.model';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  tableForm: FormGroup;
  dayNameList = new BehaviorSubject<string[]>([]);
  constructor(private fb: FormBuilder) {}

  saveForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  initializeTableForm() {
    this.tableForm = this.fb.group({
      rows: this.fb.array([])
    });
  }

  validatorMatchOnActiveStatus(group: FormGroup): any {
    if (group) {
      group.value.rows.forEach((row: Day) => {
        if (row.active && !row.tarif.length) {
          this.tableForm.get('rows').setErrors({ noTarifSelectedOnActive: true });
        }
        if (!row.active && row.tarif.length) {
          this.tableForm.get('rows').setErrors({ noActiveOnTarifSelect: true });
        }
      });
    }
    return null;
  }

  setTableFormRows(data: Day[]) {
    const rowsCtrl = this.tableForm.get('rows') as FormArray;
    data.forEach(row => {
      rowsCtrl.push(this.createTableFormGroup(row));
    });
  }

  createTableFormGroup(row: Day): FormGroup {
    return this.fb.group({ active: [row.active], tarif: [row.tarif] });
  }

  dayToDbCreate(data: Day[], name: string): DayTable {
    return { name, value: data };
  }
}
