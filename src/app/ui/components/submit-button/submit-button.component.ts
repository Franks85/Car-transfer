import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {
  @Input() color = 'primary';
  @Input() disabled: boolean;
  constructor() { }

  ngOnInit() {
  }

}
