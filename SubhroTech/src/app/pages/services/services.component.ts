import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services = [
    {
      title: 'Website Development',
      desc: 'Custom, high-performance websites built with Angular, React, and modern frameworks.',
      icon: 'bi-window-desktop',
      features: ['Responsive Design', 'SEO Optimization', 'Fast Loading']
    },
    {
      title: 'App Development',
      desc: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: 'bi-phone',
      features: ['Flutter & React Native', 'User-Centric UI', 'Scalable Backend']
    },
    {
      title: 'Digital Marketing',
      desc: 'Data-driven marketing strategies to grow your brand presence online.',
      icon: 'bi-megaphone',
      features: ['Social Media Mgmt', 'PPC Campaigns', 'Content Strategy']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
