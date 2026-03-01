import { Component } from '@angular/core';

@Component({
  selector: 'app-professional',
  template: `
    <!-- ── Hero ── -->
    <section class="page-hero page-hero--professional">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Professional</span>
          <h1>Professional<br>Solutions</h1>
          <p>A comprehensive range of premium herbs, spices, blends and specialties for the foodservice and HORECA industry.</p>
        </div>
      </div>
    </section>

    <!-- ── ISFI Assortment ── -->
    <section id="isfi-assortment" class="section-padding bg-cream">
      <div class="container">
        <div class="section-header text-center mb-5">
          <span class="section-badge">The Spice Factory Assortment</span>
          <h2 class="section-title">Complete Product Range</h2>
          <p class="section-subtitle">Discover our extensive assortment of premium products, carefully sourced and processed to deliver consistent quality and flavour.</p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let cat of categories; let i = index">
            <div class="category-card" [style.animation-delay]="(i * 0.1) + 's'">
              <div class="category-card__icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path [attr.d]="cat.icon"/></svg>
              </div>
              <h3 class="category-card__title">{{ cat.name }}</h3>
              <p class="category-card__desc">{{ cat.description }}</p>
              <a *ngIf="cat.catalogUrl" [href]="cat.catalogUrl" target="_blank" class="category-card__link">
                View Catalog
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Oscar Tausig ── -->
    <section id="oscar-tausig" class="section-padding">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <span class="section-badge">Heritage Brand</span>
            <h2 class="section-title">Oscar Tausig</h2>
            <p class="text-muted">A heritage brand with decades of tradition in the professional foodservice sector. Oscar Tausig represents quality, consistency, and authentic flavour profiles trusted by chefs and food professionals across Europe.</p>
            <ul class="feature-list mt-4">
              <li>Full range of professional-grade herbs and spices</li>
              <li>Available in bulk and foodservice packaging</li>
              <li>Consistent quality batch after batch</li>
              <li>Tailored solutions for HORECA customers</li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="info-card-grid">
              <div class="info-card" *ngFor="let info of proFeatures">
                <div class="info-card__icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path [attr.d]="info.icon"/></svg>
                </div>
                <h4 class="info-card__title">{{ info.title }}</h4>
                <p class="info-card__desc">{{ info.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Contact CTA ── -->
    <section class="section-padding bg-dark-light text-center">
      <div class="container">
        <h2 class="text-white mb-3">Need the Full Product Range?</h2>
        <p class="text-white-50 mb-4" style="max-width:600px; margin:0 auto;">Contact us for the complete catalog, pricing information, and bespoke solutions tailored to your business needs.</p>
        <a routerLink="/contact" class="btn-sf-primary">Contact Us</a>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class ProfessionalComponent {
  categories = [
    {
      name: 'Herbs',
      description: 'A wide selection of dried herbs including basil, oregano, thyme, rosemary, and many more. Perfect for culinary professionals.',
      icon: 'M17 8C8 10 5.9 16.09 3.82 18.18 3.41 18.59 3.41 19.24 3.82 19.66l.35.35c.39.39 1.04.39 1.41 0 2.09-2.09 8.18-4.19 10.18-5.35-1 4.99-3.81 9.14-4 9.34-.41.41-.41 1.04 0 1.41l.35.35c.39.39 1.04.39 1.41 0 .2-.19 4.35-3 9.34-4-1.16 2-3.26 8.09-5.35 10.18-.39.39-.39 1.04 0 1.41l.35.35c.39.39 1.04.39 1.41 0C11.91 18.1 14 10 16 1l1 1z',
      catalogUrl: 'https://www.thespicefactory.com/wp-content/uploads/2019/05/Herbs.pdf'
    },
    {
      name: 'Spices',
      description: 'Premium whole and ground spices sourced from the finest origins worldwide. Cumin, paprika, turmeric, cinnamon, and more.',
      icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
      catalogUrl: 'https://www.thespicefactory.com/wp-content/uploads/2019/05/Spices.pdf'
    },
    {
      name: 'Blends',
      description: 'Expert-crafted spice blends for every cuisine. From classic BBQ rubs to exotic curry mixes, our blends deliver consistent flavour.',
      icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 12.5c-3.03 0-5.5-2.47-5.5-5.5S8.97 5.5 12 5.5s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5zm0-9C9.79 7.5 8 9.29 8 11.5s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z',
      catalogUrl: 'https://www.thespicefactory.com/wp-content/uploads/2019/05/Mixes.pdf'
    },
    {
      name: 'Specialties',
      description: 'Unique specialty products including bouillons, marinades, and seasonal items. Elevate your cuisine with our distinctive offerings.',
      icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
      catalogUrl: 'https://www.thespicefactory.com/wp-content/uploads/2019/05/Specialities.pdf'
    },
    {
      name: 'Salt & Pepper',
      description: 'The foundation of every kitchen. Premium salt varieties and pepper from around the world, available in multiple grinds and formats.',
      icon: 'M13.5 2v4H16l-3 4.5V14h2l-4 6v-5H9l3-4.5V7h-2.5L13.5 2z',
      catalogUrl: 'https://www.thespicefactory.com/wp-content/uploads/2019/05/Salt-and-Pepper.pdf'
    },
    {
      name: 'Organic',
      description: 'Certified organic herbs and spices for the health-conscious consumer. Full traceability from farm to table.',
      icon: 'M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zm0 0c-4.97 0-9-4.03-9-9 4.97 0 9 4.03 9 9zm-2-15c0 3-2 5-2 5h4s-2-2-2-5z',
      catalogUrl: 'https://www.thespicefactory.com/wp-content/uploads/2019/05/BIO.pdf'
    }
  ];

  proFeatures = [
    { title: 'Custom Formats', desc: 'From sachets to bulk containers, we offer flexible packaging options.', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z' },
    { title: 'Quality Assured', desc: 'BRC, IFS, FSSC 22000 certified production.', icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z' },
    { title: 'Fast Delivery', desc: 'Efficient logistics network across Europe.', icon: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z' },
    { title: 'Expert Advice', desc: 'Our team of spice experts is ready to assist you.', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' }
  ];
}
