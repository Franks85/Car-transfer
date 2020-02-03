import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAuth = false;
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if(!!user) {
        this.isAuth = true;
      }
    });

  }
}
