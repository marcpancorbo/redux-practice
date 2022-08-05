import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule],
})
export class SharedModule {}
