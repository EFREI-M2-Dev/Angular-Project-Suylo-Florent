import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import {environment} from "../../../env/env";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  user: { id: number; username: string } | undefined;

  constructor(private http: HttpClient) {}

  async addUser(user: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      email: user.email,
      password: hashedPassword,
      role: 1,
    };
    return this.http.post(`${this.apiUrl}/users`, newUser).subscribe();
  }

  login(user: { email: string; password: string }) {
    return this.http.get<any[]>(
      `${this.apiUrl}/users?email=${user.email}`
    );
  }

  logout() {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  saveUser() {
    localStorage.setItem('user', '' + this.user?.id);
  }

  getSavedUser() {
    return localStorage.getItem('user');
  }

  isUserConnected() {
    if (this.user) {
      this.saveUser();
      return true;
    } else if (this.getSavedUser()) {
      this.getSavedUserInfo().subscribe((user: any) => {
        this.user = user[0];
        return true;
      });
    }
    return false;
  }

  private getSavedUserInfo() {
    return this.http.get(
      `${this.apiUrl}/users?id=` + this.getSavedUser()
    );
  }
}
