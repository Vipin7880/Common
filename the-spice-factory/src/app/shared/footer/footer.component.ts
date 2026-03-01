import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'Retail', route: '/retail' },
    { label: 'Professional', route: '/professional' },
    { label: 'Industry', route: '/industry' },
    { label: 'Quality', route: '/quality' },
    { label: 'Careers', route: '/careers' },
    { label: 'Contact', route: '/contact' }
  ];
}
