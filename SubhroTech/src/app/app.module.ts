import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { FeatureCardComponent } from './shared/feature-card/feature-card.component';
import { Action } from 'rxjs/internal/scheduler/Action'; // clean up if accidentally added, otherwise just remove the MultiStep line below
import { PricingTableComponent } from './shared/pricing-table/pricing-table.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DomainDirectoryComponent } from './pages/domain-directory/domain-directory.component';
import { DomainDetailComponent } from './pages/domain-detail/domain-detail.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CountUpDirective } from './shared/directives/count-up.directive';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TermsComponent } from './pages/terms/terms.component';
import { RefundsComponent } from './pages/refunds/refunds.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HigherDurationFormComponent } from './shared/higher-duration-form/higher-duration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeatureCardComponent,
    PricingTableComponent,
    LandingPageComponent,
    DomainDirectoryComponent,
    DomainDetailComponent,
    VerificationComponent,
    ServicesComponent,
    AboutUsComponent,
    ContactUsComponent,
    CountUpDirective,
    PageNotFoundComponent,
    TermsComponent,
    RefundsComponent,
    PrivacyComponent,
    HigherDurationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
