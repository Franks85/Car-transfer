import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-raised-btn',
  templateUrl: './raised-btn.component.html',
  styleUrls: ['./raised-btn.component.scss']
})
export class RaisedBtnComponent implements OnInit {
  @Input() color = 'primary';
  constructor() { }

  ngOnInit() {
  }

}
