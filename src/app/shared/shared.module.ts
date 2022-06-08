import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatProgressBarModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class SharedModule { }
