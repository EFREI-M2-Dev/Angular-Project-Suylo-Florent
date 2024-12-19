import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env/env';
import { UserModel } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserInfo(userId: string): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users?id=${userId}`);
  }

  getSavedUserId(): string | null {
    return localStorage.getItem('user') || null;
  }

  saveUserId(userId: string) {
    localStorage.setItem('user', userId);
  }
}
