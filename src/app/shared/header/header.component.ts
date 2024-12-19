import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  cartItems: number = 0;
  private addToCartListener = () => {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isUserConnected() {
    return this.authService.isUserConnected();
  }

  updateCartItems() {
    this.cartService
      .getCountCartItems(this.authService.getSavedUser()!)
      .subscribe((count) => {
        this.cartItems = count;
      });
  }

  ngOnInit(): void {
    this.updateCartItems();

    this.addToCartListener = () => {
      this.updateCartItems();
    };

    document.addEventListener('addToCart', this.addToCartListener);
  }

  ngOnDestroy() {
    document.removeEventListener('addToCart', this.addToCartListener);
  }
}
