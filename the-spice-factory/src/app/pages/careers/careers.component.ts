import { Component } from '@angular/core';

@Component({
  selector: 'app-careers',
  styleUrls: ['../page-shared.scss'],
  template: `
    <!-- ── Hero ── -->
    <section class="page-hero page-hero--careers">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Join Our Team</span>
          <h1>A Career with<br>Flavour</h1>
          <p>Join a growing international market leader where entrepreneurship, innovation, and passion for quality define our success.</p>
        </div>
      </div>
    </section>

    <!-- ── Perks ── -->
    <section class="section-padding bg-sf-cream">
      <div class="container">
        <div class="section-header text-center mb-4">
          <span class="section-badge">Why Work With Us?</span>
          <h2 class="section-title">The Spice Factory Culture</h2>
        </div>
        <div class="row g-4">
          <div class="col-md-6 col-lg-3" *ngFor="let perk of perks">
            <div class="perk-card h-100">
              <div class="perk-card__icon-wrap">
                <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><path [attr.d]="perk.icon"/></svg>
              </div>
              <h4 class="perk-card__title">{{ perk.title }}</h4>
              <p class="perk-card__desc">{{ perk.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Open Positions ── -->
    <section class="section-padding bg-sf-white">
      <div class="container">
        <div class="section-header text-center mb-4">
          <span class="section-badge">Opportunities</span>
          <h2 class="section-title">Current Openings</h2>
        </div>

        <div class="job-list">
          <div class="job-card" *ngFor="let job of jobs">
            <div class="job-card__header" (click)="job.expanded = !job.expanded">
              <div class="job-card__info">
                <h3>{{ job.title }}</h3>
                <div class="job-card__meta">
                  <span>{{ job.location }}</span>
                  <span class="badge-type">{{ job.type }}</span>
                </div>
              </div>
              <div class="job-card__toggle" [class.active]="job.expanded">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
              </div>
            </div>
            
            <div class="job-card__body" *ngIf="job.expanded">
              <div class="row g-4">
                <div class="col-lg-8">
                  <h5>Responsibilities</h5>
                  <ul class="feature-list mb-4">
                    <li *ngFor="let r of job.responsibilities">{{ r }}</li>
                  </ul>
                  <h5>Your Profile</h5>
                  <ul class="feature-list">
                    <li *ngFor="let req of job.requirements">{{ req }}</li>
                  </ul>
                </div>
                <div class="col-lg-4">
                  <div class="job-card__cta text-lg-end">
                    <p class="mb-3">Interested in this position?</p>
                    <a href="#apply-form" (click)="selectJob(job.title)" class="btn-sf-primary btn-sm">Apply Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Application Form ── -->
    <section id="apply-form" class="section-padding bg-sf-cream">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="contact-card p-4 p-md-5">
              <div class="section-header text-center mb-4">
                <span class="section-badge">Get in Touch</span>
                <h2 class="section-title">Job Application</h2>
                <p>Submit your details and CV here, and our HR team will reach out to you.</p>
              </div>

              <div *ngIf="submitted" class="alert alert-success animate-fade-in text-center p-5">
                <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48" class="text-success mb-3"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <h3>Application Sent!</h3>
                <p>Thank you for your interest. We'll be in touch soon.</p>
                <button class="btn btn-outline-success mt-3" (click)="submitted = false">Send Another</button>
              </div>

              <form *ngIf="!submitted" (ngSubmit)="submitApplication()" class="contact-form">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-control" placeholder="Your Name" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" placeholder="your@email.com" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-control" placeholder="+32 ...">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Position of Interest</label>
                    <select class="form-select custom-select" [(ngModel)]="selectedJob" name="position">
                      <option value="">Spontaneous Application</option>
                      <option *ngFor="let job of jobs" [value]="job.title">{{ job.title }}</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Upload Resume/CV (PDF)</label>
                    <div class="file-upload-wrap">
                      <input type="file" id="resume" class="file-upload-input" accept='.pdf' (change)="onFileSelect($event)">
                      <label for="resume" class="file-upload-label">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>
                        <span>{{ fileName || 'Click to upload your CV' }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Message (Optional)</label>
                    <textarea class="form-control" rows="4" placeholder="Tell us a bit about yourself..."></textarea>
                  </div>
                  <div class="col-12 text-center mt-4">
                    <button type="submit" class="btn-sf-primary w-100 py-3">Submit Application</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .perk-card {
      background: #fff;
      padding: 30px;
      border-radius: 16px;
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid rgba(0,0,0,0.05);
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        border-color: var(--sf-gold);
      }
      
      &__icon-wrap {
        width: 64px;
        height: 64px;
        background: var(--sf-cream);
        color: var(--sf-gold);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
      }
      
      &__title { font-size: 1.1rem; margin-bottom: 10px; }
      &__desc { font-size: 0.9rem; color: #666; margin: 0; }
    }

    .job-list { display: flex; flex-direction: column; gap: 15px; }
    .job-card { 
      background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); overflow: hidden;
      &__header { padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; }
      &__header:hover { background: #fafafa; }
      &__info h3 { font-size: 1.25rem; margin: 0; }
      &__meta { display: flex; gap: 15px; color: #888; font-size: 0.85rem; margin-top: 5px; }
      .badge-type { color: var(--sf-red); font-weight: 600; text-transform: uppercase; }
      &__toggle { transition: transform 0.3s; color: #ccc; }
      &__toggle.active { transform: rotate(180deg); color: var(--sf-gold); }
      &__body { padding: 25px; border-top: 1px solid #eee; background: #fff; animation: slideDown 0.3s ease-out; }
    }

    .custom-select {
      border: 1px solid rgba(0,0,0,0.1); border-radius: 10px; padding: 12px 16px; 
      font-family: var(--font-body); font-size: 0.9rem; background: var(--sf-cream);
    }

    .file-upload-wrap {
      position: relative;
      .file-upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2; }
      .file-upload-label {
        display: flex; align-items: center; justify-content: center; gap: 10px;
        padding: 20px; border: 2px dashed #ddd; border-radius: 10px; background: #f9f9f9;
        color: #888; transition: all 0.3s;
        svg { color: var(--sf-gold); }
      }
      &:hover .file-upload-label { border-color: var(--sf-gold); background: #fff; }
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class CareersComponent {
  submitted = false;
  fileName = '';
  selectedJob = '';

  perks = [
    { title: 'International', desc: 'Work in a truly global environment with partners across continents.', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
    { title: 'Entrepreneurship', desc: 'We value individual initiative and the drive to take ownership of projects.', icon: 'M12 3c-4.97 0-9 4.03-9 9 0 3.11 1.58 5.8 4 7.41V21c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1.59c2.42-1.61 4-4.3 4-7.41 0-4.97-4.03-9-9-9zm1 14h-2v-1h2v1zm0-3h-2c0-3.36 2.5-3.5 2.5-5a1.5 1.5 0 0 0-3 0h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3.5 1.5-3.5 5z' },
    { title: 'Team Spirit', desc: 'Join a family of 100+ passionate people who help and advise each other.', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
    { title: 'Innovation', desc: 'A fast-growing market leader constantly launching new products and brands.', icon: 'M13.13 22.19L11.5 18.35L9.87 22.19L11.5 20.21L13.13 22.19M13 14.25V11.25H10V14.25H13M14.5 9.75V7H8.5V9.75H14.5M16 11.25L13 17.25L10 11.25H16M11.5 2L15.34 5.84L11.5 4.38L7.66 5.84L11.5 2Z' }
  ];

  jobs = [
    {
      title: 'Sales Project Coordinator', location: 'Braine-l\'Alleud, Belgium', type: 'Full-time', expanded: false,
      responsibilities: ['Coordinate Private Label projects', 'Liaise with international distributors', 'Follow up on internal range production', 'Administrative account support'],
      requirements: ['Enthusiastic personality', 'Rigorous administrative skills', 'Fluent in French & English', 'FMCG experience is a plus']
    },
    {
      title: 'Supply Chain Officer', location: 'Braine-l\'Alleud, Belgium', type: 'Full-time', expanded: false,
      responsibilities: ['Procurement management', 'Logistics planning', 'ERP stock monitoring', 'Subcontractor coordination'],
      requirements: ['Bachelor/Master degree', 'Solution-oriented mindset', 'Fluent in French & English', 'Excel & ERP proficiency']
    }
  ];

  selectJob(title: string) {
    this.selectedJob = title;
  }

  onFileSelect(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (file) {
      this.fileName = file.name;
    }
  }

  submitApplication() {
    this.submitted = true;
    setTimeout(() => {
      // Logic for actual submission can be added here
    }, 2000);
  }
}
