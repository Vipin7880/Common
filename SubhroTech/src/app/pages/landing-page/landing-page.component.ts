import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TechnicalMetric {
  value: string;
  label: string;
  detail: string;
}

interface Discipline {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  activeTab: 'overview' | 'stack' | 'benchmarks' = 'overview';

  readonly metrics: TechnicalMetric[] = [
    { value: '14+', label: 'Shipped Systems', detail: 'Production web platforms & mobile apps' },
    { value: '99.9%', label: 'Infrastructure Uptime', detail: 'SLA across managed cloud environments' },
    { value: '< 320ms', label: 'Median Latency', detail: 'Edge-cached TTFB across global routes' },
    { value: '100%', label: 'Type Safety', detail: 'Strict TypeScript & clean schema contracts' }
  ];

  readonly disciplines: Discipline[] = [
    {
      id: 'web-apps',
      title: 'High-Performance Web Platforms',
      category: 'Frontend Engineering',
      description: 'Single-page and server-rendered web applications engineered for speed, clean state management, and accessible user workflows.',
      stack: ['Angular 17', 'TypeScript', 'RxJS', 'SCSS Architecture']
    },
    {
      id: 'backend-cloud',
      title: 'Scalable Cloud Architecture & APIs',
      category: 'Backend & Infrastructure',
      description: 'Fault-tolerant backend services, REST/GraphQL endpoints, database design, and automated CI/CD deployment pipelines.',
      stack: ['Node.js', 'PostgreSQL', 'Docker', 'AWS / DigitalOcean']
    },
    {
      id: 'mobile-engineering',
      title: 'Cross-Platform Mobile Applications',
      category: 'Mobile Engineering',
      description: 'Native-feel iOS and Android applications with unified codebases, offline storage, and responsive gesture-driven interfaces.',
      stack: ['React Native / Flutter', 'Secure Storage', 'Push Notifications']
    },
    {
      id: 'ai-automation',
      title: 'Applied AI & Workflow Automations',
      category: 'AI & Data Systems',
      description: 'Practical, cost-effective LLM integrations, retrieval-augmented search, automated query handlers, and operational pipelines.',
      stack: ['Gemini / OpenAI API', 'Function Calling', 'Vector Pipelines']
    }
  ];

  setTab(tab: 'overview' | 'stack' | 'benchmarks') {
    this.activeTab = tab;
  }
}
