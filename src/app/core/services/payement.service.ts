import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayementModel } from 'src/app/shared/models/payement.model';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class PayementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addPayement(payementData: PayementModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/payements`, payementData);
  }
}
