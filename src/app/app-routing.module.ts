import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AssetsComponent } from './components/assets/assets.component';
import { ConsequencesComponent } from './components/consequences/consequences.component';
import { HelpSurveyComponent } from './components/help-survey/help-survey.component';
import { InfoComponent } from './components/info/info.component';
import { ReportComponent } from './components/report/report.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info'
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'survey',
        component: SurveyComponent
      },
      {
        path: 'help-survey',
        component: HelpSurveyComponent
      },
      {
        path: 'assets',
        component: AssetsComponent,
      },
      {
        path: 'consequences',
        component: ConsequencesComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
