import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhilosophyComponent } from './components/philosophy/philosophy.component';
import { TeamComponent } from './components/team/team.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { AboutComponent } from './components/about/about.component';
import { MissionComponent } from './components/mission/mission.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'philosophy', component: PhilosophyComponent },
  { path: 'team', component: TeamComponent },
  { path: 'marketing', component: MarketingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'mission', component: MissionComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' }
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
