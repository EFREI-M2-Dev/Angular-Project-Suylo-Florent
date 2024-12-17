import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId?: string;
  totalWithoutVAT: number = 0;
  vat: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getSavedUserId() || undefined;
    if (this.userId) {
      this.loadCart();
    } else {
      alert('Veuillez vous connecter pour accéder à votre panier.');
    }
  }

  loadCart(): void {
    this.cartService.getCartByUser(this.userId!).subscribe((items) => {
      const productIds = items.map((item) => item.productId);

      this.cartService.getProductDetails(productIds).subscribe((products) => {
        this.cartItems = items.map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }));
        this.calculateTotal();
      });
    });
  }

  updateQuantity(itemId: string, newQuantity: number): void {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this.cartService
        .updateCartItem(itemId, newQuantity, item.productId, this.userId!)
        .subscribe(() => {
          this.calculateTotal();
          this.loadCart();
        });
    }
  }

  removeFromCart(id: string): void {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.loadCart();
    });
  }

  calculateTotal() {
    console.log('Cart Items:', this.cartItems);

    const totalWithoutVAT = this.cartItems.reduce((sum, item) => {
      const priceString = item.product?.price;
      const quantity = parseInt(item.quantity);

      if (typeof priceString === 'string' && priceString) {
        const price = parseFloat(priceString);

        if (!isNaN(price) && typeof quantity === 'number' && !isNaN(quantity)) {
          return sum + price * quantity;
        } else {
          console.warn('Prix ou quantité invalides:', price, quantity);
          return sum;
        }
      }

      return sum;
    }, 0);

    const vat = totalWithoutVAT * 0.2;
    const total = totalWithoutVAT + vat;

    const roundedTotalWithoutVAT = parseFloat(totalWithoutVAT.toFixed(2));
    const roundedVat = parseFloat(vat.toFixed(2));
    const roundedTotal = parseFloat(total.toFixed(2));

    this.totalWithoutVAT = roundedTotalWithoutVAT;
    this.vat = roundedVat;
    this.total = roundedTotal;
  }
}
