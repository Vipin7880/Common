import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss']
})
export class FeatureCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = 'bi-code-slash'; // Default icon
  @Input() image: string | undefined;
  @Input() link: string = '';
  @Input() queryParams: any = {};
  @Input() linkText: string = 'Learn More';
  @Input() tags: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
