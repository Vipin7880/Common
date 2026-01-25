import { Component, OnInit } from '@angular/core';

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  filterCategory: 'web' | 'marketing' | 'events';
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  filter: string = 'all';

  projects: PortfolioItem[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'assets/images/portfolio/web-dev-1.png',
      filterCategory: 'web'
    },
    {
      id: 2,
      title: 'Brand Launch',
      category: 'Digital Marketing',
      image: 'assets/images/portfolio/marketing-1.png',
      filterCategory: 'marketing'
    },
    {
      id: 3,
      title: 'Tech Summit 2025',
      category: 'Event Management',
      image: 'assets/images/portfolio/events-1.png',
      filterCategory: 'events'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get filteredProjects(): PortfolioItem[] {
    if (this.filter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.filterCategory === this.filter);
  }
}
