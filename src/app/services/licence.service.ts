import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Licence} from "../interfaces/Licence";

@Injectable({
  providedIn: 'root'
})
export class LicenceService {

  constructor(private http: HttpClient) { }


  getLicenceById(id: string): Observable<Licence> {
    return this.http.get<Licence>(`http://localhost:3000/licences/${id}`);
  }
}
