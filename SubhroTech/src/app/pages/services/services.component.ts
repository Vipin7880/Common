import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  services = [
    {
      iconKey: 'web-dev',
      title: 'Website Development',
      desc: 'Custom, high-performance websites built with Angular, React, and modern frameworks.',
      features: ['Responsive Design', 'SEO Optimization', 'Fast Loading']
    },
    {
      iconKey: 'app-dev',
      title: 'App Development',
      desc: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['Flutter & React Native', 'User-Centric UI', 'Scalable Backend']
    },
    {
      iconKey: 'marketing',
      title: 'Digital Marketing',
      desc: 'Data-driven marketing strategies to grow your brand presence online.',
      features: ['Social Media Mgmt', 'PPC Campaigns', 'Content Strategy']
    },
    {
      iconKey: 'sys-management',
      title: 'Website Management',
      desc: 'Continuous support, updates, and maintenance for your web applications.',
      features: ['Security Updates', 'Performance Tuning', '24/7 Monitoring']
    },
    {
      iconKey: 'ui-ux',
      title: 'UI/UX Design',
      desc: 'Intuitive and engaging user experiences crafted by expert designers.',
      features: ['Wireframing', 'Prototyping', 'User Research']
    },
    {
      iconKey: 'ai-bot',
      title: 'AI Chatbot Development',
      desc: 'Smart, conversational AI bots that automate support and boost engagement.',
      features: ['Custom AI Models', 'Web & App Integration', 'NLP Processing']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
