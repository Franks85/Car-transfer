import { Subject } from 'rxjs';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-feature-actions',
  templateUrl: './feature-actions.component.html',
  styleUrls: ['./feature-actions.component.scss']
})
export class FeatureActionsComponent implements OnInit {
  @Input() selectOptions: string[];
  @Input() selectPlaceholder: string;
  @Input() actBtnText: string;
  @Output() newTableCreate = new Subject<void>();
  @Output() optSelected = new Subject<string>();
  constructor() {}

  onNewTableCreate() {
    this.newTableCreate.next();
  }

  onOptSelect(opt: string) {
    this.optSelected.next(opt);
  }

  ngOnInit() {}
}
