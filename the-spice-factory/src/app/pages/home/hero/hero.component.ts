import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  isVisible = false;

  ngOnInit(): void {
    setTimeout(() => this.isVisible = true, 200);
  }
}
