import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarInterceptor } from '@shared/interceptors/progress-bar/progress-bar.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SharedModule } from './shared/shared.module';
import { SurveyComponent } from './components/survey/survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsSurveyComponent } from './components/survey/is-survey/is-survey.component';
import { IspdnSurveyComponent } from './components/survey/ispdn-survey/ispdn-survey.component';
import { CommonSurveyComponent } from './components/survey/common-survey/common-survey.component';
import { NgxsModule } from '@ngxs/store';
import { ProgressBarState } from '@shared/store/progress-bar';
import { SurveyState } from './store/survey';
import { HelpSurveyComponent } from './components/help-survey/help-survey.component';
import { IspdnHelpSurveyComponent } from './components/help-survey/ispdn-help-survey/ispdn-help-survey.component';
import { GisHelpSurveyComponent } from './components/help-survey/gis-help-survey/gis-help-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    SurveyComponent,
    IsSurveyComponent,
    IspdnSurveyComponent,
    CommonSurveyComponent,
    HelpSurveyComponent,
    IspdnHelpSurveyComponent,
    GisHelpSurveyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxsModule.forRoot([
      ProgressBarState,
      SurveyState
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProgressBarInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
