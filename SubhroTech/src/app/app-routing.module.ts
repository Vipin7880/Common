import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Subhro Tech | Software Engineering & Web Architecture Studio',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'services',
    title: 'Engineering Capabilities & Technical Services | Subhro Tech',
    loadComponent: () =>
      import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'about',
    title: 'About the Studio | Subhro Tech Engineering Practice',
    loadComponent: () =>
      import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'contact',
    title: 'Contact Subhro Tech | Initiate Technical Consultation & Project Inquiry',
    loadComponent: () =>
      import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent)
  },
  {
    path: 'terms',
    title: 'Terms of Service | Subhro Tech Software Engagements',
    loadComponent: () =>
      import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'refunds',
    title: 'Billing & Refund Policy | Subhro Tech Commercial Terms',
    loadComponent: () =>
      import('./pages/refunds/refunds.component').then(m => m.RefundsComponent)
  },
  {
    path: 'privacy',
    title: 'Privacy Policy & Data Security | Subhro Tech',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: '**',
    title: '404 - Page Not Found | Subhro Tech',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
