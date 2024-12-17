import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NewsletterComponent],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  exports: [HeaderComponent, FooterComponent, NewsletterComponent],
})
export class SharedModule {}
