import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export interface Domain {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  tools: string[];
  roadmap: { phase: string; title: string; desc: string }[];
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InternshipService {

  private domains: Domain[] = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Master full-stack development with Angular, Node.js, and modern web technologies.',
      icon: 'bi-window-stack',
      image: 'assets/domain-images/web-dev.png',
      tags: ['Frontend', 'Backend', 'Full Stack'],
      tools: ['VS Code', 'Git', 'Angular', 'Node.js', 'MongoDB'],
      roadmap: [
        { phase: 'Phase 1', title: 'Frontend Fundamentals', desc: 'HTML, CSS, JavaScript, and basic Angular components.' },
        { phase: 'Phase 2', title: 'API Integration', desc: 'Connecting to backend APIs, handling data, and state management.' },
        { phase: 'Phase 3', title: 'Full Stack Project', desc: 'Building a complete application with authentication and database.' }
      ]
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Analyze data, build models, and generate insights using Python and Machine Learning.',
      icon: 'bi-graph-up-arrow',
      image: 'assets/domain-images/data-science.png',
      tags: ['Python', 'ML', 'Analytics'],
      tools: ['Jupyter', 'Pandas', 'Scikit-learn', 'TensorFlow'],
      roadmap: [
        { phase: 'Phase 1', title: 'Python Basics', desc: 'Data structures, libraries, and basic scripting.' },
        { phase: 'Phase 2', title: 'Data Analysis', desc: 'Exploratory data analysis using Pandas and Matplotlib.' },
        { phase: 'Phase 3', title: 'ML Models', desc: 'Building and deploying machine learning models.' }
      ]
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'Design intuitive user interfaces and craft compelling user experiences.',
      icon: 'bi-palette',
      image: 'assets/domain-images/ui-ux.png',
      tags: ['Design', 'Figma', 'Prototyping'],
      tools: ['Figma', 'Adobe XD', 'Sketch'],
      roadmap: [
        { phase: 'Phase 1', title: 'Design Principles', desc: 'Color theory, typography, and layout fundamentals.' },
        { phase: 'Phase 2', title: 'Prototyping', desc: 'Creating low and high fidelity wireframes and user flows.' },
        { phase: 'Phase 3', title: 'Design System', desc: 'Building a comprehensive design system for a product.' }
      ]
    }
    // {
    //   id: 'artificial-intelligence',
    //   title: 'Artificial Intelligence',
    //   description: 'Explore the frontiers of AI, Neural Networks, and Generative models.',
    //   icon: 'bi-cpu',
    //   tags: ['AI', 'Deep Learning', 'NLP'],
    //   tools: ['Python', 'PyTorch', 'Hugging Face'],
    //   roadmap: [
    //     { phase: 'Phase 1', title: 'AI Concepts', desc: 'Understanding neural networks and basic algorithms.' },
    //     { phase: 'Phase 2', title: 'NLP & Vision', desc: 'Working with text and image data.' },
    //     { phase: 'Phase 3', title: 'Generative AI', desc: 'Fine-tuning LLMs and building AI applications.' }
    //   ]
    // },
    ,
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Learn SEO, Social Media strategies, and content marketing to drive growth.',
      icon: 'bi-megaphone',
      image: 'assets/domain-images/digital-marketing.png',
      tags: ['SEO', 'Content', 'Social'],
      tools: ['Google Analytics', 'Canva', 'Semrush'],
      roadmap: [
        { phase: 'Phase 1', title: 'SEO Basics', desc: 'Keyword research and on-page optimization.' },
        { phase: 'Phase 2', title: 'Content Strategy', desc: 'Creating engaging content for social media.' },
        { phase: 'Phase 3', title: 'Campaign Management', desc: 'Running and analyzing ad campaigns.' }
      ]
    }
  ];

  constructor() { }

  getDomains(): Observable<Domain[]> {
    return of(this.domains);
  }

  getDomainById(id: string): Observable<Domain | undefined> {
    return of(this.domains.find(d => d.id === id));
  }
}
