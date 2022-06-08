import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'survey'
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'survey',
        component: SurveyComponent
      }
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
