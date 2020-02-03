import { ConfirmDialogComponent } from './../components/confirm-dialog/confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
   return this.dialog.open(ConfirmDialogComponent, {
      width: '340px',
      disableClose: true,
      data: {
        message: msg
      },
      position: {top: '30px'}
    });
  }
}

