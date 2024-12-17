import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import { ProductModel } from 'src/app/shared/models/product.model';
import { environment } from 'src/env/env';
import { UserService } from './user.service';
import {CartModel} from "../../shared/models/cart.model";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  addToCart(product: ProductModel) {
    const cartItem = {
      productId: product.id,
      userId: this.userService.getSavedUserId()!,
      quantity: 1,
    };
    return this.http.post(`${this.apiUrl}/cart`, cartItem);
  }

  getCartByUser(userId: string): Observable<CartModel[]> {
    return this.http.get<CartModel[]>(`${this.apiUrl}/cart?userId=${userId}`);
  }

  getCountCartItems(userId: string): Observable<number> {
    return this.getCartByUser(userId).pipe(
      map(cartItems => cartItems.reduce((total, item) => total + +item.quantity, 0))
    );
  }
  getProductDetails(productIds: string[]): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/products?id=${productIds.join('&id=')}`
    );
  }

  updateCartItem(
    id: string,
    quantity: number,
    productId: string,
    userId: string
  ): Observable<any> {
    const updatedItem = {
      id: id,
      productId: productId,
      userId: userId,
      quantity: quantity,
    };
    document.dispatchEvent(new Event('addToCart'));
    return this.http.put<any>(`${this.apiUrl}/cart/${id}`, updatedItem);
  }

  removeFromCart(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cart/${id}`);
  }

  resetCart(): Observable<any> {
    const userId = this.userService.getSavedUserId();

    return this.http.get<any[]>(`${this.apiUrl}/cart?userId=${userId}`).pipe(
      switchMap((cartItems) => {
        const deleteRequests = cartItems.map((item) =>
          this.http.delete(`${this.apiUrl}/cart/${item.id}`)
        );
        return forkJoin(deleteRequests);
      })
    );
  }
}
