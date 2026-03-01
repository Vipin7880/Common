import { Component } from '@angular/core';

@Component({
  selector: 'app-quality',
  template: `
    <!-- ── Hero ── -->
    <section class="page-hero page-hero--quality">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Quality Assurance</span>
          <h1>Uncompromising<br>Standards</h1>
          <p class="lead">From farm to fork, we maintain the highest global food safety standards through rigorous testing and certified processes.</p>
        </div>
      </div>
    </section>

    <!-- ── Quality Commitment ── -->
    <section class="section-padding bg-cream">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <span class="section-badge">Commitment</span>
            <h2 class="section-title">The Foundation of Flavour</h2>
            <p class="section-description">
              Quality is not just a department at The Spice Factory — it's a culture. We are committed to delivering herbs and spices that are not only pure and potent but also safe and fully traceable.
            </p>
            <div class="feature-item d-flex align-items-start mb-4">
                <div class="feature-icon me-3 bg-white p-2 rounded-circle shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--sf-gold)" stroke-width="2" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                    <h5>Safety First</h5>
                    <p class="text-muted small mb-0">Every batch undergoes comprehensive microbiological and chemical analysis in our in-house laboratory.</p>
                </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="info-card p-4 bg-white rounded-4 shadow-soft border-0">
               <div class="row g-4">
                  <div class="col-6 col-md-4" *ngFor="let cert of certificates">
                      <div class="cert-card-mini text-center p-3 rounded-3 bg-cream bg-opacity-50">
                          <img [src]="cert.icon" [alt]="cert.name" width="32" height="32" class="mb-2 opacity-75">
                          <div class="small fw-bold">{{ cert.name }}</div>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Details ── -->
    <section class="section-padding">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4" *ngFor="let detail of details">
                    <div class="content-card">
                        <h3>{{ detail.title }}</h3>
                        <p>{{ detail.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ── Contact CTA ── -->
    <section class="section-padding bg-dark-light text-center">
      <div class="container">
        <h2 class="text-black mb-3">Questions about Quality?</h2>
        <p class="text-black-50 mb-4" style="max-width:600px; margin:0 auto;">Contact our quality assurance team for detailed specifications, certificates, and compliance information.</p>
        <a routerLink="/contact" class="btn-sf-primary">Contact Us</a>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class QualityComponent {
  certificates = [
    { name: 'BRC', icon: '/assets/images/icons/brc.svg' },
    { name: 'IFS', icon: '/assets/images/icons/ifs.svg' },
    { name: 'Bio', icon: '/assets/images/icons/bio.svg' },
    { name: 'FSSC', icon: '/assets/images/icons/fssc.svg' },
    { name: 'ISO', icon: '/assets/images/icons/iso.svg' },
    { name: 'Halal', icon: '/assets/images/icons/brc.svg' }
  ];

  details = [
    { title: 'In-house Lab', desc: 'Our state-of-the-art laboratory performs daily tests for microbiological parameters, moisture, and essential oil content.' },
    { title: 'Traceability', desc: 'Full forward and backward traceability for every ingredient, from the farm plot to the final consumer pack.' },
    { title: 'Innovation', desc: 'Continuous testing of new sourcing regions and processing methods to enhance spice potency and safety.' }
  ];
}
