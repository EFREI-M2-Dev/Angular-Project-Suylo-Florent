import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {ProductModel} from "../shared/models/product.model";
import {LicenceService} from "./licence.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private licenceService: LicenceService) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/products').pipe(
      switchMap(products => {
        const productObservables = products.map(product =>
          this.licenceService.getLicenceById(product.licence).pipe(
            map(licence => ({
              ...product,
              licence
            }))
          )
        );
        return forkJoin(productObservables);
      })
    );
  }
}
