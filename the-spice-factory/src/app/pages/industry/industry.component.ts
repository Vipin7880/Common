import { Component } from '@angular/core';

@Component({
  selector: 'app-industry',
  template: `
    <!-- ── Hero ── -->
    <section class="page-hero page-hero--industry">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Industry</span>
          <h1>Industrial<br>Solutions</h1>
          <p>Tailored herb and spice solutions for food manufacturers, co-packers, and industrial food processors.</p>
        </div>
      </div>
    </section>

    <!-- ── Industrial Solutions ── -->
    <section class="section-padding bg-sf-cream">
      <div class="container">
        <div class="section-header text-center mb-5">
          <span class="section-badge">Our Solutions</span>
          <h2 class="section-title">Industrial-Grade Quality</h2>
          <p class="section-subtitle">We provide high-quality herbs, spices, and custom blends to food industry clients, ensuring consistency, food safety, and supply reliability at scale.</p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let sol of solutions; let i = index">
            <div class="content-card" [style.animation-delay]="(i * 0.1) + 's'">
              <div class="card-icon-wrap mb-3">
                <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path [attr.d]="sol.icon"/></svg>
              </div>
              <h3>{{ sol.title }}</h3>
              <p>{{ sol.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Bespoke Blends ── -->
    <section class="section-padding bg-sf-white">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <span class="section-badge">Bespoke Solutions</span>
            <h2 class="section-title">Custom Blends & Formulations</h2>
            <p class="text-muted">Our team of experienced food technologists works closely with your R&D department to develop bespoke blends that match your exact specifications.</p>
            <p class="text-muted">Whether you need a specific flavour profile, texture, or particle size, we have the expertise and equipment to deliver.</p>
            <ul class="feature-list mt-4">
              <li>Dedicated R&D support for recipe development</li>
              <li>Pilot batch testing before full-scale production</li>
              <li>Consistent quality across large production runs</li>
              <li>Full traceability from raw material to finished product</li>
              <li>Competitive pricing for volume orders</li>
            </ul>
          </div>
          <div class="col-lg-6">
            <div class="process-flow">
              <div class="process-flow__step" *ngFor="let step of bespokeSteps; let i = index; let last = last">
                <div class="process-flow__num">{{ i + 1 }}</div>
                <div class="process-flow__content">
                  <h4>{{ step.title }}</h4>
                  <p>{{ step.desc }}</p>
                </div>
                <div class="process-flow__line" *ngIf="!last"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Certifications ── -->
    <section class="section-padding bg-sf-cream">
      <div class="container text-center">
        <span class="section-badge">Quality Assurance</span>
        <h2 class="section-title mb-5">Certified Excellence</h2>
        <div class="row g-4 justify-content-center">
          <div class="col-6 col-md-4 col-lg-2" *ngFor="let cert of certificates">
            <div class="cert-badge">
              <div class="cert-badge__icon">
                <img [src]="cert.icon" [alt]="cert.name" width="32" height="32">
              </div>
              <div class="cert-badge__name">{{ cert.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="section-padding bg-sf-dark text-center">
      <div class="container">
        <h2 class="text-white mb-3">Ready to Partner with Us?</h2>
        <p class="text-white-50 mb-4" style="max-width: 600px; margin: 0 auto;">Contact our industrial sales team for custom quotes, samples, and technical specifications.</p>
        <a routerLink="/contact" class="btn-sf-primary">Get in Touch</a>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class IndustryComponent {
  solutions = [
    { title: 'Bulk Supply', desc: 'Large-volume supply of individual herbs, spices, and seasonings in industrial packaging formats.', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z' },
    { title: 'Custom Blending', desc: 'Create your unique blends with our state-of-the-art blending facilities and expert formulation team.', icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' },
    { title: 'Co-Packing', desc: 'End-to-end co-packing services from formulation to finished product in your branded packaging.', icon: 'M18.36 9l.6 3H5.04l.6-3h12.72M20 4H4v2h16V4zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5z' },
    { title: 'Quality Testing', desc: 'In-house laboratory with comprehensive testing capabilities for microbiological, chemical, and physical parameters.', icon: 'M7 2v11h3v9l7-12h-4l4-8z' },
    { title: 'Product Development', desc: 'Collaborative R&D to innovate new products and flavour profiles tailored to market trends.', icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
    { title: 'Supply Chain', desc: 'Reliable supply chain management with flexible logistics and just-in-time delivery capabilities.', icon: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z' }
  ];

  bespokeSteps = [
    { title: 'Consultation', desc: 'Discuss your requirements, flavour profiles, and technical specifications.' },
    { title: 'Formulation', desc: 'Our food technologists develop and optimize the recipe.' },
    { title: 'Pilot Batch', desc: 'Small-scale test production for your approval and testing.' },
    { title: 'Production', desc: 'Full-scale manufacturing with consistent quality controls.' },
    { title: 'Delivery', desc: 'Timely delivery through our efficient logistics network.' }
  ];

  certificates = [
    { name: 'BRC Food Safety', icon: '/assets/images/icons/brc.svg' },
    { name: 'IFS Food', icon: '/assets/images/icons/ifs.svg' },
    { name: 'Bio Certified', icon: '/assets/images/icons/bio.svg' },
    { name: 'FSSC 22000', icon: '/assets/images/icons/fssc.svg' },
    { name: 'ISO 9001', icon: '/assets/images/icons/iso.svg' },
    { name: 'Halal', icon: '/assets/images/icons/brc.svg' } // Using BRC shield for Halal too as placeholder
  ];
}
