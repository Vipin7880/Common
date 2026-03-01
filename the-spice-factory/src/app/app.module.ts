import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Home & Sub-components
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/home/hero/hero.component';
import { SegmentsComponent } from './pages/home/segments/segments.component';
import { CertificatesComponent } from './pages/home/certificates/certificates.component';
import { ContactStripComponent } from './pages/home/contact-strip/contact-strip.component';

// Pages
import { RetailComponent } from './pages/retail/retail.component';
import { ProfessionalComponent } from './pages/professional/professional.component';
import { IndustryComponent } from './pages/industry/industry.component';
import { AboutComponent } from './pages/about/about.component';
import { QualityComponent } from './pages/quality/quality.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';

import { TermsComponent } from './pages/terms/terms.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    SegmentsComponent,
    CertificatesComponent,
    ContactStripComponent,
    RetailComponent,
    ProfessionalComponent,
    IndustryComponent,
    AboutComponent,
    QualityComponent,
    CareersComponent,
    ContactComponent,
    TermsComponent,
    CookiePolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
