import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <section class="page-hero page-hero--contact">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Get in Touch</span>
          <h1>Contact</h1>
          <p>Have a question or want to discuss a project? We'd love to hear from you.</p>
        </div>
      </div>
    </section>
    <section class="section"><div class="container">
      <div class="row g-5">
        <div class="col-lg-5">
          <h2>Contact Information</h2>
          <div class="section-divider" style="margin:0 0 30px"></div>
          <div class="contact-info-block">
            <div class="contact-info-item">
              <h5>Address</h5>
              <p>Avenue de l'Industrie, 20<br>1420 Braine-l'Alleud<br>Belgium</p>
            </div>
            <div class="contact-info-item">
              <h5>Email</h5>
              <p><a href="mailto:sales@thespicefactory.com">sales&#64;thespicefactory.com</a></p>
            </div>
            <div class="contact-info-item">
              <h5>Phone</h5>
              <p><a href="tel:+3223894770">+32 2 389 47 70</a></p>
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="content-card">
            <h3>Send us a Message</h3>
            <form class="contact-form">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" placeholder="Your first name">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" placeholder="Your last name">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" placeholder="you@example.com">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Phone</label>
                  <input type="tel" class="form-control" placeholder="+32 ...">
                </div>
                <div class="col-12">
                  <label class="form-label">Subject</label>
                  <input type="text" class="form-control" placeholder="How can we help?">
                </div>
                <div class="col-12">
                  <label class="form-label">Message</label>
                  <textarea class="form-control" rows="5" placeholder="Tell us about your project..."></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn-sf-primary">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div></section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class ContactComponent { }
