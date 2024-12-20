import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { LicenceService } from './licence.service';
import { ProductModel } from '../../shared/models/product.model';
import {environment} from "../../../env/env";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private licenceService: LicenceService
  ) {}

  getProductsHome(): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(
        `${this.apiUrl}/products?_end=6&isFeatured=true`
      )
      .pipe(
        switchMap((products) => {
          const productObservables = products.map((product) =>
            this.licenceService.getLicenceById(product.licence).pipe(
              map((licence) => ({
                ...product,
                licence,
              }))
            )
          );
          return forkJoin(productObservables);
        })
      );
  }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}/products`).pipe(
      switchMap((products) => {
        const productObservables = products.map((product) =>
          this.licenceService.getLicenceById(product.licence).pipe(
            map((licence) => ({
              ...product,
              licence,
            }))
          )
        );
        return forkJoin(productObservables);
      })
    );
  }

  getProductsByLicenses(licencesList: string[]): Observable<ProductModel[]> {
    const products = licencesList.map((licence) => {
      return this.http
        .get<ProductModel[]>(
          `${this.apiUrl}/products?licence=${licence}`
        )
        .pipe(
          switchMap((products) => {
            const productObservables = products.map((product) =>
              this.licenceService.getLicenceById(product.licence).pipe(
                map((licence) => ({
                  ...product,
                  licence,
                }))
              )
            );

            return forkJoin(productObservables);
          })
        );
    });

    return forkJoin(products).pipe(
      map((products) => {
        const allProducts = products.flat();

        const uniqueProducts = new Map<number, ProductModel>();
        allProducts.forEach((product) => {
          uniqueProducts.set(product.id, product);
        });

        return Array.from(uniqueProducts.values());
      })
    );
  }

  getRecentProducts(): Observable<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(
        `${this.apiUrl}/products?_end=10&_sort=id&_order=desc`
      )
      .pipe(
        switchMap((products) => {
          const productObservables = products.map((product) =>
            this.licenceService.getLicenceById(product.licence).pipe(
              map((licence) => ({
                ...product,
                licence,
              }))
            )
          );
          return forkJoin(productObservables);
        })
      );
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.http
      .get<ProductModel>(`${this.apiUrl}/products/${id}`)
      .pipe(
        switchMap((product) =>
          this.licenceService.getLicenceById(product.licence).pipe(
            map((licence) => ({
              ...product,
              licence,
            }))
          )
        )
      );
  }

  createProduct(product: any) {
    return this.http.post('http://localhost:3000/products', product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.getProductById(id).pipe(
      map((existingProduct) => ({
        ...existingProduct,
        ...product,
      })),
      switchMap((updatedProduct) =>
        this.http.put(`http://localhost:3000/products/${id}`, updatedProduct)
      )
    );
  }
}
