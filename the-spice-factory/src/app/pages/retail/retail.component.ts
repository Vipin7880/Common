import { Component } from '@angular/core';

@Component({
  selector: 'app-retail',
  template: `
    <!-- ── Hero ── -->
    <section class="page-hero page-hero--retail">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Our Brands</span>
          <h1>Premium Retail<br>Brands</h1>
          <p>Discover our range of premium consumer brands, trusted by top retail chains and millions of families worldwide.</p>
        </div>
      </div>
    </section>

    <!-- ── Alternating Brand Sections ── -->
    <div class="brands-wrapper bg-white section-padding">
      <div class="container">
        <div *ngFor="let brand of brands; let i = index">
          <div class="row align-items-center g-5 mb-4" [class.flex-row-reverse]="i % 2 !== 0">
            <div class="col-lg-6">
              <div class="brand-image-wrap p-5 bg-sf-cream rounded-2 text-center" style="min-height: 400px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,0,0,0.03);">
                <img [src]="brand.image" [alt]="brand.name" class="img-fluid" style="max-height: 300px; object-fit: contain;">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="brand-content" [class.ps-lg-5]="i % 2 === 0" [class.pe-lg-5]="i % 2 !== 0">
                <h2 class="font-condensed mb-3" style="font-size: 2.8rem;">{{ brand.name }}</h2>
                <div class="brand-divider mb-4" style="width: 40px; height: 3px; background: var(--sf-red);"></div>
                <p class="lead text-sf-grey mb-4" style="line-height: 1.8;">{{ brand.description }}</p>
                <div class="brand-actions d-flex gap-3">
                  <a *ngIf="brand.link" [href]="brand.link" target="_blank" class="btn-brand-outline">Visit Website</a>
                  <a routerLink="/contact" class="btn-brand-primary">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
          <!-- Divider between sections, but not after the last one -->
          <hr *ngIf="i < brands.length - 1" class="brand-section-divider">
        </div>
      </div>
    </div>

    <!-- ── Private Label CTA ── -->
    <section class="section-padding bg-sf-cream">
      <div class="container text-center">
        <span class="section-badge">Bespoke Production</span>
        <h2 class="font-condensed mb-4" style="font-size: 2.5rem;">Private Label Solutions</h2>
        <p class="mx-auto mb-5 text-sf-grey" style="max-width: 700px;">Looking for your own brand development? We offer full-service category management and bespoke spice formulations.</p>
        <a routerLink="/contact" class="btn-brand-primary">Learn More</a>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class RetailComponent {
  plSteps = [
    { title: 'Analysis', items: ['Category Insight', 'Competition', 'Packaging Trends', 'Price Benchmarking'] },
    { title: 'Recommendation', items: ['Optimal Assortment', 'Format Selection', 'Consumer Navigation'] },
    { title: 'Implementation', items: ['Project Date-plan', 'Logistics Setup', 'Initial Volume Mgmt'] },
    { title: 'Development', items: ['Business Reviews', 'Quarterly Growth', 'Ongoing Innovation'] }
  ];

  brands = [
    {
      name: 'Funky Soul Spices',
      description: 'A broad range of "flavour bombs" inspired by street food & international food trends. Our packaging stands out on any shelf with vibrant, modern designs that appeal to the adventurous home cook.',
      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=800',
      link: 'https://www.funkysoulspices.be'
    },
    {
      name: 'Piet Huysentruyt',
      description: "Chef Piet Huysentruyt's exclusive range of culinary blends, seasonings, and professional-grade bouillons. Developed in collaboration with the renowned chef to bring restaurant-quality depth to your kitchen.",
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      link: ''
    },
    {
      name: 'The Spice Factory',
      description: 'Our heritage brand covering all essential herbs, spices, and seasonings. Trusted by families since 1982, this range represents our core commitment to purity, potency, and uncompromising safety.',
      image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800',
      link: ''
    }
  ];

  regions = [
    { name: 'Belgium' }, { name: 'Netherlands' },
    { name: 'United Kingdom' }, { name: 'France' },
    { name: 'Germany' }, { name: 'Italy' },
    { name: 'Japan' }, { name: 'UAE' },
    { name: 'South Korea' }
  ];

  stats = [
    { value: '40+', label: 'Years Expertise' },
    { value: '100+', label: 'Retail Chains' },
    { value: '25+', label: 'Countries' },
    { value: '75M€', label: 'Turnover' }
  ];
}
