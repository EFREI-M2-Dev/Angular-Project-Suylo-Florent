import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() type: 'text' | 'email' | 'password' = 'text'; // Le type de champ
  @Input() placeholder: string = ''; // Le placeholder
}
