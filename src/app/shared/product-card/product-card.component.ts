import { Component, Input, Output } from '@angular/core';
import { ProductModel } from '../models/product.model';
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: ProductModel = {} as ProductModel;
  @Input() onEdit!: () => void;
  @Input() canEdit!: boolean;

  constructor(private cartService: CartService) {
  }

  handleEdit(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.onEdit) {
      this.onEdit();
    }
  }

  addToCart(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product).subscribe(
      (response) => {
        console.log('Produit ajouté au panier', response);
        document.dispatchEvent(new Event('addToCart'));
      },
      (error) => {
        console.error("Erreur lors de l'ajout au panier", error);
      }
    );
  }
}
