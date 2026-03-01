import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PhilosophyComponent } from './components/philosophy/philosophy.component';
import { TeamComponent } from './components/team/team.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { AboutComponent } from './components/about/about.component';
import { MissionComponent } from './components/mission/mission.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhilosophyComponent,
    TeamComponent,
    MarketingComponent,
    AboutComponent,
    MissionComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
