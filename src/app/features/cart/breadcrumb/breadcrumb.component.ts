import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() step: number = 1;

  ngOnInit(): void {
    console.log('BreadcrumbComponent initialized');
    console.log('Current step:', this.step);
  }
}
