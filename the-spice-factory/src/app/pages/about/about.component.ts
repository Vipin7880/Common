import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <!-- ── Hero ── -->
    <section class="page-hero page-hero--about">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">About Us</span>
          <h1>Mastering Herbs<br>& Spices Since 1982</h1>
          <p>The largest manufacturer of herbs and spices in Belgium, exporting flavour excellence to the world.</p>
        </div>
      </div>
    </section>

    <!-- ── History ── -->
    <section id="history" class="section-padding bg-cream">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <span class="section-badge">Our Story</span>
            <h2 class="section-title">A Journey of Flavour</h2>
            <p class="text-muted">Founded in 1982, The Spice Factory has grown from a small spice blending operation in Braine-l'Alleud, Belgium, into the country's largest herbs and spices manufacturer.</p>
            <p class="text-muted">Today, we realize the majority of our sales in Europe — Belgium, the Netherlands, the United Kingdom, and France — while also exporting our products to Japan, Dubai, South Korea, and beyond.</p>
            <p class="text-muted">With approximately 100 passionate employees and an annual turnover of around €75 million, we continue to drive innovation in the herbs and spices category.</p>
          </div>
          <div class="col-lg-6">
            <div class="timeline">
              <div class="timeline__item" *ngFor="let item of timeline">
                <div class="timeline__year">{{ item.year }}</div>
                <div class="timeline__content">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Our Team ── -->
    <section id="our-team" class="section-padding">
      <div class="container">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Our Team</span>
          <h2 class="section-title">Meet the Experts</h2>
          <p class="section-subtitle">An enthusiastic team of professionals is ready to help and advise you.</p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-lg-4" *ngFor="let member of team">
            <div class="team-card">
              <div class="team-card__image-wrap">
                <img [src]="member.image" [alt]="member.name" class="team-card__image">
              </div>
              <div class="team-card__content">
                <h3 class="team-card__name">{{ member.name }}</h3>
                <span class="team-card__role">{{ member.role }}</span>
                <div class="team-card__contact">
                  <a [href]="'mailto:' + member.email">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    {{ member.email }}
                  </a>
                  <a [href]="'tel:' + member.phone">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    {{ member.phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Activities ── -->
    <section id="activities" class="section-padding bg-cream">
      <div class="container">
        <div class="section-header text-center mb-5">
          <span class="section-badge">What We Do</span>
          <h2 class="section-title">Our Activities</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let activity of activities; let i = index">
            <div class="activity-card" [style.animation-delay]="(i * 0.1) + 's'">
              <div class="activity-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path [attr.d]="activity.icon"/></svg>
              </div>
              <h3 class="activity-card__title">{{ activity.title }}</h3>
              <p class="activity-card__desc">{{ activity.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Sustainability ── -->
    <section id="sustainability" class="section-padding bg-dark-light">
      <div class="container text-center">
        <span class="section-badge section-badge--light">Sustainability</span>
        <h2 class="section-title text-black">Committed to Our Planet</h2>
        <p class="text-black-50 mb-5" style="max-width: 700px; margin: 0 auto;">We are continuously working to reduce our environmental footprint while maintaining the highest quality standards.</p>
        <div class="row g-4 justify-content-center">
          <div class="col-md-4" *ngFor="let item of sustainability">
            <div class="sustain-card">
              <div class="sustain-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path [attr.d]="item.icon"/></svg>
              </div>
              <h4 class="sustain-card__title">{{ item.title }}</h4>
              <p class="sustain-card__desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>  
      </div>
    </section>

    <!-- ── Contact CTA ── -->
    <section class="section-padding bg-light text-center">
      <div class="container">
        <h2 class="text-black mb-3">Want to Learn More?</h2>
        <p class="text-black-50 mb-4" style="max-width:600px; margin:0 auto;">Contact us for more information about our history, our team, or our commitment to quality.</p>
        <a routerLink="/contact" class="btn-sf-primary">Get in Touch</a>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class AboutComponent {
  timeline = [
    { year: '1982', title: 'Foundation', desc: 'The Spice Factory was founded in Braine-l\'Alleud, Belgium.' },
    { year: '1990s', title: 'Growth', desc: 'Expanded operations across Belgium and into neighboring markets.' },
    { year: '2000s', title: 'European Expansion', desc: 'Became the largest herbs & spices manufacturer in Belgium.' },
    { year: '2010s', title: 'Global Reach', desc: 'Exports extended to Japan, Dubai, South Korea and beyond.' },
    { year: 'Today', title: '€75M Turnover', desc: '100+ passionate employees serving retailers worldwide.' }
  ];

  team = [
    { name: 'Philippe Gondry', role: 'Sales Director', email: 'pg@thespicefactory.com', phone: '0032 495 28 78 25', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Nicolas Ongaro', role: 'Sales Manager', email: 'non@thespicefactory.com', phone: '0032 473 85 96 83', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Chris Moores', role: 'Sales UK & Ireland', email: 'cm@thespicefactory.com', phone: '0044 7816 940902', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' }
  ];

  activities = [
    { title: 'Sourcing', desc: 'We source the finest raw materials from trusted suppliers worldwide, ensuring quality from origin.', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
    { title: 'Processing', desc: 'State-of-the-art processing facility with strict quality controls and food safety protocols.', icon: 'M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z' },
    { title: 'Blending', desc: 'Expert blending capabilities to create custom recipes and proprietary spice mixtures.', icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' },
    { title: 'Packaging', desc: 'Flexible packaging options from sachets to bulk containers, with private label capabilities.', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z' },
    { title: 'Quality Control', desc: 'Rigorous testing and quality assurance at every stage of production.', icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z' },
    { title: 'Logistics', desc: 'Efficient distribution network ensuring timely delivery to customers across Europe.', icon: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z' }
  ];

  sustainability = [
    { icon: 'M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z', title: 'Sustainable Sourcing', desc: 'Responsible sourcing practices that support local farming communities.' },
    { icon: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2v2h-2V9zm0 4h2v2h-2v-2z', title: 'Organic Range', desc: 'Growing portfolio of certified organic products for environmentally conscious consumers.' },
    { icon: 'M21 8V7l-3 2-2-6-2 6-3-2v1l3 2 2 6 2-6 3-2zM5 8V7l-3 2-2-6-2 6-3-2v1l3 2 2 6 2-6 3-2z', title: 'Eco Packaging', desc: 'Continuous innovation in sustainable packaging materials and reduced waste.' }
  ];
}
