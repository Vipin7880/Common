import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-policy',
  template: `
    <section class="page-hero page-hero--terms">
      <div class="container position-relative">
        <div class="page-hero__content">
          <span class="page-hero__badge">Legal</span>
          <h1>Cookie Policy</h1>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="legal-content">
          <h2>What Are Cookies?</h2>
          <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience by remembering your preferences and understanding how you interact with our site.</p>

          <h2>How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>

          <h3>Essential Cookies</h3>
          <p>These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas. The website cannot function properly without these cookies.</p>

          <h3>Analytical Cookies</h3>
          <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your browsing experience.</p>

          <h3>Functional Cookies</h3>
          <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>

          <h2>Managing Cookies</h2>
          <p>You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience and some features of our website may no longer be fully accessible.</p>

          <h3>How to Control Cookies</h3>
          <p>Most browsers allow you to:</p>
          <ul class="feature-list">
            <li>View what cookies are stored and delete them individually</li>
            <li>Block third-party cookies</li>
            <li>Block all cookies from specific sites</li>
            <li>Block all cookies from being set</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>Some cookies are placed by third-party services that appear on our pages. We do not control the dissemination of these cookies. You should check the relevant third party's website for more information about these cookies.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We encourage you to review this page periodically.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about our use of cookies, please contact us at:</p>
          <p><strong>The Spice Factory NV/SA</strong><br>Avenue de l'Industrie, 20<br>1420 Braine-l'Alleud, Belgium<br>Email: <a href="mailto:sales@thespicefactory.com">sales&#64;thespicefactory.com</a></p>

          <div class="legal-footer mt-5">
            <p class="text-muted">Last updated: January 2026</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../page-shared.scss']
})
export class CookiePolicyComponent { }
