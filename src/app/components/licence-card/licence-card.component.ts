import {Component, Input} from '@angular/core';
import {LicenceModel} from "../../shared/models/licence.model";

@Component({
  selector: 'app-licence-card',
  templateUrl: './licence-card.component.html',
  styleUrls: ['./licence-card.component.scss']
})
export class LicenceCardComponent {
  @Input() licence: LicenceModel = {} as LicenceModel;

  constructor() { }
}
