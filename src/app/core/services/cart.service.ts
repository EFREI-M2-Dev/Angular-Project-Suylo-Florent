import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addToCart(productId: string, userId: string, quantity: number) {
    const cartItem = {
      productId,
      userId,
      quantity,
    };

    return this.http.post(`${this.apiUrl}/cart`, cartItem);
  }

  getCartByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  updateCartItem(id: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { quantity });
  }

  removeFromCart(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
