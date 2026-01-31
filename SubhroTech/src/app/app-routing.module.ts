import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DomainDirectoryComponent } from './pages/domain-directory/domain-directory.component';
import { DomainDetailComponent } from './pages/domain-detail/domain-detail.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TermsComponent } from './pages/terms/terms.component';
import { RefundsComponent } from './pages/refunds/refunds.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'domains', component: DomainDirectoryComponent },
  { path: 'internship/:id', component: DomainDetailComponent },
  { path: 'verify', component: VerificationComponent },
  { path: 'verify/:id', component: VerificationComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'refunds', component: RefundsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
