import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  clientCount: number = 0;
  partnerCount: number = 0;
  projectCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.clientCount = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    this.partnerCount = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
    this.projectCount = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
  }

}
