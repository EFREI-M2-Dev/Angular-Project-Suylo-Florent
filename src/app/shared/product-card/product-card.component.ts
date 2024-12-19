import { Component, Input, Output } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: ProductModel = {} as ProductModel;
  @Input() onEdit!: () => void;
  @Input() canEdit!: boolean;

  handleEdit(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.onEdit) {
      this.onEdit();
    }
  }
}
