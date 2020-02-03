import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  links = ['Products', 'Contacts', 'Privacy Policy'];
  socialIcons = [
    { name: 'facebook', tooltip: 'Facebook' },
    { name: 'linkedin', tooltip: 'Linkedin' },
    { name: 'twitter', tooltip: 'Twitter' },
    { name: 'github-circle', tooltip: 'Github' }
  ];
  constructor() {}

  ngOnInit() {}
}
