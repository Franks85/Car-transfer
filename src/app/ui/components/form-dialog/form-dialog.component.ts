import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  @Input() headerText: string;
  constructor() {}

  ngOnInit() {}
}

