import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string = '1';
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartByUser(this.userId).subscribe((items) => {
      this.cartItems = items;
    });
  }

  addToCart(productId: string, quantity: number): void {
    this.cartService
      .addToCart(this.userId, productId, quantity)
      .subscribe(() => {
        this.loadCart();
      });
  }

  removeFromCart(id: string): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.loadCart();
    });
  }
}
