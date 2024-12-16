import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LicenceModel} from "../../shared/models/licence.model";

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  constructor(private http: HttpClient) { }

  getLicenceById(id: LicenceModel): Observable<LicenceModel> {
    return this.http.get<LicenceModel>(`http://localhost:3000/licences/${id}`);
  }
}
