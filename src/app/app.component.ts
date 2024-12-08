import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <ng-container *ngIf="!shouldHideHeader">
      <app-header></app-header>
    </ng-container>
    <router-outlet></router-outlet>
    <ng-container *ngIf="!shouldHideHeader">
      <app-footer></app-footer>
    </ng-container>
  `,
})
export class AppComponent {
  title = 'final-project';

  constructor(private router: Router) {}

  get shouldHideHeader(): boolean {
    const hiddenRoutes = ['/auth/login', '/auth/register'];
    return hiddenRoutes.includes(this.router.url);
  }
}
