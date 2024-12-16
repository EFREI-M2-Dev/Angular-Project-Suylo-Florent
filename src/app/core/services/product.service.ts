import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {LicenceService} from "./licence.service";
import {ProductModel} from "../../shared/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private licenceService: LicenceService) { }

  getProductsHome(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:3000/products?_end=6&isFeatured=true').pipe(
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

  getProductById(id: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`http://localhost:3000/products/${id}`).pipe(
      switchMap(product =>
        this.licenceService.getLicenceById(product.licence).pipe(
          map(licence => ({
            ...product,
            licence
          }))
        )
      )
    );
  }
}
