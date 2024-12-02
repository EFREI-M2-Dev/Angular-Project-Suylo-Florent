import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
  ],
  exports: [HomepageComponent],
})
export class FeaturesModule {}
