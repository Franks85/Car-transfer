import { RateTable, Rate } from './../../models/rates.model';
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
export class RateService {
  tableForm: FormGroup;
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
      group.value.rows.forEach((row: Rate) => {
        if (row.active && row.euro === 0) {
          this.tableForm.get('rows').setErrors({ noEuroSetOnActive: true });
        }
        if (!row.active && row.euro !== 0) {
          this.tableForm.get('rows').setErrors({ noActiveOnEuroSet: true });
        }
      });
    }
    return null;
  }

  setTableFormRows(data: Rate[]) {
    const rowsCtrl = this.tableForm.get('rows') as FormArray;
    data.forEach(row => {
      rowsCtrl.push(this.createTableFormGroup(row));
    });
  }

  createTableFormGroup(row: Rate): FormGroup {
    return this.fb.group({ euro: [row.euro], active: [row.active] });
  }

  rateToDbCreate(data: Rate[], name: string): RateTable {
    return { name, value: data };
  }
}

