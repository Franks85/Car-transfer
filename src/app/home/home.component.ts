import { AuthService } from './../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Auto transfer';
  subTitle = 'Noleggio auto con conducente';
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }

  onCallToAction() {
    this.router.navigate(['dashboard', ])
  }

}
