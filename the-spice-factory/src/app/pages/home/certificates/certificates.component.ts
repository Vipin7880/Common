import { Component } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  certificates = [
    { name: 'BRC Food Safety', icon: '/assets/images/icons/brc.svg' },
    { name: 'IFS Food', icon: '/assets/images/icons/ifs.svg' },
    { name: 'Bio Certified', icon: '/assets/images/icons/bio.svg' },
    { name: 'FSSC 22000', icon: '/assets/images/icons/fssc.svg' },
    { name: 'ISO 9001', icon: '/assets/images/icons/iso.svg' }
  ];
}
