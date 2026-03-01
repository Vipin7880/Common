import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RetailComponent } from './pages/retail/retail.component';
import { ProfessionalComponent } from './pages/professional/professional.component';
import { IndustryComponent } from './pages/industry/industry.component';
import { AboutComponent } from './pages/about/about.component';
import { QualityComponent } from './pages/quality/quality.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'retail', component: RetailComponent },
  { path: 'professional', component: ProfessionalComponent },
  { path: 'industry', component: IndustryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'quality', component: QualityComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'cookie-policy', component: CookiePolicyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
