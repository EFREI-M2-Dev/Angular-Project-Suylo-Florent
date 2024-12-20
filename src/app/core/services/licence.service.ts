import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LicenceModel } from '../../shared/models/licence.model';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class LicenceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLicenceById(id: LicenceModel): Observable<LicenceModel> {
    return this.http.get<LicenceModel>(`${this.apiUrl}/licences/${id}`);
  }

  getLicences(): Observable<LicenceModel[]> {
    return this.http.get<LicenceModel[]>(`${this.apiUrl}/licences`);
  }

  createLicence(licence: Partial<LicenceModel>): Observable<LicenceModel> {
    return this.http.post<LicenceModel>(`${this.apiUrl}/licences`, licence);
  }
}
