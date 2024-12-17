import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserInfo(userId: string) {
    return this.http.get(`${this.apiUrl}/users?id=${userId}`);
  }

  getSavedUserId(): string | null {
    return localStorage.getItem('user') || null;
  }

  saveUserId(userId: string) {
    localStorage.setItem('user', userId);
  }
}
