import { Component, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'internship-portal';
  vantaEffect: any;

  ngOnInit() {
    this.vantaEffect = GLOBE({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xd4af37, /* Gold */
      color2: 0x93c5fd, /* Light Blue accents */
      backgroundColor: 0x001530, /* Very dark navy */
      size: 1.0,
      THREE: THREE
    });
  }

  ngOnDestroy() {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }
}
